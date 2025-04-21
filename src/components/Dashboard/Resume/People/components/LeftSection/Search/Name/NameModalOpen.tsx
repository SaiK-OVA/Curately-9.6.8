import {React} from "../../../../../../../../shared/modules/React";
import { useContext } from "react";
import {  Stack } from "../../../../../../../../shared/modules/MaterialImports/Stack";
import { Typography } from "../../../../../../../../shared/modules/MaterialImports/Typography";
// import { Box, Button, Card, Stack, TextField, Typography } from "@mui/material";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
// import ArticleIcon from "@mui/icons-material/Article";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import styles from "./../../../../shared/config/variables.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import { ModalStore } from "../../../DataLabs/DataLabs";
import '../Search.scss'

const NameModalOpen = () => {
    const [searchModalData, setSearchModalData] = useContext(ModalStore);

    const onClickNameFilter = (event: any) => {
        event.stopPropagation();
        setSearchModalData((prevSearchData: any) => ({
            ...prevSearchData,
            full_name: "",
        }));
    };

    const onClickRemoveName = () => {
        // debugger;

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
                                color: styles.primaryTextColor,
                                paddingLeft: "8px",
                            }}
                        />
                        <Typography
                            variant="body1"
                            className="menu-title"
                            sx={{ color: styles.primaryTextColor }}
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
                        <ArrowDropUpIcon sx={{ color: styles.primaryTextColor }} />
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    );
};

export default NameModalOpen;
