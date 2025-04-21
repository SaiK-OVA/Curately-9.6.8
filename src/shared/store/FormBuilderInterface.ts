export interface FormBuilderInterface {
    inputType: string;
    fieldType: string;
    placeholderName: string;
    displayName: string;
    iconPath: IconPath;
    bgcolor: string;
    datakey: string;
    readonly?: boolean;
    isMask?: boolean;
    placeholder?: string;
    isShow: boolean;
    helptext: string;
    isActive: boolean;
    id: string;
    labelName: string;
    description: string;
    allowedInputs: any[];
    isValidate?: boolean;
    isPhoneVerified?: boolean;
    choices?: Choice[];
    checkboxOption?: Choice;
    dateConditions?: any;
}

interface Choice {
    id: number | string;
    character?: string;
    value: string;
}

interface IconPath {
    type: string;
    key: null;
    ref: null;
    props: Props;
    _owner: null;
    _store: Store;
}

interface Store {
}

interface Props {
    src: string;
    alt: string;
    style: Style;
}

interface Style {
    height: string;
    width: string;
}