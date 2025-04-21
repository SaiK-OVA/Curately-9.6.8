import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import EncryptDecryptService from '../../../../../../../shared/services/encryption/encrypt-decrypt.service';


export const formFields = [
    {
        'id': 1,
        'labelName': 'First name',
        'description': '',
        'inputType': 'text',
        'fieldType': 'textbox',
        'isRequired': false,
        'helptext': '',
        'placeholder': "",
        'placeholderName': '(Text Box) Your Question here',
        'displayName': "Text Box",
        'datakey': "",
        "readonly": false,
        "isMask": false,
        "isShow": true,
        "maxCharacter": null,
        'allowedInputs': '',
    },
    {
        'id': 2,
        'labelName': 'Last name',
        'description': '',
        'inputType': 'text',
        'fieldType': 'textbox',
        'isRequired': false,
        'helptext': '',
        'placeholder': "",
        'placeholderName': '(Text Box) Your Question here',
        'displayName': "Text Box",
        'datakey': "",
        "readonly": false,
        "isMask": false,
        "isShow": true,
        "maxCharacter": null,
        'allowedInputs': '',
    },
    // {
    //     'id': 2,
    //     'labelName': '',
    //     'description': '',
    //     'placeholder': "",
    //     'isRequired': false,
    //     'helptext': '',
    //     'inputType': 'text',
    //     'fieldType': 'textarea',

    //     'placeholderName': '(Text Box) Your Question here',
    //     'displayName': "Text Box",
    //     'datakey': "",
    //     "readonly": false,
    //     "isMask": false,
    //     "isShow": true
    // },
    // {
    //     'id': 3,
    //     'labelName': '',
    //     'description': '',
    //     'helptext': '',
    //     'isRequired': false,
    //     'inputType': "date",
    //     'fieldType': "date",
    //     'placeholderName': '(Text Box) Your Question here',
    //     'displayName': "Text Box",
    //     'datakey': "",
    //     "readonly": false,
    //     "isShow": true,
    //     "enableDependencyVaildation": false,
    //     "dateConditions": {
    //         'name': 'Dependency Validation',
    //         'value': '',
    //         'Type': 'dependency',
    //         'width': 100,
    //         'isDependent': {
    //             'name': '',
    //             'value': true
    //         },
    //         'dependencyObjs': [{
    //             'name': 'Conditions',
    //             'type': 'conditions',
    //             'value': '',
    //             'Possiblevalue': [{
    //                 'name': 'Less than(<)',
    //                 'value': '<',

    //             },
    //             {
    //                 'name': 'Less than or equals(<=)',
    //                 'value': '<=',

    //             },
    //             {
    //                 'name': 'Greater than(>)',
    //                 'value': '>',

    //             },
    //             {
    //                 'name': 'Greater than or equals(>=)',
    //                 'value': '>=',

    //             },
    //             {
    //                 'name': 'Equals(=)',
    //                 'value': '==',

    //             }
    //             ]
    //         },
    //         {
    //             'name': 'Other Fields',
    //             'type': 'otherfield',
    //             'value': '',
    //             'Possiblevalue': [

    //             ]
    //         }
    //         ]


    //     },
    // },
    // {
    //     'id': 4,
    //     'labelName': '',
    //     'description': '',
    //     'inputType': 'pagebreak',

    //     'fieldType': 'pagebreak',
    //     'placeholderName': '(Text Box) Your Question here',
    //     'displayName': "Text Box",
    //     'datakey': "",
    //     "isShow": true

    // },
    // {
    //     'id': 5,
    //     'labelName': 'SSN',
    //     'description': '',
    //     'placeholder': "",
    //     'inputType': 'text',
    //     'helptext': '',
    //     'isRequired': false,
    //     'fieldType': 'ssn',
    //     'placeholderName': 'SSN',
    //     'displayName': "SSN",
    //     'datakey': "",
    //     "isShow": true


    // },
    {
        'id': 6,
        'labelName': '',
        'description': '',
        'inputType': "text",
        'helptext': '',
        'fieldType': "phone",
        'isRequired': false,
        'placeholderName': '(Text Box) Your Question here',
        'displayName': "Text Box",
        'datakey': "",
        "isShow": true,
        "isValidate": false,
        "isPhoneVerified": false

    },
    // {
    //     'id': 7,
    //     'labelName': '',
    //     'description': '',
    //     'inputType': "text",
    //     'helptext': '',
    //     'fieldType': "address",
    //     'isRequired': false,
    //     'placeholder': "",
    //     'enableAddressValidation': false,
    //     'placeholderName': '(Text Box) Your Question here',
    //     'displayName': "Text Box",
    //     'datakey': "",
    //     'enableAutocomplete': false,
    //     "isShow": true

    // },

    // {
    //     'id': 8,
    //     'labelName': '',
    //     'description': '',
    //     'inputType': "pagebreak",
    //     'isRequired': false,

    //     'fieldType': "pagebreak",
    //     'placeholderName': '(Text Box) Your Question here',
    //     'displayName': "Text Box",
    //     'datakey': "",
    //     "isShow": true

    // },
    {
        'id': 9,
        'labelName': '',
        'description': '',
        'inputType': "text",
        'placeholder': "",
        'isRequired': false,
        'fieldType': "email",
        'helptext': '',
        'placeholderName': '(Text Box) Your Question here',
        'displayName': "Text Box",
        'datakey': "",
        "isShow": true

    },
    // {
    //     'id': 10,
    //     'labelName': '',
    //     'isRequired': false,
    //     'description': '',
    //     'inputType': "rating",
    //     'fieldType': "rating",
    //     'helptext': '',
    //     'placeholderName': '(Text Box) Your Question here',
    //     'displayName': "Text Box",
    //     'datakey': "",
    //     "isShow": true
    // },
    // {
    //     'id': 11,
    //     'labelName': '',
    //     'description': '',
    //     'inputType': "custom",
    //     'isRequired': false,
    //     'fieldType': "ranking",
    //     'placeholderName': '(Text Box) Your Question here',
    //     'displayName': "Text Box",
    //     "ranks": [{ id: 1, value: "choice 1", rank: 1 }],
    //     'datakey': "",
    // "isRankUpdated": false,
    //     "isShow": true
    // },
    // {
    //     'id': 12,
    //     'labelName': '',
    //     'description': '',
    //     'inputType': "custom",
    //     'helptext': '',
    //     'fieldType': "displaytext",
    //     'isRequired': false,
    //     'placeholderName': '(Text Box) Your Question here',
    //     'displayName': "Text Box",
    //     'datakey': "",
    //     "isShow": true,
    //     "htmlContent": ""
    // },
    // {
    //     'id': 13,
    //     'labelName': '',
    //     'description': '',
    //     'inputType': "radio",
    //     'fieldType': "opinionscale",
    //     'isRequired': false,
    //     'helptext': '',
    //     'placeholderName': '(Text Box) Your Question here',
    //     'displayName': "Text Box",
    //     'datakey': "",
    //     'minValue': 0,
    //     'maxValue': 10,
    //     "choices": ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    //     "isShow": true
    // },

    // {
    //     'id': 15,
    //     'labelName': '',
    //     'description': '',
    //     'isRequired': false,
    //     'inputType': "custom",
    //     'fieldType': "fileupload",
    //     'helptext': '',
    //     'placeholderName': '(Text Box) Your Question here',
    //     'displayName': "Text Box",
    //     'datakey': "",
    //     "isShow": true,
    //     "file": null,
    //     "isResume":false

    // },
    // {
    //     'id': 16,
    //     'labelName': '',
    //     'description': '',
    //     'inputType': "radio",
    //     'helptext': '',
    //     'fieldType': "yes/no",
    //     'isRequired': false,
    //     'placeholderName': '(Text Box) Your Question here',
    //     'displayName': "Text Box",
    //     "choices": [
    //         { id: 1, value: "Yes" },
    //         { id: 2, value: "No" }
    //     ],

    //     'datakey': "",
    //     "isShow": true
    // },
    // {
    //     'id': 17,
    //     'labelName': '',
    //     'description': '',
    //     'inputType': "custom",

    //     'fieldType': "divider",
    //     'placeholderName': '',
    //     'displayName': "",
    //     'datakey': "",
    //     "isShow": true

    // },

    // {
    //     'id': 18,
    //     'labelName': '',
    //     'description': '',
    //     'inputType': "text",

    //     'fieldType': "label",
    //     'placeholderName': '',
    //     'displayName': "Label",
    //     'datakey': "",
    //     "isShow": true,
    //     "labelValue": ""

    // },
    // {
    //     'id': 19,
    //     'labelName': '',
    //     'isRequired': false,
    //     'helptext': '',
    //     'description': '',
    //     'inputType': "radio",
    //     'fieldType': "netprometer",
    //     'placeholderName': '',
    //     'displayName': "Net Promoter",
    //     'datakey': "",
    //     "choices": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    //     "isShow": true

    // },
    // {
    //     'id': 20,
    //     'labelName': '',
    //     'description': '',
    //     'inputType': "custom",
    //     'fieldType': "embedimage",
    //     'placeholderName': '',
    //     'displayName': "EmbedImage",
    //     'datakey': "",
    //     "isShow": true
    // },
    // {
    //     'id': 21,
    //     'labelName': '',
    //     'description': '',
    //     'inputType': "custom",
    //     'fieldType': "embedvideo",
    //     'placeholderName': '',
    //     'displayName': "EmbedVideo",
    //     'datakey': "",
    //     "isShow": true
    // },
    // {
    //     'id': 22,
    //     'labelName': '',
    //     'description': '',
    //     'inputType': "custom",
    //     'fieldType': "embedaudio",
    //     'placeholderName': '',
    //     'displayName': "EmbedAudio",
    //     'datakey': "",
    //     "isShow": true
    // },
    // {
    //     'id': 23,
    //     'labelName': '',
    //     'description': '',
    //     'inputType': "custom",
    //     'fieldType': "embedanything",
    //     'placeholderName': '',
    //     'displayName': "EmbedAnything",
    //     'datakey': "",
    //     "isShow": true
    // },
    // {
    //     'id': 24,
    //     'labelName': '',
    //     'description': '',
    //     'inputType': "dropdown",
    //     'fieldType': "dropdown",
    //     'helptext': '',
    //     'isRequired': false,
    //     'placeholderName': '',
    //     'displayName': "Dropdown",
    //     'datakey': "",
    //     "options": [],
    //     "isShow": true
    // },
    // {
    //     'id': 25,
    //     'labelName': '',
    //     'description': '',
    //     'inputType': "radio",
    //     'fieldType': "multiplechoice",
    //     'placeholderName': '',
    //     'displayName': "Dropdown",
    //     'datakey': "",
    //     "choices": [{ id: 1, character: "A", value: "Choice 1" }],
    //     "isShow": true

    // },



]

