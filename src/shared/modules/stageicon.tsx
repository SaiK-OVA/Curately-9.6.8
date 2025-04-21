

import ElectricBoltSharpIcon from '@mui/icons-material/ElectricBoltSharp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StorageIcon from '@mui/icons-material/Storage';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import NextPlanIcon from '@mui/icons-material/NextPlan';
import CancelIcon from '@mui/icons-material/Cancel';
import ErrorIcon from '@mui/icons-material/Error';
import VideocamSharpIcon from '@mui/icons-material/VideocamSharp';
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
// import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SmartDisplayOutlinedIcon from '@mui/icons-material/SmartDisplayOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import ScheduleIcon from '@mui/icons-material/Schedule';
import TuneIcon from '@mui/icons-material/Tune';


export const getStageIcon = (key: string) => {
    // console.log(key);
    switch (key) {
        case "Trigger":
            return <ElectricBoltSharpIcon className="icon mr-2" />;
        case "1":
            return <ElectricBoltSharpIcon className="icon" />;
        case "Approved":
            return <CheckCircleIcon className="icon mr-2" />
        case "2":
            return <CheckCircleIcon className="icon" />
        case "Data Collection":
            return <StorageIcon className="icon mr-2" />
        case "3":
            return <StorageIcon className="icon" />
        case "Client Submission":
            return <SupervisorAccountIcon className="icon mr-2" />
        case "4":
            return <SupervisorAccountIcon className="icon" />
        case "Onboarding":
            return <NextPlanIcon className="icon mr-2" />
        case "5":
            return <NextPlanIcon className="icon" />
        case "Rejected":
            return <CancelIcon className="icon mr-2" />
        case "6":
            return <CancelIcon className="icon" />
        case "On Hold":
            return <ErrorIcon className="icon mr-2" />
        case "7":
            return <ErrorIcon className="icon" />
        case "Webinar":
            return <SmartDisplayOutlinedIcon className="icon mr-2" />
        case "8":
            return <SmartDisplayOutlinedIcon className="icon" />
        case "Scheduling":
            return <ScheduleIcon className="icon mr-2" />
        case "9":
            return <ScheduleIcon className="icon" />
        case "Video Recording":
            return <VideocamSharpIcon className="icon mr-2" />
        case "10":
            return <VideocamSharpIcon className="icon" />
        case "Filter":
            return <FilterAltRoundedIcon className="icon mr-2" />
        case "11":
            return <FilterAltRoundedIcon className="icon" />
        case "Assessment":
            return <AssignmentTurnedInOutlinedIcon className="icon mr-2" />
        case "12":
            return <AssignmentTurnedInOutlinedIcon className="icon" />
        case "Info":
            return <InfoOutlinedIcon className="icon mr-2" />
        case "13":
            return <InfoOutlinedIcon className="icon" />
        case "System Checker":
            return <TuneIcon className="icon mr-2" />
        case "14":
            return <TuneIcon className="icon" />
        case "Document Signing":
            return <AssignmentTurnedInOutlinedIcon className="icon mr-2" />
        case "15":
            return <AssignmentTurnedInOutlinedIcon className="icon" />
        default:
            return "";
    }
}
