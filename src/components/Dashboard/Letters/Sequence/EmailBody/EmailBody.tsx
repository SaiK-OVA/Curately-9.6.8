import {React} from "../../../../../shared/modules/React";
// { useRef }
// import ReactDOM from "react-dom";

// import ReactQuill from 'react-quill';
import ReactQuill from 'react-quill-new';

import PropTypes from 'prop-types';

// import 'quill-mention';

import './EmailBody.scss'
import SaveIcon from '@mui/icons-material/Save';
import { IconButton, TextField, Button } from "../../../../../shared/modules/commonImports";
import { Typography } from "../../../../../shared/modules/MaterialImports/Typography";
import {  Popover } from "../../../../../shared/modules/MaterialImports/Popover";

/*
 * Custom "star" icon for the toolbar using an Octicon
 * https://octicons.github.io
 */
// const CustomButton = () => <span className="octicon octicon-star">oct icon</span>;


/*
 * Event handler to be attached using Quill toolbar module (see line 73)
 * https://quilljs.com/docs/modules/toolbar/
 */
function insertStar(
    this: {
        quill: any;
        insertStar: () => void;
    }
) {
    const cursorPosition = this.quill.getSelection().index;
    this.quill.insertText(cursorPosition, "★");
    this.quill.setSelection(cursorPosition + 1);
}

function mergeField(this: {
    quill: any;
    insertStar: (this: {
        quill // import ReactDOM from "react-dom";
        : any; insertStar: () => void;
    }) => void; mergeField: (val: string) => void;
},
    val: string
) {

    // console.log(val);
    const cursorPosition = this?.quill?.getSelection().index;
    this?.quill?.insertText(cursorPosition, ' <<'
        + val + '>> ');
    // this?.quill?.setSelection(cursorPosition + 1);
}

/*
 * Custom toolbar component including insertStar button and dropdowns
 */
