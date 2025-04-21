export interface ShortlistDataType {
    id: string;
    type: string;
    position: Position;
    data: Stage;
    dragHandle: string;
    width: number;
    height: number;
    autoId: number;
    selected?: boolean;
    positionAbsolute?: Position;
    dragging?: boolean;
}

export interface Stage {
    stageCompleted: boolean;
    stageOrder: number;
    stageId: string;
    id: string;
    stageName: string;
    stageLabel: string;
    isFormEnabled: boolean;
    formJsonData: (FormJsonDatum | FormJsonData2 | FormJsonData3)[];
    nextStagesList: string[];
    type: string;
    recruiterName?: string;
    statusDate?: string;
}

interface FormJsonData3 {
    inputType: string;
    fieldType: string;
    placeholderName: string;
    displayName: string;
    iconPath: IconPath2;
    bgcolor: string;
    datakey: string;
    readonly?: boolean;
    isMask?: boolean;
    isShow: boolean;
    helptext: string;
    placeholder?: string;
    allowedInputs: any[];
    isActive: boolean;
    id: string;
    labelName: string;
    description: string;
    isValidate?: boolean;
    isPhoneVerified?: boolean;
}

interface FormJsonData2 {
    inputType: string;
    fieldType: string;
    placeholderName: string;
    displayName: string;
    iconPath: IconPath2;
    bgcolor: string;
    datakey: string;
    readonly: boolean;
    isMask: boolean;
    isShow: boolean;
    helptext: string;
    placeholder: string;
    allowedInputs: any[];
    isActive: boolean;
    id: string;
    labelName: string;
    description: string;
}

interface IconPath2 {
    type: string;
    key: null;
    ref: null;
    props: Props2;
    _owner: null;
    _store: Type;
}

interface Props2 {
    src: string;
    alt: string;
    style: Style;
}

interface FormJsonDatum {
    inputType: string;
    fieldType: string;
    placeholderName: string;
    displayName: string;
    iconPath: IconPath;
    bgcolor: string;
    datakey?: string;
    readonly?: boolean;
    isMask?: boolean;
    isShow: boolean;
    helptext: string;
    placeholder?: string;
    allowedInputs: any[];
    isActive: boolean;
    id: string;
    labelName: string;
    description: string;
    options?: string[];
}

interface IconPath {
    type: Type2 | string;
    key: null;
    ref: null;
    props: Props;
    _owner: null;
    _store: Type;
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

interface Position {
    x: number;
    y: number;
}