formFields.forEach((form: any) => {
    form.isActive = false;
})

export interface FormField {
    id: number;
    labelName: string;
    description: string;
    fieldType: string;
    placeholderName: string;
    displayName: string;
}

export const getSettings = (key: any) => {
    // console.log(key, "ggg")
    let settings: any[] = [{ "help text": true, }]
    switch (key) {
        case "textbox":
            settings = [{

                "prefill": true,
                "placeholder": true,
                "Read only": true,
                "mask data": true,
                "help text": true,
                "max character": true,

                "input Type":
                    ["Text", "Numeric", "Numeric with decimal"],
            },
            ]
            break;
        case "textarea":
            settings = [
                {
                    "prefill": true,
                    "placeholder": true,
                    "Read only": true,
                    "mask data": false,
                    "help text": true,
                    "max character": true,

                }
            ]
            break;
        case "multiplechoice":
            settings = [
                { prefill: true }
            ]
            break;

        case "fileupload":
            settings = [
                {
                    "help text": true,
                    // "file Type": ["img", "pdf", "doc"],

                    // "prefill": true,
                    "Resume": true
                }
            ]
            break;

        case "ssn":
            settings = [{
                "prefill": true,
                "help text": true,
                "mask data": true

            }]
            break;
        case "address":
            settings = [{
                "help text": true,
                "Google maps": true,
                "Address validation": true,

            }]
            break;
        case "opinionscale":
            settings = [{
                "help text": true,
                "range": "",

            }]
            break;
        case "displaytext":
            settings = [{
                "help text": true,
                "options": ["Heading", "bullet", "bold", "underline", "italic", "strike through", "merge fields"]
            }]
            break;
        case "date":
            settings = [{

                "Read only": true,
                "help text": true,



            },]
            break;
        case "phone":
            settings = [{
                "help text": true,
                "Verify mobile number": true
            }]
            break;
        case "weightedmultiplechoice":
            settings = [{
                "points": true,
                "correct answer": true
            }]
            break;

    }

    return settings
}