const CustomToolbar = ({ toolbarId, mentions, saveTemplate, open, anchorEl, handlePopoverOpen, handlePopoverClose, handleTemplateName, onSaveTemplate, templateName, enableSave }: any) => (
    <div id={toolbarId}>
        {/* <button className="ql-insertStar">
            <CustomButton />
        </button> */}
        {/* <select className="ql-font" defaultValue={""}>
            <option value=""></option>
            <option value="serif"></option>
            <option value="monospace"></option>
        </select> */}
        <button type="button" className="ql-bold" />
        <button type="button" className="ql-italic" />
        <button type="button" className="ql-underline"></button>
        <button type="button" className="ql-strike"></button>
        <select className="ql-header" defaultValue={""} onChange={e => e.persist()}>
            <option value="1" />
            <option value="2" />
            <option value="3" />
            <option value="4" />
            <option value="5" />
            <option value="6" />
            <option value="" />
        </select>
        <select className="ql-align" defaultValue={""}>
            <option value=""></option>
            <option value="center"></option>
            <option value="right"></option>
            <option value="justify"></option>
        </select>
        <select className="ql-color" defaultValue={""}>
            <option value="#e60000"></option><option value="#ff9900"></option><option value="#ffff00"></option><option value="#008a00"></option><option value="#0066cc"></option><option value="#9933ff"></option><option value="#ffffff"></option><option value="#facccc"></option><option value="#ffebcc"></option><option value="#ffffcc"></option><option value="#cce8cc"></option><option value="#cce0f5"></option><option value="#ebd6ff"></option><option value="#bbbbbb"></option><option value="#f06666"></option><option value="#ffc266"></option><option value="#ffff66"></option><option value="#66b966"></option><option value="#66a3e0"></option><option value="#c285ff"></option><option value="#888888"></option><option value="#a10000"></option><option value="#b26b00"></option><option value="#b2b200"></option><option value="#006100"></option><option value="#0047b2"></option><option value="#6b24b2"></option><option value="#444444"></option><option value="#5c0000"></option><option value="#663d00"></option><option value="#666600"></option><option value="#003700"></option><option value="#002966"></option><option value="#3d1466"></option>
            <option value="" />
        </select>
        <select className="ql-background" defaultValue={""}>
            <option value="#e60000"></option><option value="#ff9900"></option><option value="#ffff00"></option><option value="#008a00"></option><option value="#0066cc"></option><option value="#9933ff"></option><option value="#ffffff"></option><option value="#facccc"></option><option value="#ffebcc"></option><option value="#ffffcc"></option><option value="#cce8cc"></option><option value="#cce0f5"></option><option value="#ebd6ff"></option><option value="#bbbbbb"></option><option value="#f06666"></option><option value="#ffc266"></option><option value="#ffff66"></option><option value="#66b966"></option><option value="#66a3e0"></option><option value="#c285ff"></option><option value="#888888"></option><option value="#a10000"></option><option value="#b26b00"></option><option value="#b2b200"></option><option value="#006100"></option><option value="#0047b2"></option><option value="#6b24b2"></option><option value="#444444"></option><option value="#5c0000"></option><option value="#663d00"></option><option value="#666600"></option><option value="#003700"></option><option value="#002966"></option><option value="#3d1466"></option>
            <option value="" />
        </select>
        {/* <button type="button" className="ql-script" value="super"></button>
        <button type="button" className="ql-script" value="sub"></button> */}
        {/* <button type="button" className="ql-blockquote"></button>
        <button type="button" className="ql-code-block"></button> */}

        <button type="button" className="ql-list" value="ordered"></button>
        <button type="button" className="ql-list" value="bullet"></button>
        <button type="button" className="ql-indent" value="-1"></button>
        <button type="button" className="ql-indent" value="+1"></button>

        {/* <button type="button" className="ql-link"></button>
        <button type="button" className="ql-image"></button>
        <button type="button" className="ql-video"></button> */}
        <button type="button" className="ql-clean"></button>
        {
            (mentions) ?
                <select defaultValue={"0"} className="ql-mergeField">
                    <option value="0" >&lt;&lt; &gt;&gt;</option>
                    <option value="First name">First name</option>
                    <option value="Last name">Last name</option>
                    <option value="First name and Last name">First name and Last name</option>
                    <option value="Email">Email</option>
                    <option value="Signature">Signature</option>
                    <option value="Candid">Candid</option>
                    <option value="CandidateLink">CandidateLink</option>
                    <option value="Recruiter Name">Recruiter Name</option>
                    <option value="JobTitle">JobTitle</option>
                    <option value="JobLocation">JobLocation</option>
                    <option value="JobDuration">JobDuration</option>
                    <option value="JobPay">JobPay</option>
                </select>
                :
                null
        }
        {
            saveTemplate ?
                <div>
                    <IconButton onClick={handlePopoverOpen} disabled={!enableSave} title="Save as Template">
                        <SaveIcon sx={{ color: '#444' }} />
                    </IconButton>
                    <Popover
                        id="save-popover"
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handlePopoverClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        <Typography sx={{ m: 2 }}>Template name:</Typography>
                        <TextField
                            id="template-name"
                            size='small'
                            name='template-name'
                            sx={{ width: 'calc(100% - 32px)', margin: '0 1rem' }}
                            onChange={handleTemplateName}
                        />
                        <Button
                            color="primary"
                            disabled={(templateName !== "" && templateName.length > 3) ? false : true}
                            variant="contained"
                            type="submit"
                            className='mr-2'
                            size="small" sx={{ m: 2 }}
                            onClick={onSaveTemplate}>
                            Save
                        </Button>
                    </Popover>
                </div>
                : ""
        }

    </div>
);

// const mentionsToBeLoaded = [
//     { value: "First name" },
//     { value: "Last name" },
//     { value: "First name and Last name" },
//     { value: "Email" },
//     { value: "Signature" },
//     { value: "Candid" },
// ];

/* 
 * Editor component with custom toolbar and content containers
 */
interface MyState {
    toolbarId: string,
    id: string,
    editorHtml: string,
    handleChange: any,
    mentions?: boolean,
    saveTemplate?: boolean,
    anchorEl?: any,
    handleSaveTemplate?: any,
    enableSave?: boolean
    placeholder?: string
}

