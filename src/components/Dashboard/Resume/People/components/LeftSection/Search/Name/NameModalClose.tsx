import {React} from "../../../../../../../../shared/modules/React";
import { useContext } from "react";
// import { Box, Button, Card, Stack, TextField, Typography } from "@mui/material";
import { Typography } from "../../../../../../../../shared/modules/MaterialImports/Typography";
import {  Stack } from "../../../../../../../../shared/modules/MaterialImports/Stack";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// import ArticleIcon from "@mui/icons-material/Article";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import styles from "./../../../../shared/config/variables.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import { ModalStore } from "../../../DataLabs/DataLabs";
import '../Search.scss'

const NameModalClose = () => {
    const [searchModalData, setSearchModalData] = useContext(ModalStore);

    const onClickNameFilter = (event: any) => {
        event.stopPropagation();
        setSearchModalData((prevSearchData: any) => ({
            ...prevSearchData,
            full_name: "",
        }));
    };

    const onClickRemoveName = () => {
        setSearchModalData((prevSearchData: any) => ({
            ...prevSearchData,
            full_name: "",
        }));
    };

    const onClickNameFiltSelOpt = (event: any) => {
        event.stopPropagation();
    };

    const [isMouseNameFilt, setIsMouseNameFilt] = React.useState(false);
    const onMouseOverNameFilt = () => {
        setIsMouseNameFilt(true);
    };

    const onMouseOutNameFilt = () => {
        setIsMouseNameFilt(false);
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
                    <Stack
                        spacing={1}
                        direction="row"
                    >
                        <AccountBoxOutlinedIcon
                            sx={{
                                fontSize: "24px",

                                paddingLeft: "8px",
                            }}
                        />
                        <Typography
                            variant="body1"
                            className="menu-title"
                        >
                            Name
                        </Typography>
                    </Stack>
                    <Stack sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
                        {searchModalData.full_name !== "" ? (
                            <Stack sx={{ display: "flex", flexDirection: "row", gap: "5px" }}>
                                <Stack
                                    onClick={onClickNameFilter}
                                    onMouseOver={onMouseOverNameFilt}
                                    onMouseOut={onMouseOutNameFilt}
                                 className="filter-child-num-con"
                                >
                                    <CloseIcon
                                        sx={{
                                            color: isMouseNameFilt
                                                ? styles.primaryTextColor
                                                : "#737373",
                                            fontSize: "16px",
                                        }}
                                        onClick={onClickRemoveName}
                                    />
                                    <Typography
                                        sx={{
                                            fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                            fontSize: "12px",
                                            fontWeight: "600",
                                            color: isMouseNameFilt
                                                ? styles.primaryTextColor
                                                : styles.blackcolor,
                                        }}
                                    >
                                        1
                                    </Typography>
                                </Stack>
                            </Stack>
                        ) : (
                            <></>
                        )}
                        <ArrowDropDownIcon sx={{ color: styles.arrowDropDownColor }} />
                    </Stack>
                </Stack>
                {searchModalData.full_name !== "" ? (
                    <Stack
                        onClick={onClickNameFiltSelOpt}
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
                            Name:
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
                                {searchModalData.full_name}
                            </Typography>
                            <CloseIcon
                                sx={{ color: "#ffffff", fontSize: "small" }}
                                onClick={onClickRemoveName}
                            />
                        </Stack>
                    </Stack>
                ) : (
                    <></>
                )}
            </Stack>
        </Stack>
    );
};

export default NameModalClose;
