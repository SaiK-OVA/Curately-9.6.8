export interface InvitationInterface {
    jobid: string;
    jobtitle: string;
    openid: string;
    invite_statusname: string;
    invitetype: string;
    invitedate: string;
    Screening: Screening;
};

interface Screening {
    formid: string;
    openid: string;
    savedate: string;
    answers: Answer[];
    questions: Questions;
    QAs: QA[]
}

interface QA {
    question: string;
    answer: string;
    quesId: string;
}

interface Questions {
    components: Component[];
    curately: boolean;
}

interface Component {
    inputType: string;
    fieldType: string;
    placeholderName: string;
    displayName: string;
    iconPath: IconPath;
    bgcolor: string;
    datakey?: string;
    readonly?: boolean;
    isMask?: boolean;
    placeholder?: string;
    isShow: boolean;
    helptext?: string;
    isActive: boolean;
    id: number | string;
    labelName: string;
    description: string;
    allowedInputs: any[];
    isRequired?: boolean;
    value?: string;
    choices?: Choice[];
    options?: string[];
    isValidate?: boolean;
    isPhoneVerified?: boolean;
    file?: null;
    isResume?: boolean;
}

interface Choice {
    id: number | string | string;
    character?: string;
    value: string;
}

interface IconPath {
    type: Type2 | string;
    key: null;
    ref: null;
    props: Props;
    _owner: null;
}

interface Props {
    src?: string;
    alt?: string;
    style?: Style;
    sx?: Sx;
}

interface Sx {
    color: string;
    fontSize: string;
}

interface Style {
    height: string;
    width: string;
}

interface Type2 {
    type: Type;
    compare: null;
}

interface Type {
}

interface Answer {
    quesId: string;
    answer?: string;
    quesType: string;
}