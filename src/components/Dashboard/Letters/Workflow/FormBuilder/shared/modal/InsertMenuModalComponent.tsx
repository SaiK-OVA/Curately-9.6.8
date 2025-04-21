import  { useContext } from "react";
import {React } from "../../../../../../../shared/modules/React";
import {Dialog} from '../../../../../../../shared/modules/MaterialImports/Dialog';
import {Typography} from '../../../../../../../shared/modules/MaterialImports/Typography';
import {Stack} from '../../../../../../../shared/modules/MaterialImports/Stack';
import {TextField} from '../../../../../../../shared/modules/MaterialImports/TextField';
import {Box} from '../../../../../../../shared/modules/MaterialImports/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
// import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
// import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
// import DragHandleRoundedIcon from '@mui/icons-material/DragHandleRounded';
// import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
// import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
// import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
// import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
// import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
// import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
// import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';
// import TagRoundedIcon from '@mui/icons-material/TagRounded';
// import AlternateEmailRoundedIcon from '@mui/icons-material/AlternateEmailRounded';
// import EmailIcon from '@mui/icons-material/Email';
// import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
// import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
// import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
// import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
// import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
// import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
// import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
// import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
// import LinearScaleOutlinedIcon from '@mui/icons-material/LinearScaleOutlined';
// import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
// import ViewCompactOutlinedIcon from '@mui/icons-material/ViewCompactOutlined';
// import AddCircleIcon from '@mui/icons-material/AddCircle';
// import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
// import TitleRoundedIcon from '@mui/icons-material/TitleRounded';
// import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
// import InsertPageBreakIcon from '@mui/icons-material/InsertPageBreak';
// import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
// import SentimentSatisfiedRoundedIcon from '@mui/icons-material/SentimentSatisfiedRounded';
// import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
// import TheatersOutlinedIcon from '@mui/icons-material/TheatersOutlined';
// import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined';
// import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
// import EarbudsOutlinedIcon from '@mui/icons-material/EarbudsOutlined';
// import PercentOutlinedIcon from '@mui/icons-material/PercentOutlined';
// import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
// import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
// import NorthIcon from '@mui/icons-material/North';
// import SouthIcon from '@mui/icons-material/South';
import { recommendedList, inputBlockList, LayoutBlockList, EmbedBlockList, } from "../utills/controlesList";


import { EmbedModalState } from "../../../../../../../App";

// import EmbedAnything from "./EmbedAnything";
// import EmbedAudio from "./EmbedAudio";
// import EmbedImage from "./EmbedImage";
// import EmbedVideo from "./EmbedVideo";
// import EmbedModal from "./EmbedModal";


interface ModalProps {
    openInsertModal: boolean;
    closeInsertModal: (openFlag: boolean) => void,
    createdFields: any,
    addElement: (type: any, index: number) => void,
}