export const ConditionalList = {
    'dropdown': [{
        'name': 'is',
        'value': 'is'
    }, {
        'name': 'is not',
        'value': 'isnot'
    }, {
        'name': 'is filled',
        'value': 'isfilled'
    }, {
        'name': 'is blank',
        'value': 'isblank'
    }],
    'radio': [{
        'name': 'is',
        'value': 'is'
    }, {
        'name': 'is not',
        'value': 'isnot'
    }, {
        'name': 'is filled',
        'value': 'isfilled'
    }, {
        'name': 'is blank',
        'value': 'isblank'
    }],
    'weighted': [{
        'name': 'is',
        'value': 'is'
    }, {
        'name': 'is not',
        'value': 'isnot'
    }, {
        'name': 'is filled',
        'value': 'isfilled'
    }, {
        'name': 'is blank',
        'value': 'isblank'
    }],
    'checkbox': [{
        'name': 'is checked',
        'value': 'ischecked'
    }, {
        'name': 'is blank',
        'value': 'isblank'
    }],
    'text': [{
        'name': 'is filled',
        'value': 'isfilled'
    }, {
        'name': 'is blank',
        'value': 'isblank'
    }],
    'alphanumeric': [{
        'name': 'is filled',
        'value': 'isfilled'
    }, {
        'name': 'is blank',
        'value': 'isblank'
    }],
    'email': [{
        'name': 'is filled',
        'value': 'isfilled'
    }, {
        'name': 'is blank',
        'value': 'isblank'
    }],
    'number': [{
        'name': 'is filled',
        'value': 'isfilled'
    }, {
        'name': 'is blank',
        'value': 'isblank'
    }],
    'numberwithdecimal': [{
        'name': 'is filled',
        'value': 'isfilled'
    }, {
        'name': 'is blank',
        'value': 'isblank'
    }],
    'phone-number': [{
        'name': 'is filled',
        'value': 'isfilled'
    }, {
        'name': 'is blank',
        'value': 'isblank'
    }],
    'date': [{
        'name': 'is filled',
        'value': 'isfilled'
    }, {
        'name': 'is blank',
        'value': 'isblank'
    }],
    'textarea': [{
        'name': 'is filled',
        'value': 'isfilled'
    }, {
        'name': 'is blank',
        'value': 'isblank'
    }]
}

// export const API_KEYS = {
//     // AIzaSyBPvFpashJv6w5SFk_7HVO3Y_STF3NN3BQ
//     "gmaps_dev_key": EncryptDecryptService.ds("U2FsdGVkX18LRYggIibAoPin3hbP/ZuTO4Fby/Uj+qcOlMpWFyde1O/nHuiuT72JfhzLkxkOEpEqWfWjmnJN0A==", 'curately'),
//     // AIzaSyDU2gtuDLdiMfEFTygfm-vCEO7UwH-AbBM
//     "gmaps_qa_key": EncryptDecryptService.ds("U2FsdGVkX184cDCyPh3tNHTPzlhM7AqjXQd9yU031/wrSvWlwENYNUZZYiprlSwtFjNTMibDxUBoezAtJ5rE5w==", 'curately')
// }

