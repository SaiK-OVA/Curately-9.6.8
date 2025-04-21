// import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
// import DragHandleRoundedIcon from '@mui/icons-material/DragHandleRounded';
// import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
// import EmailIcon from '@mui/icons-material/Email';
// import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
// import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';
// import TagRoundedIcon from '@mui/icons-material/TagRounded';
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
// import { Divider, Typography } from '@mui/material';
// import SportsScoreOutlinedIcon from '@mui/icons-material/SportsScoreOutlined';
// import SignalCellularAltOutlinedIcon from '@mui/icons-material/SignalCellularAltOutlined';
// import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
// import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import RepeatIcon from '@mui/icons-material/Repeat';
import TextBox from '../icons/text-bax.png';
import TextArea from '../icons/text-area.png';
import Email from '../icons/email.png';
import SSN from '../icons/ssn.png';
import PageBreak from '../icons/page-break.png';
import Address from '../icons/address.png';
import Compass from '../icons/compass.png';
import Date from '../icons/date.png';
import DisplayText from '../icons/display-text.png';
import embedAudio from '../icons/embed-audio.png';
import embedVideo from '../icons/embed-video.png';
import embedImg from '../icons/embed-image.png';
import fileUpload from '../icons/file-update.png';
import Label from '../icons/Frame 308.png';
import multiChoice from '../icons/multiple-choice.png';
import netProMotor from '../icons/netpromotor-score.png';
import Phone from '../icons/phone.png';
import Ranking from '../icons/ranking.png';
import Rating from '../icons/rating.png';
import yesOrno from '../icons/yes-or-no.png';
import divider from '../icons/divider.png';

export const recommendedList = [
    //     {
    //     'inputType': 'multiple',
    //     'fieldType': 'multiple',
    //     'placeholderName': '(Text Box) Your Question here',
    //     'displayName': "Multiple Choice",
    //     'iconPath': <DragHandleRoundedIcon sx={{ color: "rgb(38, 38, 39)", fontSize: "18px" }} />,
    //     'bgcolor': 'rgb(214, 92, 153)'
    // },
    {
        'inputType': 'text',
        'fieldType': 'textbox',
        'placeholderName': '(Text Box) Your Question here',
        'displayName': "Text Box",
        'iconPath': <img src={TextBox} alt='text-box-icon' style={{ height: '26px', width: '26px' }} />,
        'bgcolor': 'rgb(55, 156, 251)',
        "datakey": "",
        "readonly": false,
        "isMask": false,
        "isShow": true,
        "helptext": "",
        "placeholder": "",
        'allowedInputs': '',
    },
    {
        'inputType': 'text',
        'fieldType': 'textarea',
        'placeholderName': '(Text Area) Your Question here',
        'displayName': "Text Area",
        'iconPath': <img src={TextArea} alt='text-area-icon' style={{ height: '26px', width: '26px' }} />,
        'bgcolor': 'rgb(55, 156, 251)',
        "datakey": "",
        "readonly": false,
        "isMask": false,
        "isShow": true,
        "helptext": ""
    },
    {
        'inputType': 'email',
        'fieldType': 'email',
        'placeholderName': '(Text Area) Your Question here',
        'displayName': "Email",
        'iconPath': <img src={Email} alt='email-icon' style={{ height: '26px', width: '26px' }} />,
        'bgcolor': 'rgb(155, 206, 253)',
        "datakey": "",
        "isShow": true,
        "helptext": ""
    }, {
        'inputType': 'ssn',
        'fieldType': 'ssn',
        'placeholderName': 'SSN',
        'displayName': "SSN",
        'iconPath': <img src={TextBox} alt='text-box-icon' style={{ height: '26px', width: '26px' }} />,
        'bgcolor': 'rgb(55, 156, 251)',
        "datakey": "",
        "isShow": true,
        "helptext": ""
    },
    {
        'inputType': 'text',
        'fieldType': 'phone',
        'placeholderName': '(Text Area) Your Question here',
        'displayName': "Phone",
        'iconPath': <img src={Phone} alt='phone-icon' style={{ height: '26px', width: '26px' }} />,
        'bgcolor': 'rgb(173, 235, 228)',
        "datakey": "",
        "isShow": true,
        "helptext": "",
        "isValidate": false,
        "isPhoneVerified": false
    },
    // {
    //     'inputType': 'pagebreak',
    //     'fieldType': 'pagebreak',
    //     'placeholderName': '(Text Area) Your Question here',
    //     'displayName': "Page Break",
    //     'iconPath': <img src={PageBreak} alt='page-break-icon' style={{ height: '26px', width: '26px' }} />,
    //     'bgcolor': 'rgb(251, 161, 55)',
    //     "datakey": "",
    //     "isShow": true,
    //     "helptext": "",
    //     "btnValue": "",
    //     "textValue": ""
    // },
    {
        'inputType': 'displaytext',
        'fieldType': 'displaytext',
        'placeholderName': '(Text Area) Your Question here',
        'displayName': "Display Text",
        'iconPath': <img src={DisplayText} alt='display-text-icon' style={{ height: '26px', width: '26px' }} />,
        'bgcolor': 'rgb(105, 181, 252)',
        "datakey": "",
        "isShow": true,
        "helptext": ""
    },
    {
        'inputType': 'text',
        'fieldType': 'rating',
        'placeholderName': '(Text Area) Your Question here',
        'displayName': "Rating",
        'iconPath': <img src={Rating} alt='rating-icon' style={{ height: '26px', width: '26px' }} />,
        'bgcolor': 'rgb(251, 206, 55)',
        "datakey": "",
        "isShow": true,
        "helptext": ""
    },
    {
        'inputType': 'text',
        'fieldType': 'ranking',
        'placeholderName': '(Text Area) Your Question here',
        'displayName': "Ranking",
        'iconPath': <img src={Ranking} alt='ranking-icon' style={{ height: '26px', width: '26px' }} />,
        'bgcolor': 'rgb(235, 173, 204)',
        "datakey": "",
        "isShow": true,
        "helptext": "",
        "ranks": [{ id: 1, value: "choice 1", rank: 1 }],
        "isRankUpdated": false,
    },
];