const InsertMenuModalComponent: React.FC<ModalProps> = ({ openInsertModal, closeInsertModal, createdFields, addElement }) => {

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    // const [isEmbedOpen, setEmbedOpen] = useState(false);


    const handleCloseInsertMenuModal = () => {
        closeInsertModal(false)
    }
    const addHereTitle = (field: any) => {
        // console.log(field);
        addElement(field, 1);
        closeInsertModal(false)
        // addTitle(createdFields.length)
    }

    // const [propsData, setPropsData] = useContext(Store)
    const [ModalData, setEmbedModalOpen] = useContext(EmbedModalState)
    const [searchQuery, setSearchQuery] = React.useState('');


    const handleEmbed = (field: any) => {
        handleCloseInsertMenuModal()
        console.log(field)

        const uniqueId = Date.now()
        field.uniqueId = uniqueId



        if (field.fieldType === 'embedimage') {
            setEmbedModalOpen({ ...ModalData, open: true, field: field })
        }
        if (field.fieldType === 'embedvideo') {
            setEmbedModalOpen({ ...ModalData, open: true, field: field })
        }
        if (field.fieldType === 'embedaudio') {
            setEmbedModalOpen({ ...ModalData, open: true, field: field })
        }
        if (field.fieldType === 'embedanything') {
            // setPropsData((prevPropsData: any) => ({
            //     ...prevPropsData,
            //     isEmbedAnything: ({ ...prevPropsData.isEmbedAnything, [field.uniqueId]: true }),
            //     isPreview: false,
            // }))
            setEmbedModalOpen({ ...ModalData, open: true, field: field })
        }
    }
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const filteredRecommendedList = recommendedList.filter(field =>
        field.displayName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredInputBlockList = inputBlockList.filter(field =>
        field.displayName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredLayoutBlockList = LayoutBlockList.filter(field =>
        field.displayName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredEmbedBlockList = EmbedBlockList.filter(field =>
        field.displayName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Do the same for inputBlockList, LayoutBlockList, and EmbedBlockList

    // console.log('prop', propsData.embedfields)
    return (
        <Box>
            <Dialog
                className="formBuilder"
                fullScreen={fullScreen}
                open={openInsertModal}
                onClose={handleCloseInsertMenuModal}
                sx={{
                    "& .MuiPaper-root.MuiDialog-paper":
                    {
                        maxWidth: "830px",
                        minHeight: "450px",
                        borderRadius: "10px",
                        backgroundColor: "rgb(255, 255, 255)",
                        overflow: "hidden",
                    }
                }}
            // aria-labelledby="responsive-dialog-title"
            >
                <Stack
                    sx={{
                        // maxHeight: "calc(100vh - 40px)",
                        // width: "830px",
                        height: "100%",
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Stack
                        sx={{
                            height: "40px",
                            borderBottom: "1px solid rgb(55 53 47 / 9%)",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            padding: "0px 10px",
                        }}
                    >

                        <SearchIcon
                            sx={{ fontFamily: "Segoe UI !important", color: "rgb(137, 136, 132)", fontWeight: "400", fontSize: "22px" }}
                        />
                        <TextField
                            // id="standard-basic"
                            spellCheck='false'
                            // onChange={onChangeSearchPeople}
                            // onKeyDown={handleAutocompleteChangeSearchPeople}
                            // value={defSearchPeople}
                            onChange={handleSearchChange}
                            value={searchQuery}
                            sx={{
                                color: "#1A1A1A ",
                                fontSize: "16px ",
                                fontWeight: "500 ",
                                fontFamily: "Segoe UI !important ",
                                flexGrow: "1",
                                ml: "5px",
                                "& .MuiInputBase-input::placeholder": {
                                    color: "rgb(137, 136, 132)",
                                    fontSize: "14px",
                                    fontWeight: "500",
                                    fontFamily: "Segoe UI !important",
                                    opacity: 1,
                                },
                            }}
                            placeholder="Find questions, input fields and layout options..."
                            variant="standard"
                            InputProps={{ disableUnderline: true }}
                        />


                    </Stack>

                    <Stack
                        sx={{
                            maxHeight: "calc(100vh - 240px)",
                            overflowY: "auto",
                            display: "flex",
                            flexDirection: "row",
                            gap: "16px"

                        }}
                    >

                        <Stack
                            sx={{
                                width: "288px"
                            }}
                        >
                            <Typography
                                sx={{
                                    fontFamily: "Segoe UI !important",
                                    fontSize: "14px",
                                    fontWeight: "500",
                                    lineHeight: "20px",
                                    color: "rgb(115, 115, 115)",
                                    marginLeft: "16px"
                                }}
                            >Recommended</Typography>
                            {filteredRecommendedList.map((field, index) => {
                                return (
                                    <Stack
                                        key={index}
                                        onClick={() => addHereTitle(field)}
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                            gap: "8px",
                                            padding: "8px 16px",
                                            cursor: "pointer",
                                            "&:hover": {
                                                backgroundColor: "rgb(246 241 248)"
                                            }
                                        }}>
                                        <Box
                                            sx={{
                                                height: "24px",
                                                width: "24px",
                                                borderRadius: "4px",
                                                backgroundColor: `${field.bgcolor}`,
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                        >
                                            {field.iconPath}
                                        </Box>

                                        <Typography sx={{
                                            fontFamily: "Segoe UI !important",
                                            fontSize: "14px",
                                            fontWeight: "400",
                                            color: "rgb(38, 38, 39)",
                                        }}>{field.displayName}</Typography>
                                    </Stack>
                                )
                            })}

                        </Stack>
                        <Stack sx={{
                            // width: "526px",
                            // overflowY: "auto",
                            display: "flex",
                            flexDirection: "row",
                            gap: "16px",
                            // height: "calc(100vh - 95px)"
                        }}>
                            <Stack sx={{ width: "247px" }}>
                                <Typography
                                    sx={{
                                        fontFamily: "Segoe UI !important",
                                        fontSize: "14px",
                                        fontWeight: "500",
                                        lineHeight: "20px",
                                        color: "rgb(115, 115, 115)",
                                        marginLeft: "16px"
                                    }}
                                >Input Blocks</Typography>
                                {filteredInputBlockList.map((field, index) => {
                                    return (
                                        <Stack
                                            key={index}
                                            onClick={() => addHereTitle(field)}
                                            sx={{
                                                display: "flex",
                                                flexDirection: "row",
                                                alignItems: "center",
                                                gap: "8px",
                                                padding: "8px 16px",
                                                cursor: "pointer",
                                                "&:hover": {
                                                    backgroundColor: "rgb(246 241 248)"
                                                }
                                            }}>

                                            <Box
                                                sx={{
                                                    height: "24px",
                                                    width: "24px",
                                                    borderRadius: "4px",
                                                    backgroundColor: `${field.bgcolor}`,
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                }}
                                            >
                                                {field.iconPath}
                                            </Box>
                                            <Typography sx={{
                                                fontFamily: "Segoe UI !important",
                                                fontSize: "14px",
                                                fontWeight: "400",
                                                color: "rgb(55, 53, 47)",
                                            }}>{field.displayName}</Typography>
                                        </Stack>
                                    )
                                })}



                            </Stack>



                            <Stack sx={{ width: "247px" }}>
                                <Typography
                                    sx={{
                                        fontFamily: "Segoe UI !important",
                                        fontSize: "14px",
                                        fontWeight: "500",
                                        lineHeight: "20px",
                                        color: "rgb(115, 115, 115)",
                                        marginLeft: "16px"
                                    }}
                                >Layout Blocks</Typography>

                                {/* {LayoutBlockHeaderList.map((field, index) => {
                                    return (
                                        <Stack sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                            gap: "8px",
                                            padding: "8px 16px",
                                            cursor: "pointer",
                                            "&:hover": {
                                                backgroundColor: "rgb(246 241 248)"
                                            }
                                        }}>

                                            <Typography sx={{
                                                fontFamily: "Segoe UI !important",
                                                fontSize: "14px",
                                                fontWeight: "400",
                                                color: "rgb(38, 38, 39)",
                                                height: "24px",
                                                width: "24px",
                                                textAlign: "center",
                                                borderRadius: "4px",
                                                backgroundColor: `${field.bgcolor}`,

                                            }}>{field.iconHeader}
                                                <span style={{
                                                    fontFamily: "Segoe UI !important",
                                                    fontSize: "10px",
                                                    fontWeight: "400",
                                                    color: "rgb(38, 38, 39)",
                                                }}>{field.iconLabel}</span>
                                            </Typography>
                                            <Typography sx={{
                                                fontFamily: "Segoe UI !important",
                                                fontSize: "14px",
                                                fontWeight: "400",
                                                color: "rgb(55, 53, 47)",
                                            }}>{field.displayName}</Typography>
                                        </Stack>
                                    )
                                })} */}


                                {filteredLayoutBlockList.map((field, index) => {
                                    return (
                                        <Stack
                                            key={index}
                                            onClick={() => addHereTitle(field)}
                                            sx={{
                                                display: "flex",
                                                flexDirection: "row",
                                                alignItems: "center",
                                                gap: "8px",
                                                padding: "8px 16px",
                                                cursor: "pointer",
                                                "&:hover": {
                                                    backgroundColor: "rgb(246 241 248)"
                                                }
                                            }}>

                                            <Box
                                                sx={{
                                                    height: "24px",
                                                    width: "24px",
                                                    borderRadius: "4px",
                                                    backgroundColor: `${field.bgcolor}`,
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                }}
                                            >
                                                {field.iconPath}
                                            </Box>
                                            <Typography sx={{
                                                fontFamily: "Segoe UI !important",
                                                fontSize: "14px",
                                                fontWeight: "400",
                                                color: "rgb(38, 38, 39)",
                                            }}>{field.displayName}</Typography>
                                        </Stack>
                                    )
                                })}
                                <Typography
                                    sx={{
                                        fontFamily: "Segoe UI !important",
                                        fontSize: "14px",
                                        fontWeight: "500",
                                        lineHeight: "20px",
                                        color: "rgb(115, 115, 115)",
                                        marginLeft: "16px",
                                        marginTop: "30px",
                                    }}
                                >Embed Blocks</Typography>

                                {filteredEmbedBlockList.map((field, index) => {
                                    return (
                                        <Stack
                                            key={index}
                                            sx={{
                                                display: "flex",
                                                flexDirection: "row",
                                                alignItems: "center",
                                                gap: "8px",
                                                padding: "8px 16px",
                                                cursor: "pointer",
                                                "&:hover": {
                                                    backgroundColor: "rgb(246 241 248)"
                                                }
                                            }}
                                            onClick={() => handleEmbed(field)}
                                        >

                                            <Box
                                                sx={{
                                                    height: "24px",
                                                    width: "24px",
                                                    borderRadius: "4px",
                                                    backgroundColor: `${field.bgcolor}`,
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                }}
                                            >
                                                {field.iconPath}
                                            </Box>
                                            <Typography sx={{
                                                fontFamily: "Segoe UI !important",
                                                fontSize: "14px",
                                                fontWeight: "400",
                                                color: "rgb(55, 53, 47)",
                                            }}>{field.displayName}</Typography>
                                        </Stack>
                                    )
                                })}


                                {/* <Typography
                                    sx={{
                                        fontFamily: "Segoe UI !important",
                                        fontSize: "14px",
                                        fontWeight: "500",
                                        lineHeight: "20px",
                                        color: "rgb(115, 115, 115)",
                                        marginLeft: "16px"
                                    }}
                                >Advanced Blocks</Typography>

                                {AdvancedBlockList.map((field, index) => {
                                    return (
                                        <Stack sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                            gap: "8px",
                                            padding: "8px 16px",
                                            cursor: "pointer",
                                            "&:hover": {
                                                backgroundColor: "rgb(246 241 248)"
                                            }
                                        }}>

                                            <Box
                                                sx={{
                                                    height: "24px",
                                                    width: "24px",
                                                    borderRadius: "4px",
                                                    backgroundColor: `${field.bgcolor}`,
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                }}
                                            >
                                                {field.iconPath}
                                            </Box>
                                            <Typography sx={{
                                                fontFamily: "Segoe UI !important",
                                                fontSize: "14px",
                                                fontWeight: "400",
                                                color: "rgb(55, 53, 47)",
                                            }}>{field.displayName}</Typography>
                                        </Stack>
                                    )
                                })} */}




                            </Stack>



                        </Stack>
                    </Stack>




                </Stack>

            </Dialog>
            {/* <EmbedModal isOpen={isEmbedOpen} /> */}
        </Box>


    )
}

export default InsertMenuModalComponent;