export const API_KEYS = {
    // AIzaSyBPvFpashJv6w5SFk_7HVO3Y_STF3NN3BQ
    "gmaps_dev_key": window.atob("QUl6YVN5QlB2RnBhc2hKdjZ3NVNGa183SFZPM1lfU1RGM05OM0JR"),
    // AIzaSyDU2gtuDLdiMfEFTygfm-vCEO7UwH-AbBM
    "gmaps_qa_key": window.atob("QUl6YVN5RFUyZ3R1RExkaU1mRUZUeWdmbS12Q0VPN1V3SC1BYkJN")
}

// console.log(window.btoa("AIzaSyDU2gtuDLdiMfEFTygfm-vCEO7UwH-AbBM"));

// console.log(EncryptDecryptService.ds("U2FsdGVkX18LRYggIibAoPin3hbP/ZuTO4Fby/Uj+qcOlMpWFyde1O/nHuiuT72JfhzLkxkOEpEqWfWjmnJN0A==", 'curately'));
// console.log(EncryptDecryptService.ds("U2FsdGVkX184cDCyPh3tNHTPzlhM7AqjXQd9yU031/wrSvWlwENYNUZZYiprlSwtFjNTMibDxUBoezAtJ5rE5w==", 'curately'));
// console.log(EncryptDecryptService.e("AIzaSyBPvFpashJv6w5SFk_7HVO3Y_STF3NN3BQ", 'curately'));


export const isShowOneByOne = true;

export const FORMLIST = ["Form 1", "Form 2", "Form 3", "Form 4"]


export const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

export const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

export const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export const API_KEY = "ZDY2ZmUwZWQtOGNlYy00MTgxLWEwMTAtNzU2M2RjYWY2OTdj"
// https://server-app-anvil.onrender.com
export const URL = "https://node.curately.ai"