export const inputBlockList = [{
    'inputType': 'text',
    'fieldType': 'textbox',
    'placeholderName': '(Text Box) Your Question here',
    'displayName': "Text Box",
    'iconPath': <img src={TextBox} alt='text-box-icon' style={{ height: '26px', width: '26px' }} />,
    'bgcolor': 'rgb(55, 156, 251)',
    "datakey": "",
    "readonly": false,
    "isMask": false,
    "placeholder": "",
    "isShow": true,
    "helptext": ""
}, {
    'inputType': 'text',
    'fieldType': 'textarea',
    'placeholderName': '(Text Box) Your Question here',
    'displayName': "Text Area",
    'iconPath': <img src={TextArea} alt='text-area-icon' style={{ height: '26px', width: '26px' }} />,
    'bgcolor': 'rgb(55, 156, 251)',
    "datakey": "",
    "readonly": false,
    "isMask": false,
    "isShow": true,
    "helptext": ""
},
// {
//     'inputType': 'email',
//     'fieldType': 'email',
//     'placeholderName': '(Text Area) Your Question here',
//     'displayName': "Multiple Choice",
//     'iconPath': <TaskAltRoundedIcon sx={{ color: "rgb(38, 38, 39)", fontSize: "18px" }} />,
//     'bgcolor': 'rgb(214, 92, 153)'
// },
{
    'inputType': 'radio',
    'fieldType': 'multiplechoice',
    'placeholderName': '(Text Area) Your Question here',
    'displayName': "Multiple Choice",
    'iconPath': <img src={multiChoice} alt='multi-choice-icon' style={{ height: '26px', width: '26px' }} />,
    'bgcolor': 'rgb(214, 92, 153)',
    "datakey": "",
    "choices": [{ id: 1, character: "A", value: "Choice 1" }],
    "isShow": true,
    "helptext": ""
},
{
    'inputType': 'weighted',
    'fieldType': 'weightedmultiplechoice',
    'placeholderName': '(Text Area) Your Question here',
    'displayName': "Weighted Multiple choice",
    'iconPath': <img src={multiChoice} alt='multi-choice-icon' style={{ height: '26px', width: '26px' }} />,
    'bgcolor': 'rgb(214, 92, 153)',
    "datakey": "",
    "choices": [{ id: 1, character: "A", value: "Choice 1" }],
    "isShow": true,
    "helptext": ""
},
{
    'inputType': 'dropdown',
    'fieldType': 'dropdown',
    'placeholderName': '(Text Area) Your Question here',
    'displayName': "Dropdown",
    'iconPath': <KeyboardArrowDownRoundedIcon sx={{ color: "#FFF", fontSize: "18px" }} />,
    'bgcolor': 'rgb(0,0,0,0.8)',
    "options": [],
    "isShow": true,
    "helptext": ""
},

{
    'inputType': 'checkbox',
    'fieldType': 'checkbox',
    'placeholderName': '(Text Box) Your Question here',
    'displayName': "Checkbox",
    'iconPath': <img src={multiChoice} alt='multi-choice-icon' style={{ height: '26px', width: '26px' }} />,
    'bgcolor': 'rgb(55, 156, 251)',
    "datakey": "",
    // "choices": { id: 1, character: "A", value: "Choice 1" },
    // "readonly": false,
    // "isMask": false,
    "placeholder": "",
    "isShow": true,
    "helptext": ""
},
// {
//     'type': 'text',
//     'fieldType': 'textbox',
//     'placeholderName': '(Text Area) Your Question here',
//     'displayName': "Multi-select",
//     'iconPath': <DoneAllRoundedIcon sx={{ color: "rgb(38, 38, 39)", fontSize: "18px" }} />,
//     'bgcolor': 'rgb(214, 92, 153)'
// },
// {
//     'type': 'text',
//     'fieldType': 'textbox',
//     'placeholderName': '(Text Area) Your Question here',
//     'displayName': "Number",
//     'iconPath': <TagRoundedIcon
//         sx={{ color: "rgb(38, 38, 39)", fontSize: "18px" }}
//     />,
//     'bgcolor': 'rgb(92, 214, 200)'
// },
{
    'inputType': 'email',
    'fieldType': 'email',
    'placeholderName': '(Text Area) Your Question here',
    'displayName': "Email",
    'iconPath': <img src={Email} alt='email-icon' style={{ height: '26px', width: '26px' }} />,
    'bgcolor': 'rgb(155, 206, 253)',
    "datakey": "",
    "isShow": true,
    "helptext": ""
},
{
    'inputType': 'text',
    'fieldType': 'address',
    'placeholderName': '(Text Area) Your Question here',
    'displayName': "Address",
    'iconPath': <img src={Address} alt='addredd-icon' style={{ height: '26px', width: '26px' }} />,
    'bgcolor': 'rgb(155, 206, 253)',
    'enableAddressValidation': false,
    "datakey": "",
    "enableAutocomplete": false,
    "isShow": true,
    "helptext": ""
},
{
    'inputType': 'text',
    'fieldType': 'ssn',
    'placeholderName': 'SSN',
    'displayName': "SSN",
    'iconPath': <img src={SSN} alt='ssn-icon' style={{ height: '26px', width: '26px' }} />,
    'bgcolor': 'rgb(55, 156, 251)',
    "datakey": "",
    "isShow": true,
    "helptext": ""
},
{
    'inputType': 'text',
    'fieldType': 'phone',
    'placeholderName': '(Text Area) Your Question here',
    'displayName': "Phone",
    'iconPath': <img src={Phone} alt='phone-icon' style={{ height: '26px', width: '26px' }} />,
    'bgcolor': 'rgb(173, 235, 228)',
    "datakey": "",
    "isShow": true,
    "helptext": "",
    "isValidate": false,
    "isPhoneVerified": false
},
// {
//     'type': 'text',
//     'fieldType': 'textarea',
//     'placeholderName': '(Text Area) Your Question here',
//     'displayName': "Link",
//     'iconPath': <LinkOutlinedIcon
//         sx={{ color: "rgb(38, 38, 39)", fontSize: "18px" }}
//     />,
//     'bgcolor': 'rgb(55, 156, 251)'
// },
{

    'placeholderName': '(Text Area) Your Question here',
    'displayName': "Date",
    'iconPath': <img src={Date} alt='date-icon' style={{ height: '26px', width: '26px' }} />,
    'bgcolor': 'rgb(133, 224, 214)',
    "enableDependencyVaildation": false,
    'id': 3,
    'labelName': '',
    'description': '',
    'helptext': '',
    'isRequired': false,
    'inputType': "date",
    'fieldType': "date",
    'datakey': "",
    "readonly": false,
    "isShow": true,

    "dateConditions": {
        'name': 'Dependency Validation',
        'value': '',
        'Type': 'dependency',
        'width': 100,

        'isDependent': {
            'name': '',
            'value': true
        },
        'dependencyObjs': [{
            'name': 'Conditions',
            'type': 'conditions',
            'value': '',
            'Possiblevalue': [{
                'name': 'Less than(<)',
                'value': '<',

            },
            {
                'name': 'Less than or equals(<=)',
                'value': '<=',

            },
            {
                'name': 'Greater than(>)',
                'value': '>',

            },
            {
                'name': 'Greater than or equals(>=)',
                'value': '>=',

            },
            {
                'name': 'Equals(=)',
                'value': '==',

            }
            ]
        },
        {
            'name': 'Other Fields',
            'type': 'otherfield',
            'value': '',
            'Possiblevalue': [

            ]
        }
        ]


        ,
    },
},
// {
//     'type': 'email',
//     'fieldType': 'email',
//     'placeholderName': '(Text Area) Your Question here',
//     'displayName': "Time",
//     'iconPath': <AccessTimeOutlinedIcon
//         sx={{ color: "rgb(38, 38, 39)", fontSize: "18px" }}
//     />,
//     'bgcolor': 'rgb(55, 156, 251)'
// },
{
    'inputType': 'fileupload',
    'fieldType': 'fileupload',
    'placeholderName': '(Text Area) Your Question here',
    'displayName': "File Upload",
    'iconPath': <img src={fileUpload} alt='file-upload-icon' style={{ height: '26px', width: '26px' }} />,
    'bgcolor': 'rgb(253, 208, 155)',
    "datakey": "",
    "isShow": true,
    "file": null,
    "isResume": false,
    "helptext": ""
},
// {
//     'type': 'email',
//     'fieldType': 'email',
//     'placeholderName': '(Text Area) Your Question here',
//     'displayName': "Payment",
//     'iconPath': <CreditCardOutlinedIcon
//         sx={{ color: "rgb(38, 38, 39)", fontSize: "18px" }}
//     />,
//     'bgcolor': 'rgb(252, 185, 105)'
// },
{
    'inputType': 'text',
    'fieldType': 'rating',
    'placeholderName': '(Text Area) Your Question here',
    'displayName': "Rating",
    'iconPath': <img src={Rating} alt='rating-icon' style={{ height: '26px', width: '26px' }} />,
    'bgcolor': 'rgb(251, 206, 55)',
    "datakey": "",
    "isShow": true
},
{
    'inputType': 'text',
    'fieldType': 'ranking',
    'placeholderName': '(Text Area) Your Question here',
    'displayName': "Ranking",
    'iconPath': <img src={Ranking} alt='ranking-icon' style={{ height: '26px', width: '26px' }} />,
    'bgcolor': 'rgb(235, 173, 204)',
    "ranks": [{ id: 1, value: "choice 1", rank: 1 }],
    "isRankUpdated": false,
    "datakey": "",
    "isShow": true
},
{
    'inputType': 'radio',
    'fieldType': 'netprometer',
    'placeholderName': '(Text Area) Your Question here',
    'displayName': "Netpromoter Score",
    'iconPath': <img src={netProMotor} alt='net-icon' style={{ height: '26px', width: '26px' }} />,
    'bgcolor': 'rgb(133, 224, 214)',
    "datakey": "",
    "choices": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    "isShow": true,

},
{
    'inputType': 'radio',
    'fieldType': 'opinionscale',
    'placeholderName': '(Text Area) Your Question here',
    'displayName': "Opinion Scale",
    'iconPath': <img src={Email} alt='email-icon' style={{ height: '26px', width: '26px' }} />,
    'bgcolor': 'rgb(252, 218, 105)',
    "choices": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    "isShow": true,
    'minValue': 1,
    'maxValue': 10,
},
    // {
    //     'type': 'email',
    //     'fieldType': 'email',
    //     'placeholderName': '(Text Area) Your Question here',
    //     'displayName': "Linear Scale",
    //     'iconPath': <LinearScaleOutlinedIcon
    //         sx={{ color: "rgb(38, 38, 39)", fontSize: "18px" }}
    //     />,
    //     'bgcolor': 'rgb(55, 156, 251)'
    // },
    // {
    //     'type': 'email',
    //     'fieldType': 'email',
    //     'placeholderName': '(Text Area) Your Question here',
    //     'displayName': "Signature",
    //     'iconPath': <BorderColorOutlinedIcon
    //         sx={{ color: "rgb(38, 38, 39)", fontSize: "18px" }}
    //     />,
    //     'bgcolor': 'rgb(251, 161, 55)'
    // },
    // {
    //     'type': 'email',
    //     'fieldType': 'email',
    //     'placeholderName': '(Text Area) Your Question here',
    //     'displayName': "Matrix",
    //     'iconPath': <ViewCompactOutlinedIcon
    //         sx={{ color: "rgb(38, 38, 39)", fontSize: "18px" }}
    //     />,
    //     'bgcolor': 'rgb(253, 231, 155)'
    // },
];

