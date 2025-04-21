import { ShortlistDataType } from "./ShortData";

export const MasterShortlistData: ShortlistDataType[] = [
    {
        id: "a21a1b1c-4dda-488e-8500-5fc9960925c0",
        type: "default",
        position: {
            x: 487,
            y: 58
        },
        data: {
            stageCompleted: true,
            stageOrder: 1,
            stageId: "10",
            id: "a21a1b1c-4dda-488e-8500-5fc9960925c0",
            stageName: "Shortlist",
            stageLabel: "Shortlist",
            isFormEnabled: false,
            formJsonData: [],
            nextStagesList: ["8c108fd9-0d2c-4dc8-934e-08cadf6e42b5", "d4232181-93f8-4a54-858d-c162b20f5663", "76b5f008-c894-4b12-abaa-6c8db2e3689f"],
            type: "default",
            recruiterName: "Aditya Kumar",
            statusDate: "04/30/2024"
        },
        dragHandle: ".customDragHandle",
        width: 250,
        height: 59,
        autoId: 1000
    },
    {
        id: "8c108fd9-0d2c-4dc8-934e-08cadf6e42b5",
        type: "default",
        position: {
            x: 85,
            y: 189
        },
        data: {
            stageCompleted: false,
            stageOrder: 2,
            stageId: "100",
            id: "8c108fd9-0d2c-4dc8-934e-08cadf6e42b5",
            stageName: "Submit",
            stageLabel: "Submit",
            isFormEnabled: true,
            formJsonData:
                [{
                    inputType: "text",
                    fieldType: "textbox",
                    placeholderName: "(Text Box) Your Question here",
                    displayName: "Text Box",
                    iconPath: {
                        type: "img",
                        key: null,
                        ref: null,
                        props: {
                            src: "/src/components/Dashboard/Letters/Workflow/FormBuilder/shared/icons/text-bax.png",
                            alt: "text-box-icon",
                            style: {
                                height: "26px",
                                width: "26px"
                            }
                        },
                        _owner: null,
                        _store: {}
                    },
                    bgcolor: "rgb(55, 156, 251)",
                    datakey: "",
                    readonly: false,
                    isMask: false,
                    isShow: true,
                    helptext: "",
                    placeholder: "",
                    allowedInputs: [],
                    isActive: false,
                    id: "cfd5e5e1-d066-4ca9-9956-75f530a69aff",
                    labelName: "Candidate Name",
                    description: ""
                },
                {
                    inputType: "email",
                    fieldType: "email",
                    placeholderName: "(Text Area) Your Question here",
                    displayName: "Email",
                    iconPath: {
                        type: "img",
                        key: null,
                        ref: null,
                        props: {
                            src: "/src/components/Dashboard/Letters/Workflow/FormBuilder/shared/icons/email.png",
                            alt: "email-icon",
                            style: {
                                height: "26px",
                                width: "26px"
                            }
                        },
                        _owner: null,
                        _store: {}
                    },
                    bgcolor: "rgb(155, 206, 253)",
                    datakey: "",
                    isShow: true,
                    helptext: "",
                    isActive: false,
                    id: "8050a07f-66f9-4b1d-abf4-10634818b559",
                    labelName: "Email",
                    description: "",
                    allowedInputs: []
                },
                {
                    inputType: "text",
                    fieldType: "phone",
                    placeholderName: "(Text Area) Your Question here",
                    displayName: "Phone",
                    iconPath: {
                        type: "img",
                        key: null,
                        ref: null,
                        props: {
                            src: "/src/components/Dashboard/Letters/Workflow/FormBuilder/shared/icons/phone.png",
                            alt: "phone-icon",
                            style: {
                                height: "26px",
                                width: "26px"
                            }
                        },
                        _owner: null,
                        _store: {}
                    },
                    bgcolor: "rgb(173, 235, 228)",
                    datakey: "",
                    isShow: true,
                    helptext: "",
                    isValidate: false,
                    isPhoneVerified: false,
                    isActive: true,
                    id: "039d08b2-5e1f-44ff-8e37-27c82a728955",
                    labelName: "Phone",
                    description: "",
                    allowedInputs: []
                }],
            nextStagesList: ["39d8b9d6-d576-4ab4-a6be-e8a0f5114556", "b8accf83-d5d5-47fb-8be9-59cfb6ad68fe"],
            type: "default",
            recruiterName: "Aditya Kumar",
            statusDate: "04/30/2024"
        },
        dragHandle: ".customDragHandle",
        width: 250,
        height: 59,
        autoId: 2000
    },
    {
        id: "d4232181-93f8-4a54-858d-c162b20f5663",
        type: "default",
        position: {
            x: 483.5915935762995,
            y: 192.50027886441825
        },
        data: {
            stageCompleted: false,
            stageOrder: 3,
            stageId: "200",
            id: "d4232181-93f8-4a54-858d-c162b20f5663",
            stageName: "Approve",
            stageLabel: "Approve",
            isFormEnabled: false,
            formJsonData: [],
            nextStagesList: [],
            type: "default",
            recruiterName: "Aditya Kumar",
            statusDate: "04/30/2024"
        },
        dragHandle: ".customDragHandle",
        width: 250,
        height: 59,
        selected: false,
        positionAbsolute: {
            x: 483.5915935762995,
            y: 192.50027886441825
        },
        dragging: false,
        autoId: 2001
    },
    {
        id: "76b5f008-c894-4b12-abaa-6c8db2e3689f",
        type: "default",
        position: {
            x: 940,
            y: 221
        },
        data: {
            stageCompleted: false,
            stageOrder: 4,
            stageId: "300",
            id: "76b5f008-c894-4b12-abaa-6c8db2e3689f",
            stageName: "Withdraw",
            stageLabel: "Withdraw",
            isFormEnabled: false,
            formJsonData: [],
            nextStagesList: [],
            type: "default",
            recruiterName: "Aditya Kumar",
            statusDate: "04/30/2024"
        },
        dragHandle: ".customDragHandle",
        width: 250,
        height: 59,
        autoId: 2002
    },
    {
        id: "39d8b9d6-d576-4ab4-a6be-e8a0f5114556",
        type: "default",
        position: {
            x: 83.38954366537308,
            y: 385.33545772792866
        },
        data: {
            stageCompleted: false,
            stageOrder: 5,
            stageId: "400",
            id: "39d8b9d6-d576-4ab4-a6be-e8a0f5114556",
            stageName: "Interview",
            stageLabel: "Interview",
            isFormEnabled: true,
            formJsonData:
                [{
                    inputType: "text",
                    fieldType: "textbox",
                    placeholderName: "(Text Box) Your Question here",
                    displayName: "Text Box",
                    iconPath: {
                        type: "img",
                        key: null,
                        ref: null,
                        props: {
                            src: "/src/components/Dashboard/Letters/Workflow/FormBuilder/shared/icons/text-bax.png",
                            alt: "text-box-icon",
                            style: {
                                height: "26px",
                                width: "26px"
                            }
                        },
                        _owner: null,
                        _store: {}
                    },
                    bgcolor: "rgb(55, 156, 251)",
                    datakey: "",
                    readonly: false,
                    isMask: false,
                    isShow: true,
                    helptext: "",
                    placeholder: "",
                    allowedInputs: [],
                    isActive: false,
                    id: "0c4719a3-275f-4460-90be-1344164acc65",
                    labelName: "Regional Manager ",
                    description: ""
                },
                {
                    inputType: "dropdown",
                    fieldType: "dropdown",
                    placeholderName: "(Text Area) Your Question here",
                    displayName: "Dropdown",
                    iconPath: {
                        type: {
                            type: {},
                            compare: null
                        },
                        key: null,
                        ref: null,
                        props: {
                            sx: {
                                color: "#FFF",
                                fontSize: "18px"
                            }
                        },
                        _owner: null,
                        _store: {}
                    },
                    bgcolor: "rgb(0,0,0,0.8)",
                    options: ["Indeed", "LinkedIn"],
                    isShow: true,
                    helptext: "",
                    isActive: true,
                    id: "771cfa27-0ab9-42e5-887e-d1248fa3c9de",
                    labelName: "Source",
                    description: "",
                    allowedInputs: []
                }],
            nextStagesList: ["74417eae-3335-4046-8bfd-585f4d1f04d7"],
            type: "default",
            recruiterName: "Aditya Kumar",
            statusDate: "04/30/2024"
        },
        dragHandle: ".customDragHandle",
        width: 250,
        height: 59,
        selected: false,
        positionAbsolute: {
            x: 83.38954366537308,
            y: 385.33545772792866
        },
        dragging: false,
        autoId: 3000
    },
    {
        id: "b8accf83-d5d5-47fb-8be9-59cfb6ad68fe",
        type: "default",
        position: {
            x: 463.4825315637638,
            y: 384.60828640589887
        },
        data: {
            stageCompleted: false,
            stageOrder: 6,
            stageId: "500",
            id: "b8accf83-d5d5-47fb-8be9-59cfb6ad68fe",
            stageName: "Offer",
            stageLabel: "Offer",
            isFormEnabled: true,
            formJsonData:
                [{
                    inputType: "text",
                    fieldType: "textbox",
                    placeholderName: "(Text Box) Your Question here",
                    displayName: "Text Box",
                    iconPath: {
                        type: "img",
                        key: null,
                        ref: null,
                        props: {
                            src: "/src/components/Dashboard/Letters/Workflow/FormBuilder/shared/icons/text-bax.png",
                            alt: "text-box-icon",
                            style: {
                                height: "26px",
                                width: "26px"
                            }
                        },
                        _owner: null,
                        _store: {}
                    },
                    bgcolor: "rgb(55, 156, 251)",
                    datakey: "",
                    readonly: false,
                    isMask: false,
                    placeholder: "",
                    isShow: true,
                    helptext: "",
                    isActive: true,
                    id: "1b508b4e-dbe1-4886-ac76-aa62d989e44a",
                    labelName: "Package Offered",
                    description: "",
                    allowedInputs: []
                }],
            nextStagesList: ["02d16224-f4a8-4567-adb9-6cb2f3e6e7cf"],
            type: "default",
            recruiterName: "Aditya Kumar",
            statusDate: "04/30/2024"
        },
        dragHandle: ".customDragHandle",
        width: 250,
        height: 59,
        selected: false,
        positionAbsolute: {
            x: 463.4825315637638,
            y: 384.60828640589887
        },
        dragging: false,
        autoId: 3001
    },
    {
        id: "02d16224-f4a8-4567-adb9-6cb2f3e6e7cf",
        type: "default",
        position: {
            x: 464.07077876704386,
            y: 547.6077286770624
        },
        data: {
            stageCompleted: false,
            stageOrder: 7,
            stageId: "700",
            id: "02d16224-f4a8-4567-adb9-6cb2f3e6e7cf",
            stageName: "Start",
            stageLabel: "Start",
            isFormEnabled: false,
            formJsonData: [],
            nextStagesList: ["74417eae-3335-4046-8bfd-585f4d1f04d7", "e280cb9f-3694-4281-ad08-d95eb37d3e20"],
            type: "default",
            recruiterName: "Aditya Kumar",
            statusDate: "04/30/2024"
        },
        dragHandle: ".customDragHandle",
        width: 250,
        height: 59,
        selected: false,
        positionAbsolute: {
            x: 464.07077876704386,
            y: 547.6077286770624
        },
        dragging: false,
        autoId: 5000
    },
    {
        id: "74417eae-3335-4046-8bfd-585f4d1f04d7",
        type: "default",
        position: {
            x: 445.57105763146217,
            y: 767.9225894735354
        },
        data: {
            stageCompleted: false,
            stageOrder: 8,
            stageId: "800",
            id: "74417eae-3335-4046-8bfd-585f4d1f04d7",
            stageName: "Reject",
            stageLabel: "Reject",
            isFormEnabled: false,
            formJsonData: [],
            nextStagesList: [],
            type: "default",
            recruiterName: "Aditya Kumar",
            statusDate: "04/30/2024"
        },
        dragHandle: ".customDragHandle",
        width: 250,
        height: 59,
        selected: false,
        positionAbsolute: {
            x: 445.57105763146217,
            y: 767.9225894735354
        },
        dragging: false,
        autoId: 4000
    },
    {
        id: "e280cb9f-3694-4281-ad08-d95eb37d3e20",
        type: "default",
        position: {
            x: 829.0198229871557,
            y: 769.6043823040429
        },
        data: {
            stageCompleted: false,
            stageOrder: 9,
            stageId: "900",
            id: "e280cb9f-3694-4281-ad08-d95eb37d3e20",
            stageName: "Stage",
            stageLabel: "Stage",
            isFormEnabled: false,
            formJsonData: [],
            nextStagesList: ["d4232181-93f8-4a54-858d-c162b20f5663"],
            type: "default",
            recruiterName: "Aditya Kumar",
            statusDate: "04/30/2024"
        },
        dragHandle: ".customDragHandle",
        width: 250,
        height: 59,
        selected: false,
        positionAbsolute: {
            x: 829.0198229871557,
            y: 769.6043823040429
        },
        dragging: false,
        autoId: 6000
    }]