export const ANVILFORMFIELDS = [
    {
        "id": "cast934e8550afb911ecaf289fa5a354293a",
        "icon": "IconText",
        "name": "Short Text",
        "rect": [
            [
                40.23,
                615.37
            ],
            [
                300.62,
                615.37
            ],
            [
                300.62,
                585.52
            ],
            [
                40.23,
                585.52
            ]
        ],
        "type": "shortText",
        "aliasId": "shortText",
        "pageNum": 0
    },
    {
        "id": "castab78bd30afb911ecaf289fa5a354293a",
        "icon": "IconCalendar",
        "name": "Date",
        "rect": [
            [
                309.38,
                614.91
            ],
            [
                569.77,
                614.91
            ],
            [
                569.77,
                585.06
            ],
            [
                309.38,
                585.06
            ]
        ],
        "type": "date",
        "format": "MM/DD/YYYY",
        "aliasId": "date",
        "pageNum": 0
    },
    {
        "id": "castba75dde0afb911ecaf289fa5a354293a",
        "key": "name",
        "icon": "IconPerson",
        "name": "Full name",
        "rect": [
            [
                42.13,
                476.96
            ],
            [
                212.54,
                476.96
            ],
            [
                212.54,
                445.45
            ],
            [
                42.13,
                445.45
            ]
        ],
        "type": "fullName",
        "title": "Connect First, Middle, and Last name fields",
        "value": "Full name",
        "aliasId": "name",
        "pageNum": 0,
        "fontSize": "12",
        "required": true,
        "alignment": "center",
        "textColor": "#a00000",
        "fontFamily": "Futura",
        "fontWeight": "boldItalic",
        "chosenFieldType": "oneField"
    },
    {
        "id": "castc69029f0afb911ecaf289fa5a354293a",
        "icon": "IconEmail",
        "name": "Email",
        "rect": [
            [
                219.81,
                477.25
            ],
            [
                390.22,
                477.25
            ],
            [
                390.22,
                445.74
            ],
            [
                219.81,
                445.74
            ]
        ],
        "type": "email",
        "aliasId": "email",
        "pageNum": 0
    },
    {
        "id": "castd8c80340afb911ecaf289fa5a354293a",
        "icon": "IconPhone",
        "name": "Phone",
        "rect": [
            [
                398.16,
                477.21
            ],
            [
                568.57,
                477.21
            ],
            [
                568.57,
                445.7
            ],
            [
                398.16,
                445.7
            ]
        ],
        "type": "phone",
        "format": "USNational",
        "aliasId": "phone",
        "pageNum": 0
    },
    {
        "id": "castf3afd480afb911ecaf289fa5a354293a",
        "name": "US Address",
        "type": "usAddress",
        "aliasId": "usAddress",
        "children": [
            {
                "id": "caste5e121b0afb911ecaf289fa5a354293a",
                "icon": "IconLocation",
                "name": "Street - US Address",
                "rect": [
                    [
                        42.29,
                        422.56
                    ],
                    [
                        568.05,
                        422.56
                    ],
                    [
                        568.05,
                        391.88
                    ],
                    [
                        42.29,
                        391.88
                    ]
                ],
                "type": "usAddress.street1",
                "pageNum": 0,
                "chosenFieldType": "modular"
            },
            {
                "id": "castf84254f0afb911ecaf289fa5a354293a",
                "icon": "IconLocation",
                "name": "City - US Address",
                "rect": [
                    [
                        42.3,
                        367.01
                    ],
                    [
                        303.1,
                        367.01
                    ],
                    [
                        303.1,
                        337.98
                    ],
                    [
                        42.3,
                        337.98
                    ]
                ],
                "type": "usAddress.city",
                "pageNum": 0
            },
            {
                "id": "cast0d81c8f0afba11ecaf289fa5a354293a",
                "icon": "IconLocation",
                "name": "State - US Address",
                "rect": [
                    [
                        311.45,
                        366.97
                    ],
                    [
                        390.23,
                        366.97
                    ],
                    [
                        390.23,
                        337.94
                    ],
                    [
                        311.45,
                        337.94
                    ]
                ],
                "type": "usAddress.state",
                "pageNum": 0
            },
            {
                "id": "cast1c107060afba11ecaf289fa5a354293a",
                "icon": "IconLocation",
                "name": "Zip - US Address",
                "rect": [
                    [
                        399.4,
                        367.34
                    ],
                    [
                        568.16,
                        367.34
                    ],
                    [
                        568.16,
                        338.31
                    ],
                    [
                        399.4,
                        338.31
                    ]
                ],
                "type": "usAddress.zip",
                "pageNum": 0
            }
        ]
    },
    {
        "id": "cast3054bb80afba11ecaf289fa5a354293a",
        "icon": "IconSSN",
        "name": "Social Security Number",
        "rect": [
            [
                41.89,
                313.93
            ],
            [
                301.86,
                313.93
            ],
            [
                301.86,
                284.9
            ],
            [
                41.89,
                284.9
            ]
        ],
        "type": "shortText",
        "format": "ssn",
        "aliasId": "ssn",
        "pageNum": 0
    },
    {
        "id": "cast3e7dc350afba11ecaf289fa5a354293a",
        "icon": "IconEIN",
        "name": "Tax ID Number",
        "rect": [
            [
                311.45,
                313.89
            ],
            [
                566.86,
                313.89
            ],
            [
                566.86,
                284.86
            ],
            [
                311.45,
                284.86
            ]
        ],
        "type": "shortText",
        "format": "ein",
        "aliasId": "ein",
        "pageNum": 0
    },
    {
        "id": "cast542dfa80afba11ecaf289fa5a354293a",
        "icon": "IconCheckbox",
        "name": "Checkbox",
        "rect": [
            [
                37.73,
                155.54
            ],
            [
                56.8,
                155.54
            ],
            [
                56.8,
                136.46
            ],
            [
                37.73,
                136.46
            ]
        ],
        "type": "checkbox",
        "aliasId": "checkbox",
        "pageNum": 0
    },
    {
        "id": "cast6d4d8ee0afba11ecaf289fa5a354293a",
        "name": "Radio Group",
        "type": "radioGroup",
        "aliasId": "radioGroup",
        "children": [
            {
                "id": "cast68d7e540afba11ecaf289fa5a354293a",
                "icon": "IconCheckbox",
                "name": "Red",
                "rect": [
                    [
                        36.54,
                        75.89
                    ],
                    [
                        55.61,
                        75.89
                    ],
                    [
                        55.61,
                        56.81
                    ],
                    [
                        36.54,
                        56.81
                    ]
                ],
                "type": "checkbox",
                "aliasId": "checkbox",
                "pageNum": 0,
                "parentType": "radioGroup"
            },
            {
                "id": "cast77cc0541afba11ecaf289fa5a354293a",
                "icon": "IconCheckbox",
                "name": "Yellow",
                "rect": [
                    [
                        119.46,
                        75.47
                    ],
                    [
                        138.53,
                        75.47
                    ],
                    [
                        138.53,
                        56.39
                    ],
                    [
                        119.46,
                        56.39
                    ]
                ],
                "type": "checkbox",
                "aliasId": "checkbox",
                "pageNum": 0,
                "parentType": "radioGroup"
            },
            {
                "id": "cast79c4c801afba11ecaf289fa5a354293a",
                "icon": "IconCheckbox",
                "name": "Green",
                "rect": [
                    [
                        213.63,
                        75.01
                    ],
                    [
                        232.7,
                        75.01
                    ],
                    [
                        232.7,
                        55.93
                    ],
                    [
                        213.63,
                        55.93
                    ]
                ],
                "type": "checkbox",
                "aliasId": "checkbox",
                "pageNum": 0,
                "parentType": "radioGroup"
            }
        ]
    },
    {
        "id": "cast9e7a0f20afba11ecaf289fa5a354293a",
        "icon": "IconDecimal",
        "name": "Decimal Number",
        "rect": [
            [
                40.63,
                615.37
            ],
            [
                167.93,
                615.37
            ],
            [
                167.93,
                585.51
            ],
            [
                40.63,
                585.51
            ]
        ],
        "type": "number",
        "format": "0,0[.][00]",
        "aliasId": "decimalNumber",
        "pageNum": 1
    },
    {
        "id": "castade3fb60afba11ecaf289fa5a354293a",
        "icon": "IconDollar",
        "name": "Dollar",
        "rect": [
            [
                173.36,
                615.32
            ],
            [
                300.66,
                615.32
            ],
            [
                300.66,
                585.46
            ],
            [
                173.36,
                585.46
            ]
        ],
        "type": "dollar",
        "format": "$0,0[.]00",
        "aliasId": "dollar",
        "pageNum": 1
    },
    {
        "id": "castbaeb8da0afba11ecaf289fa5a354293a",
        "icon": "IconInteger",
        "name": "Integer",
        "rect": [
            [
                305.68,
                615.28
            ],
            [
                432.98,
                615.28
            ],
            [
                432.98,
                585.42
            ],
            [
                305.68,
                585.42
            ]
        ],
        "type": "integer",
        "format": "0,0",
        "aliasId": "integer",
        "pageNum": 1
    },
    {
        "id": "castc59a3bc0afba11ecaf289fa5a354293a",
        "icon": "IconPercent",
        "name": "Percent",
        "rect": [
            [
                438.83,
                615.64
            ],
            [
                566.13,
                615.64
            ],
            [
                566.13,
                585.78
            ],
            [
                438.83,
                585.78
            ]
        ],
        "type": "percent",
        "format": "0,0[.][00]%",
        "aliasId": "percent",
        "pageNum": 1
    },
    {
        "id": "castd764ad40afba11ecaf289fa5a354293a",
        "icon": "IconListThick",
        "name": "Long Text",
        "rect": [
            [
                40.63,
                461.12
            ],
            [
                292.73,
                461.12
            ],
            [
                292.73,
                379.02
            ],
            [
                40.63,
                379.02
            ]
        ],
        "type": "longText",
        "aliasId": "longText",
        "pageNum": 1
    },
    {
        "id": "casted41e7e0afba11ecaf289fa5a354293a",
        "name": "Text per line",
        "type": "textWrap",
        "aliasId": "textPerLine",
        "children": [
            {
                "id": "caste685a9a0afba11ecaf289fa5a354293a",
                "icon": "IconText",
                "name": "Line 1 - Text per line",
                "rect": [
                    [
                        310.56,
                        462.37
                    ],
                    [
                        567.22,
                        462.37
                    ],
                    [
                        567.22,
                        437.49
                    ],
                    [
                        310.56,
                        437.49
                    ]
                ],
                "type": "shortText",
                "pageNum": 1,
                "parentType": "textWrap"
            },
            {
                "id": "castf3874871afba11ecaf289fa5a354293a",
                "icon": "IconText",
                "name": "Line 2 - Text per line",
                "rect": [
                    [
                        310.15,
                        432.1
                    ],
                    [
                        566.81,
                        432.1
                    ],
                    [
                        566.81,
                        407.22
                    ],
                    [
                        310.15,
                        407.22
                    ]
                ],
                "type": "shortText",
                "pageNum": 1,
                "parentType": "textWrap"
            },
            {
                "id": "castf8c746f1afba11ecaf289fa5a354293a",
                "icon": "IconText",
                "name": "Line 3 - Text per line",
                "rect": [
                    [
                        310.2,
                        402.61
                    ],
                    [
                        566.86,
                        402.61
                    ],
                    [
                        566.86,
                        377.73
                    ],
                    [
                        310.2,
                        377.73
                    ]
                ],
                "type": "shortText",
                "pageNum": 1,
                "parentType": "textWrap"
            }
        ]
    },
    {
        "id": "cast24bf1350afbb11ecaf289fa5a354293a",
        "name": "Text per letter",
        "type": "charList",
        "aliasId": "textPerLetter",
        "children": [
            {
                "id": "cast1d0ed820afbb11ecaf289fa5a354293a",
                "icon": "IconText",
                "name": "1 - Text per letter",
                "rect": [
                    [
                        39.39,
                        332.18
                    ],
                    [
                        63.44,
                        332.18
                    ],
                    [
                        63.44,
                        308.14
                    ],
                    [
                        39.39,
                        308.14
                    ]
                ],
                "type": "shortText",
                "pageNum": 1,
                "parentType": "charList"
            },
            {
                "id": "cast37f019b1afbb11ecaf289fa5a354293a",
                "icon": "IconText",
                "name": "2 - Text per letter",
                "rect": [
                    [
                        67.18,
                        333
                    ],
                    [
                        91.23,
                        333
                    ],
                    [
                        91.23,
                        308.96
                    ],
                    [
                        67.18,
                        308.96
                    ]
                ],
                "type": "shortText",
                "pageNum": 1,
                "parentType": "charList"
            },
            {
                "id": "cast41b1f6d1afbb11ecaf289fa5a354293a",
                "icon": "IconText",
                "name": "3 - Text per letter",
                "rect": [
                    [
                        94.54,
                        333
                    ],
                    [
                        118.59,
                        333
                    ],
                    [
                        118.59,
                        308.96
                    ],
                    [
                        94.54,
                        308.96
                    ]
                ],
                "type": "shortText",
                "pageNum": 1,
                "parentType": "charList"
            },
            {
                "id": "cast454a11b1afbb11ecaf289fa5a354293a",
                "icon": "IconText",
                "name": "4 - Text per letter",
                "rect": [
                    [
                        122.37,
                        332.96
                    ],
                    [
                        146.42,
                        332.96
                    ],
                    [
                        146.42,
                        308.92
                    ],
                    [
                        122.37,
                        308.92
                    ]
                ],
                "type": "shortText",
                "pageNum": 1,
                "parentType": "charList"
            },
            {
                "id": "cast50839ab1afbb11ecaf289fa5a354293a",
                "icon": "IconText",
                "name": "5 - Text per letter",
                "rect": [
                    [
                        150.61,
                        332.49
                    ],
                    [
                        174.66,
                        332.49
                    ],
                    [
                        174.66,
                        308.45
                    ],
                    [
                        150.61,
                        308.45
                    ]
                ],
                "type": "shortText",
                "pageNum": 1,
                "parentType": "charList"
            },
            {
                "id": "cast55f3d0f1afbb11ecaf289fa5a354293a",
                "icon": "IconText",
                "name": "6 - Text per letter",
                "rect": [
                    [
                        178.44,
                        332.45
                    ],
                    [
                        202.49,
                        332.45
                    ],
                    [
                        202.49,
                        308.41
                    ],
                    [
                        178.44,
                        308.41
                    ]
                ],
                "type": "shortText",
                "pageNum": 1,
                "parentType": "charList"
            },
            {
                "id": "cast59b39811afbb11ecaf289fa5a354293a",
                "icon": "IconText",
                "name": "7 - Text per letter",
                "rect": [
                    [
                        206.68,
                        332.4
                    ],
                    [
                        230.73,
                        332.4
                    ],
                    [
                        230.73,
                        308.36
                    ],
                    [
                        206.68,
                        308.36
                    ]
                ],
                "type": "shortText",
                "pageNum": 1,
                "parentType": "charList"
            },
            {
                "id": "cast5cce4591afbb11ecaf289fa5a354293a",
                "icon": "IconText",
                "name": "8 - Text per letter",
                "rect": [
                    [
                        234.5,
                        333.19
                    ],
                    [
                        258.55,
                        333.19
                    ],
                    [
                        258.55,
                        309.15
                    ],
                    [
                        234.5,
                        309.15
                    ]
                ],
                "type": "shortText",
                "pageNum": 1,
                "parentType": "charList"
            },
            {
                "id": "cast621dd471afbb11ecaf289fa5a354293a",
                "icon": "IconText",
                "name": "9 - Text per letter",
                "rect": [
                    [
                        262.33,
                        332.73
                    ],
                    [
                        286.38,
                        332.73
                    ],
                    [
                        286.38,
                        308.69
                    ],
                    [
                        262.33,
                        308.69
                    ]
                ],
                "type": "shortText",
                "pageNum": 1,
                "parentType": "charList"
            },
            {
                "id": "cast6628d561afbb11ecaf289fa5a354293a",
                "icon": "IconText",
                "name": "10 - Text per letter",
                "rect": [
                    [
                        290.17,
                        332.68
                    ],
                    [
                        314.22,
                        332.68
                    ],
                    [
                        314.22,
                        308.64
                    ],
                    [
                        290.17,
                        308.64
                    ]
                ],
                "type": "shortText",
                "pageNum": 1,
                "parentType": "charList"
            },
            {
                "id": "cast6a16b161afbb11ecaf289fa5a354293a",
                "icon": "IconText",
                "name": "11 - Text per letter",
                "rect": [
                    [
                        318.41,
                        332.63
                    ],
                    [
                        342.46,
                        332.63
                    ],
                    [
                        342.46,
                        308.59
                    ],
                    [
                        318.41,
                        308.59
                    ]
                ],
                "type": "shortText",
                "pageNum": 1,
                "parentType": "charList"
            },
            {
                "id": "cast6dee9461afbb11ecaf289fa5a354293a",
                "icon": "IconText",
                "name": "12 - Text per letter",
                "rect": [
                    [
                        346.65,
                        332.58
                    ],
                    [
                        370.7,
                        332.58
                    ],
                    [
                        370.7,
                        308.54
                    ],
                    [
                        346.65,
                        308.54
                    ]
                ],
                "type": "shortText",
                "pageNum": 1,
                "parentType": "charList"
            },
            {
                "id": "cast70d7aa91afbb11ecaf289fa5a354293a",
                "icon": "IconText",
                "name": "13 - Text per letter",
                "rect": [
                    [
                        374.48,
                        332.95
                    ],
                    [
                        398.53,
                        332.95
                    ],
                    [
                        398.53,
                        308.91
                    ],
                    [
                        374.48,
                        308.91
                    ]
                ],
                "type": "shortText",
                "pageNum": 1,
                "parentType": "charList"
            },
            {
                "id": "cast73d6e0d1afbb11ecaf289fa5a354293a",
                "icon": "IconText",
                "name": "14 - Text per letter",
                "rect": [
                    [
                        401.89,
                        332.9
                    ],
                    [
                        425.94,
                        332.9
                    ],
                    [
                        425.94,
                        308.86
                    ],
                    [
                        401.89,
                        308.86
                    ]
                ],
                "type": "shortText",
                "pageNum": 1,
                "parentType": "charList"
            },
            {
                "id": "cast775c3701afbb11ecaf289fa5a354293a",
                "icon": "IconText",
                "name": "15 - Text per letter",
                "rect": [
                    [
                        430.55,
                        332.85
                    ],
                    [
                        454.6,
                        332.85
                    ],
                    [
                        454.6,
                        308.81
                    ],
                    [
                        430.55,
                        308.81
                    ]
                ],
                "type": "shortText",
                "pageNum": 1,
                "parentType": "charList"
            },
            {
                "id": "cast7b7f2cc1afbb11ecaf289fa5a354293a",
                "icon": "IconText",
                "name": "16 - Text per letter",
                "rect": [
                    [
                        458.38,
                        332.8
                    ],
                    [
                        482.43,
                        332.8
                    ],
                    [
                        482.43,
                        308.76
                    ],
                    [
                        458.38,
                        308.76
                    ]
                ],
                "type": "shortText",
                "pageNum": 1,
                "parentType": "charList"
            },
            {
                "id": "cast7ed44b31afbb11ecaf289fa5a354293a",
                "icon": "IconText",
                "name": "17 - Text per letter",
                "rect": [
                    [
                        486.62,
                        332.75
                    ],
                    [
                        510.67,
                        332.75
                    ],
                    [
                        510.67,
                        308.71
                    ],
                    [
                        486.62,
                        308.71
                    ]
                ],
                "type": "shortText",
                "pageNum": 1,
                "parentType": "charList"
            },
            {
                "id": "cast81b30121afbb11ecaf289fa5a354293a",
                "icon": "IconText",
                "name": "18 - Text per letter",
                "rect": [
                    [
                        514.45,
                        333.12
                    ],
                    [
                        538.5,
                        333.12
                    ],
                    [
                        538.5,
                        309.08
                    ],
                    [
                        514.45,
                        309.08
                    ]
                ],
                "type": "shortText",
                "pageNum": 1,
                "parentType": "charList"
            }
        ]
    },
    {
        "id": "castd6acb270afbb11ecaf289fa5a354293a",
        "icon": "IconImage",
        "name": "Image",
        "rect": [
            [
                39.8,
                188.71
            ],
            [
                285.27,
                188.71
            ],
            [
                285.27,
                36.96
            ],
            [
                39.8,
                36.96
            ]
        ],
        "type": "imageFile",
        "aliasId": "image",
        "pageNum": 1
    },
    {
        "id": "castdf705970afbb11ecaf289fa5a354293a",
        "icon": "IconSignature",
        "name": "Signature",
        "rect": [
            [
                367.37,
                197.42
            ],
            [
                566.8,
                197.42
            ],
            [
                566.8,
                170.46
            ],
            [
                367.37,
                170.46
            ]
        ],
        "type": "signature",
        "aliasId": "signature",
        "pageNum": 1
    },
    {
        "id": "casteeed3170afbb11ecaf289fa5a354293a",
        "icon": "IconInitial",
        "name": "Signature Initial",
        "rect": [
            [
                343.78,
                154.66
            ],
            [
                436.23,
                154.66
            ],
            [
                436.23,
                127.7
            ],
            [
                343.78,
                127.7
            ]
        ],
        "type": "initial",
        "aliasId": "signatureInitial",
        "pageNum": 1
    },
    {
        "id": "cast03c2c010afbc11ecaf289fa5a354293a",
        "icon": "IconSignatureDate",
        "name": "Signature Date",
        "rect": [
            [
                477.76,
                153.38
            ],
            [
                567.31,
                153.38
            ],
            [
                567.31,
                126.42
            ],
            [
                477.76,
                126.42
            ]
        ],
        "type": "signatureDate",
        "format": "MM/DD/YYYY",
        "aliasId": "signatureDate",
        "pageNum": 1
    },
    {
        "id": "cast1311d150afbc11ecaf289fa5a354293a",
        "icon": "IconPerson",
        "name": "Signer Name",
        "rect": [
            [
                381.21,
                110.2
            ],
            [
                566.12,
                110.2
            ],
            [
                566.12,
                83.24
            ],
            [
                381.21,
                83.24
            ]
        ],
        "type": "signerName",
        "aliasId": "signerName",
        "pageNum": 1
    },
    {
        "id": "cast216eba60afbc11ecaf289fa5a354293a",
        "icon": "IconEmail",
        "name": "Signer Email",
        "rect": [
            [
                382.08,
                66.2
            ],
            [
                566.99,
                66.2
            ],
            [
                566.99,
                39.24
            ],
            [
                382.08,
                39.24
            ]
        ],
        "type": "signerEmail",
        "aliasId": "signerEmail",
        "pageNum": 1
    },
    {
        "id": "cast23d42de0947011ee88bdbb11280b315a",
        "icon": "IconText",
        "name": "New 2",
        "rect": [
            [
                473.44,
                777.92
            ],
            [
                566.8,
                777.92
            ],
            [
                566.8,
                741.61
            ],
            [
                473.44,
                741.61
            ]
        ],
        "type": "shortText",
        "pageNum": 0
    },
    {
        "id": "cast84c1c7c1afbb11ecaf289fa5a354293a",
        "icon": "IconSignature",
        "name": "19 - Text per letter",
        "rect": [
            [
                542.27,
                333.07
            ],
            [
                566.32,
                333.07
            ],
            [
                566.32,
                309.03
            ],
            [
                542.27,
                309.03
            ]
        ],
        "type": "signature",
        "pageNum": 1,
        "parentType": "charList"
    },

]