// export const LayoutBlockHeaderList = [
//     {
//         'type': 'email',
//         'fieldType': 'email',
//         'placeholderName': '(Text Area) Your Question here',
//         'displayName': "Heading 1",
//         'iconHeader': 'H',
//         'iconLabel': '1',
//         'bgcolor': 'rgb(173, 235, 228)'
//     },
//     {
//         'type': 'email',
//         'fieldType': 'email',
//         'placeholderName': '(Text Area) Your Question here',
//         'displayName': "Heading 2",
//         'iconHeader': 'H',
//         'iconLabel': '2',
//         'bgcolor': 'rgb(173, 235, 228)'
//     },
//     {
//         'type': 'email',
//         'fieldType': 'email',
//         'placeholderName': '(Text Area) Your Question here',
//         'displayName': "Heading 3",
//         'iconHeader': 'H',
//         'iconLabel': '3',
//         'bgcolor': 'rgb(173, 235, 228)'
//     },
// ];

export const LayoutBlockList = [
    {
        id: 25455,
        inputType: "custom",
        fieldType: "conditionallogic",
        labelName: "",
        description: "",
        placeholderName: "",
        displayName: "Conditional Logic",
        'iconPath': <RepeatIcon
            sx={{ color: "rgb(38, 38, 39)", fontSize: "18px" }}
        />,
        "settings": {}
    },
    {
        'inputType': 'label',
        'fieldType': 'label',
        'placeholderName': '(Text Area) Your Question here',
        'displayName': "Label",
        'iconPath': <img src={Label} alt='label-icon' style={{ height: '26px', width: '26px' }} />,
        'bgcolor': 'rgb(251, 206, 55)',
        "datakey": "",
        "isShow": true,
        "labelValue": ""
    },
    // {
    //     'type': 'email',
    //     'fieldType': 'email',
    //     'placeholderName': '(Text Area) Your Question here',
    //     'displayName': "Text",
    //     'iconPath': <TitleRoundedIcon
    //         sx={{ color: "rgb(38, 38, 39)", fontSize: "18px" }}
    //     />,
    //     'bgcolor': 'rgb(105, 181, 252)'
    // },
    {
        'inputType': 'divider',
        'fieldType': 'divider',
        'placeholderName': '(Text Area) Your Question here',
        'displayName': "Divider",
        'iconPath': <img src={divider} alt='divider-icon' style={{ height: '26px', width: '26px' }} />,
        'bgcolor': 'rgb(251, 161, 55)',
        "datakey": "",
        "isShow": true
    },
    {
        'inputType': 'displaytext',
        'fieldType': 'displaytext',
        'placeholderName': '(Text Area) Your Question here',
        'displayName': "Display Text",
        'iconPath': <img src={DisplayText} alt='display-text-icon' style={{ height: '26px', width: '26px' }} />,
        'bgcolor': 'rgb(105, 181, 252)',
        "datakey": "",
        "isShow": true
    },
    {
        'inputType': 'radio',
        'fieldType': 'yes/no',
        'placeholderName': '(Text Area) Your Question here',
        'displayName': "Yes or No",
        'iconPath': <img src={yesOrno} alt='yes-icon' style={{ height: '26px', width: '26px' }} />,
        'bgcolor': 'rgb(105, 181, 252)',
        "datakey": "",
        "isShow": true,
        "choices": [
            { id: "Yes", value: "Yes" },
            { id: "No", value: "No" }
        ],
    },

    {
        'type': 'pagebreak',
        'fieldType': 'pagebreak',
        'placeholderName': '(Text Area) Your Question here',
        'displayName': "Page Break",
        'iconPath': <img src={PageBreak} alt='page-break-icon' style={{ height: '26px', width: '26px' }} />,
        'bgcolor': 'rgb(251, 161, 55)',
        "datakey": "",
        "isShow": true,
        "btnValue": "",
        "textValue": ""
    },
    // {
    //     'type': 'email',
    //     'fieldType': 'email',
    //     'placeholderName': '(Text Area) Your Question here',
    //     'displayName': "New Page",
    //     'iconPath': <InsertDriveFileOutlinedIcon
    //         sx={{ color: "rgb(38, 38, 39)", fontSize: "18px" }}
    //     />,
    //     'bgcolor': 'rgb(133, 224, 214)'
    // },
    // {
    //     'type': 'email',
    //     'fieldType': 'email',
    //     'placeholderName': '(Text Area) Your Question here',
    //     'displayName': "'Thank You' Page",
    //     'iconPath': <SentimentSatisfiedRoundedIcon
    //         sx={{ color: "rgb(38, 38, 39)", fontSize: "18px" }}
    //     />,
    //     'bgcolor': 'rgb(252, 218, 105)'
    // },
];

