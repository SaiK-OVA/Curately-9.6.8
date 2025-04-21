const specialLinks = [{
    type: 'unsubscribe',
    label: 'SpecialLink.Unsubscribe',
    link: 'http://[unsubscribe]/'
}, {
    type: 'subscribe',
    label: 'SpecialLink.Subscribe',
    link: 'http://[subscribe]/'
}]
const mergeTags = [
    {
        name:"First name",
        value: "<<First name>> "
    },
    {
        name:"Last name",
        value: "<<Last name>> "
    },
    {
        name:"First name and Last name",
        value: "<<First name and Last name>> "
    },
    {
        name:"Email",
        value: "<<Email>> "
    },
    {
        name:"Signature",
        value: "<<Signature>> "
    },
    {
        name:"Candid",
        value: "<<Candid>> "
    },
    {
        name:"CandidateLink",
        value: "<<CandidateLink>> "
    },
    {
        name:"Recruiter Name",
        value: "<<Recruiter Name>> "
    },
    // {
    //     name:"JobTitle",
    //     value: "<<JobTitle>> "
    // },
    // {
    //     name:"JobLocation",
    //     value: "<<JobLocation>> "
    // },
    // {
    //     name:"JobDuration",
    //     value: "<<JobDuration>> "
    // },
    // {
    //     name:"JobPay",
    //     value: "<<JobPay>> "
    // }
]
const mergeContents = [{
    name: 'content 1',
    value: '[content1]'
}, {
    name: 'content 2',
    value: '[content1]'
}];
const ModuleDescriptorOrderNames = {
    DIVIDER: 'Divider',
    TEXT: 'Text',
    IMAGE: 'Image',
    BUTTON: 'Button',
    HTML: 'Html',
    SOCIAL: 'Social',
    VIDEO: 'Video',
    FORM: 'Form',
    MERGE_CONTENT: 'MergeContent',
    CAROUSEL: 'Carousel',
    MENU: 'Menu',
    ICONS: 'Icons',
    HEADING: 'Heading',
    SPACER: 'Spacer',
    PARAGRAPH: 'Paragraph',
    LIST: 'List'
} as const

export { specialLinks, mergeTags, mergeContents, ModuleDescriptorOrderNames };