export default class Editor extends React.Component<MyState, { editorHtml: string, anchorEl: any, templateName: string }> {
    static modules: any;
    static formats: any;
    static propTypes: { placeholder: any; };
    // toolbarId: string;
    // mentions: boolean;
    editor: React.RefObject<any>;
    open: any;
    constructor(props: {
        toolbarId: string,
        id: string,
        editorHtml: string,
        handleChange: any,
        mentions: boolean,
        saveTemplate: boolean,
        openDialog: any,
        handleSaveTemplate: any,
        enableSave: boolean,
        placeholder: string
    }) {
        super(props);
        this.state = { editorHtml: "", anchorEl: null, templateName: "" };
        this.handleChange = this.handleChange.bind(this);
        this.editor = React.createRef<any>();
        this.handlePopoverClose = this.handlePopoverClose.bind(this);
        this.handlePopoverOpen = this.handlePopoverOpen.bind(this);
        this.handleTemplateName = this.handleTemplateName.bind(this);
        this.onSaveTemplate = this.onSaveTemplate.bind(this);

    }

    handleChange(html: any) {
        this.setState({ editorHtml: html });
    }

    handlePopoverOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handlePopoverClose = () => {
        this.setState({ anchorEl: null });
    };

    onSaveTemplate = () => {
        this.props.handleSaveTemplate(this.state.templateName);
        this.setState({ anchorEl: null });
    }

    handleTemplateName = (e: any) => {
        this.setState({ templateName: e.target.value })
    }

    // useEffect(() => {
    //     if (defaultValue) {
    //         const delta = editor.current.editor.clipboard.convert(defaultValue);
    //         editor.current.editor.setContents(delta, 'silent');
    //     }
    // }, [defaultValue]);

    render() {
        const open = Boolean(this.state.anchorEl);

        return (
            <div className="text-editor">
                <CustomToolbar className={`toolbar ${this.props.toolbarId}`} toolbarId={this.props.toolbarId} mentions={this.props.mentions} saveTemplate={this.props.saveTemplate} open={open} anchorEl={this.state.anchorEl} handlePopoverOpen={this.handlePopoverOpen} handlePopoverClose={this.handlePopoverClose} handleTemplateName={this.handleTemplateName} templateName={this.state.templateName} onSaveTemplate={this.onSaveTemplate} enableSave={this.props.enableSave} />
                <ReactQuill
                    ref={this.editor as unknown as any}
                    // onChange={this.handleChange}
                    value={this.props.editorHtml}
                    // onBlur={this.props.handleChange}
                    onChange={
                        (e) => {
                            this.props.handleChange(e)
                        }
                    }
                    placeholder={(this.props.placeholder !== undefined) ? this.props.placeholder : "Email Body"}
                    // placeholder={this.props.placeholder}
                    modules={{
                        toolbar: {
                            container: `#${this.props.toolbarId}`,
                            handlers: {
                                // insertStar: insertStar,
                                mergeField: mergeField
                            }
                        },
                        // mention: {
                        //     allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
                        //     mentionDenotationChars: ['<<'],
                        //     source: function (searchTerm: any, renderList: any, mentionChar: any) {
                        //         let values;

                        //         values = mentionsToBeLoaded;

                        //         if (searchTerm.length === 0) {
                        //             renderList(values, searchTerm);
                        //         } else {
                        //             const matches = [];
                        //             for (let i = 0; i < values.length; i++)
                        //                 if (
                        //                     ~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase())
                        //                 )
                        //                     matches.push(values[i]);
                        //             renderList(matches, searchTerm);
                        //         }
                        //     },
                        // },
                        // clipboard: {
                        //     matchVisual: false
                        // }
                    }}
                    onKeyUp={(e) => {
                        // console.log(e, this.editor);
                        if (this.editor.current.editor) {
                            // const delta = this.editor.current.editor.getContents();
                            // const html = this.editor.current.editor.root.innerHTML;
                            // // onChange({ delta, html });
                            // console.log({ delta, html });
                        }
                    }}
                    formats={Editor.formats}
                    theme="snow" // pass false to use minimal theme
                />
            </div>
        );
    }
}

/* 
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
// Editor.modules = {
//     toolbar: {
//         container: "#toolbar",
//         handlers: {
//             insertStar: insertStar
//         }
//     },
//     clipboard: {
//         matchVisual: false,
//     }
// };

/* 
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
Editor.formats = [
    "header",
    "font",
    "size",
    // "mention",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "align",
    "color",
    "background",
    "link",
    "image",
    "color"
];

/* 
 * PropType validation
 */
Editor.propTypes = {
    placeholder: PropTypes.string
};

/* 
 * Render component on page
 */