export const EmbedBlockList = [
    {
        'inputType': 'custom',
        'fieldType': 'embedimage',
        'placeholderName': '',
        'displayName': "Embed Image",
        'iconPath': <img src={embedImg} alt='embedimg-icon' style={{ height: '26px', width: '26px' }} />,
        'bgcolor': 'rgb(251, 161, 55)',
        "datakey": "",
        "isShow": true
    },
    {
        'inputType': 'custom',
        'fieldType': 'embedvideo',
        'placeholderName': '',
        'displayName': "Embed Video",
        'iconPath': <img src={embedVideo} alt='embedvideo-icon' style={{ height: '26px', width: '26px' }} />,
        'bgcolor': 'rgb(105, 181, 252)',
        "datakey": "",
        "isShow": true
    },
    {
        'inputType': 'custom',
        'fieldType': 'embedaudio',
        'placeholderName': '',
        'displayName': "Embed Audio",
        'iconPath': <img src={embedAudio} alt='embedaudio-icon' style={{ height: '26px', width: '26px' }} />,
        'bgcolor': 'rgb(173, 235, 228)',
        "datakey": "",
        "isShow": true
    },
    {
        'inputType': 'custom',
        'fieldType': 'embedanything',
        'placeholderName': '',
        'displayName': "Embed Anything",
        'iconPath': <img src={Compass} alt='compass-icon' style={{ height: '26px', width: '26px' }} />,
        'bgcolor': 'rgb(251, 206, 55)',
        "datakey": "",
        "isShow": true
    },
];

