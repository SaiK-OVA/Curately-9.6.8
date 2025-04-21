import ModeStandbyOutlinedIcon from '@mui/icons-material/ModeStandbyOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import BeenhereOutlinedIcon from '@mui/icons-material/BeenhereOutlined';
import KeyboardReturnOutlinedIcon from '@mui/icons-material/KeyboardReturnOutlined';
import Diversity3OutlinedIcon from '@mui/icons-material/Diversity3Outlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import DynamicFeedOutlinedIcon from '@mui/icons-material/DynamicFeedOutlined';
import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined';
import GppMaybeOutlinedIcon from '@mui/icons-material/GppMaybeOutlined';
import DnsOutlinedIcon from '@mui/icons-material/DnsOutlined';

const masterNodesList: {
    name: string;
    type: string;
    stageId: string;
    duplicateId: string;
    id: string;
    icon: any;
}[] = [
        {
            name: "Shortlist",
            type: "default", // input
            stageId: "200",
            duplicateId: "",
            id: "",
            icon: <ModeStandbyOutlinedIcon />
        },
        {
            name: "Submit",
            type: "default",
            stageId: "100",
            duplicateId: "",
            id: "",
            icon: <AssignmentOutlinedIcon />
        },
        {
            name: "Approve",
            type: "default",
            stageId: "200",
            duplicateId: "",
            id: "",
            icon: <BeenhereOutlinedIcon />
        },
        {
            name: "Withdraw",
            type: "default",
            stageId: "450",
            duplicateId: "",
            id: "",
            icon: <KeyboardReturnOutlinedIcon />
        },
        {
            name: "Interview",
            type: "default",
            stageId: "300",
            duplicateId: "",
            id: "",
            icon: <Diversity3OutlinedIcon />
        },
        {
            name: "Offer",
            type: "default",
            stageId: "400",
            duplicateId: "",
            id: "",
            icon: <LocalOfferOutlinedIcon />
        },
        {
            name: "Onboard",
            type: "default",
            stageId: "600",
            duplicateId: "",
            id: "",
            icon: <DynamicFeedOutlinedIcon />
        },
        {
            name: "Start",
            type: "default",
            stageId: "500",
            duplicateId: "",
            id: "",
            icon: <PlayCircleOutlineOutlinedIcon />
        },
        {
            name: "Reject",
            type: "default",
            // type: "output",
            stageId: "800",
            duplicateId: "",
            id: "",
            icon: <GppMaybeOutlinedIcon />
        },
        {
            name: "Stage",
            type: "default",
            // type: "output",
            stageId: "900",
            duplicateId: "",
            id: "",
            icon: <DnsOutlinedIcon />
        }
    ];
export default masterNodesList;