// export const AdvancedBlockList = [
//     {
//         'type': 'email',
//         'fieldType': 'email',
//         'placeholderName': '(Text Area) Your Question here',
//         'displayName': "Conditional Logic",
//         'iconPath': <EarbudsOutlinedIcon
//             sx={{ color: "rgb(38, 38, 39)", fontSize: "18px" }}
//         />,
//         'bgcolor': 'rgb(55, 156, 251)'
//     },
//     {
//         'type': 'email',
//         'fieldType': 'email',
//         'placeholderName': '(Text Area) Your Question here',
//         'displayName': "Calculated Fields",
//         'iconPath': <PercentOutlinedIcon
//             sx={{ color: "rgb(38, 38, 39)", fontSize: "18px" }}
//         />,
//         'bgcolor': 'rgb(252, 185, 105)'
//     },
//     {
//         'type': 'email',
//         'fieldType': 'email',
//         'placeholderName': '(Text Area) Your Question here',
//         'displayName': "Hidden Fields",
//         'iconPath': <VisibilityOffOutlinedIcon
//             sx={{ color: "rgb(38, 38, 39)", fontSize: "18px" }}
//         />,
//         'bgcolor': 'rgb(155, 206, 253)'
//     },
//     {
//         'type': 'email',
//         'fieldType': 'email',
//         'placeholderName': '(Text Area) Your Question here',
//         'displayName': "reCAPTCHA",
//         'iconPath': <HowToRegOutlinedIcon
//             sx={{ color: "rgb(38, 38, 39)", fontSize: "18px" }}
//         />,
//         'bgcolor': 'rgb(214, 92, 153)'
//     },
//     {
//         'type': 'email',
//         'fieldType': 'email',
//         'placeholderName': '(Text Area) Your Question here',
//         'displayName': "",
//         'iconPath': '',
//         'bgcolor': ''
//     },
// ];

recommendedList.forEach((data: any) => {
    data.isActive = false;
})

inputBlockList.forEach((data: any) => {
    data.isActive = false;
})

LayoutBlockList.forEach((data: any) => {
    data.isActive = false;
})

EmbedBlockList.forEach((data: any) => {
    data.isActive = false;
})