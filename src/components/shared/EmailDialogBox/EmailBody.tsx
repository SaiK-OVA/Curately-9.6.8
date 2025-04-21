import { React } from "../../../shared/modules/React"; //
// { useRef }
// import ReactDOM from "react-dom";

import ReactQuill from 'react-quill-new';

import PropTypes from 'prop-types';

// import 'quill-mention';

import './EmailBody.scss'
import SaveIcon from '@mui/icons-material/Save';
import { TextField } from "../../../shared/modules/MaterialImports/FormInputs";
import { IconButton, Button } from '../../../shared/modules/MaterialImports/Button';
import { Typography } from '../../../shared/modules/MaterialImports/Typography';
import { Popover } from '../../../shared/modules/MaterialImports/Popover';

// import {Box} from '../../../shared/modules/MaterialImports/Box';
import ApiService from '../../../shared/api/api'
import { trackPromise } from '../../../shared/modules/PromiseTrackter';
import { userLocalData } from "../../../shared/services/userData";

import { showToaster } from "../SnackBar/SnackBar";

import PlaceHolders from "../../Dashboard/Letters/Workflow/PopUps/PlaceHolders/PlaceHolders";
import PolicyPlaceholders from "../../Dashboard/Settings/Policies/PolicyPlaceholder";


// interface TabPanelProps {
//     children?: React.ReactNode;
//     index: number;
//     value: number;
// }

// function CustomTabPanel(props: TabPanelProps) {
//     const { children, value, index, ...other } = props;

//     return (
//         <div
//             role="tabpanel"
//             hidden={value !== index}
//             id={`simple-tabpanel-${index}`}
//             aria-labelledby={`simple-tab-${index}`}
//             {...other}
//         >
//             {value === index && (
//                 <Box style={{ width: '360px' }}>
//                     {children}
//                 </Box>
//             )}
//         </div>
//     );
// }

// function a11yProps(index: number) {
//     return {
//         id: `simple-tab-${index}`,
//         'aria-controls': `simple-tabpanel-${index}`,
//     };
// }




/*
 * Custom "star" icon for the toolbar using an Octicon
 * https://octicons.github.io
 */
// const CustomButton = () => <span className="octicon octicon-star">oct icon</span>;


/*
 * Event handler to be attached using Quill toolbar module (see line 73)
 * https://quilljs.com/docs/modules/toolbar/
 */
// function insertStar(
//     this: {
//         quill: any;
//         insertStar: () => void;
//     }
// ) {
//     const cursorPosition = this.quill.getSelection().index;
//     this.quill.insertText(cursorPosition, "★");
//     this.quill.setSelection(cursorPosition + 1);
// }

const Quill = ReactQuill.Quill 
let Block: any = Quill.import('blots/block');
Block.tagName = 'div';
Quill.register(Block);

function mergeField(this: {
    quill: any;
    insertStar: (this: {
        quill // import ReactDOM from "react-dom";
        : any; insertStar: () => void;
    }) => void; mergeField: (val: string) => void;
},
    val: string
) {

    const cursorPosition = this?.quill?.getSelection().index;
    this?.quill?.insertText(cursorPosition, ' <<' + val + '>> ');
    // this?.quill?.setSelection(cursorPosition + 1);
}
// const CustomFields = ({ onInsertField, placeholder }: { onInsertField: (value: string) => void, placeholder: any }) => {
//     const [tabValue, setTabValue] = useState(0);
//     const [searchTerm, setSearchTerm] = useState('');
//     const handleTabChange = (event: SyntheticEvent, newValue: number) => {
//         setTabValue(newValue);
//         setSearchTerm("")
//     };

//     const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
//         setSearchTerm(event.target.value);
//     };

//     const filteredPlaceholders = placeholder?.PlaceHolders
//         ? Object.keys(placeholder.PlaceHolders).reduce((acc, category) => {
//             const filteredItems = placeholder.PlaceHolders[category].filter((item: { viewfieldname: string }) =>
//                 item.viewfieldname.toLowerCase().includes(searchTerm.toLowerCase())
//             );
//             if (filteredItems.length > 0) {
//                 // @ts-ignore
//                 acc[category] = filteredItems;
//             }
//             return acc;
//         }, {})
//         : {};
//     return (
//         <div>
//             <Box>
//                 <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//                     <Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs example">
//                         <Tab style={{ textTransform: 'capitalize' }} label="Basics" {...a11yProps(0)} />
//                         <Tab style={{ textTransform: 'capitalize' }} label="Custom" {...a11yProps(1)} />
//                         {/* <Tab style={{ textTransform: 'capitalize' }} label="Advanced" {...a11yProps(2)} /> */}
//                     </Tabs>
//                 </Box>
//                 <CustomTabPanel value={tabValue} index={0}>
//                     <div>
//                         <div className="px-3">
//                             <TextField
//                                 placeholder="Search dynamic variables..."
//                                 InputProps={{
//                                     startAdornment: (
//                                         <InputAdornment position="start">
//                                             <SearchIcon />
//                                         </InputAdornment>
//                                     )
//                                 }}
//                                 variant="outlined"
//                                 size="small"
//                                 value={searchTerm}
//                                 onChange={handleSearchChange}
//                                 className="mt-3"
//                                 fullWidth
//                             />
//                         </div>
//                         <div className="dynamicVariables p-3">
//                             {Object.keys(filteredPlaceholders).map((category, index) => (
//                                 category !== "Custom Details" ? <div key={index}>
//                                     <div className="mt-1 mb-1 categoryName">{category}</div>

//                                     {
//                                         // @ts-ignore
//                                         filteredPlaceholders[category]?.map((item: { viewfieldname: string, columnvalue: string }, idx: number) => (
//                                             <div className="fieldName" key={idx}>
//                                                 <div className="viewFieldName" onClick={() => onInsertField(item.viewfieldname)}>{`{{${item.viewfieldname}}}`}</div>
//                                                 {item?.columnvalue?.length > 25 ?
//                                                     <Tooltip placement="right" title={item?.columnvalue ? <div dangerouslySetInnerHTML={{ __html: item.columnvalue }} /> : ""} >
//                                                         <div className="columnValue">{item.columnvalue}</div>
//                                                     </Tooltip> :
//                                                     <div className="columnValue">{item.columnvalue}</div>}
//                                             </div>
//                                         ))
//                                     }
//                                 </div> : null
//                             ))}
//                         </div>
//                     </div>
//                 </CustomTabPanel>
//                 <CustomTabPanel value={tabValue} index={1}>
//                     <div>
//                         <div className="px-3">
//                             <TextField
//                                 placeholder="Search dynamic variables..."
//                                 InputProps={{
//                                     startAdornment: (
//                                         <InputAdornment position="start">
//                                             <SearchIcon />
//                                         </InputAdornment>
//                                     )
//                                 }}
//                                 variant="outlined"
//                                 size="small"
//                                 value={searchTerm}
//                                 onChange={handleSearchChange}
//                                 className="mt-3"
//                                 fullWidth
//                             />
//                         </div>
//                         <div className="dynamicVariables p-3">
//                             {Object.keys(filteredPlaceholders).map((category, index) => (
//                                 category === "Custom Details" ? <div key={index}>
//                                     <div className="mt-1 mb-1 categoryName">{category}</div>

//                                     {
//                                         // @ts-ignore
//                                         filteredPlaceholders[category]?.map((item: { viewfieldname: string, columnvalue: string }, idx: number) => (
//                                             <div className="fieldName" key={idx}>
//                                                 <div className="viewFieldName" onClick={() => onInsertField(item.viewfieldname)}>{`{{${item.viewfieldname}}}`}</div>
//                                                 {item?.columnvalue?.length > 25 ?
//                                                     <Tooltip placement="right" title={item?.columnvalue ? <div dangerouslySetInnerHTML={{ __html: item.columnvalue }} /> : ""} >
//                                                         <div className="columnValue">{item.columnvalue}</div>
//                                                     </Tooltip> :
//                                                     <div className="columnValue">{item.columnvalue}</div>}
//                                             </div>
//                                         ))
//                                     }
//                                 </div> : null
//                             ))}
//                         </div>
//                     </div>
//                 </CustomTabPanel>

//             </Box>
//         </div >
//     )
// }



/*
 * Custom toolbar component including insertStar button and dropdowns
 */
const CustomToolbar = ({ toolbarId, mentions, saveTemplate, open, anchorEl, handlePopoverOpen, tempOpen, tempAnchorEl, handlePopoverTempOpen, handlePopoverClose, handleTemplateName, templateName, subject, editorHtml, value, closePopOver, policyPlaceholder }: any) => {
    //  value, handleChange, placeholder, mergeField,
    // const [placeHolder, setPlaceholder] = useState(null);

    // const { candidateId, jobId } = useParams();

    // useEffect(() => {
    //     trackPromise(
    //         ApiService.postWithData('admin', 'placeHolders', {
    //             clientId: "" + userLocalData.getvalue('clientId'),
    //             userIds: candidateId ? candidateId : "",
    //             jobId: jobId ? jobId : "",
    //             recrId: userLocalData.getvalue('recrId')
    //         }).then(
    //             (result: any) => {
    //                 setPlaceholder(result.data);
    //             }
    //         )
    //     )

    // }, [])
    const insertField = (field: string) => {
        const editor = editorHtml.current.getEditor();
        let selection = editor.getSelection();
        if (!selection) {
            editor.focus();
            selection = editor.getSelection();
        }

        if (selection) {
            const cursorPosition = selection.index;
            editor.insertText(cursorPosition, ` {{${field}}} `);
            setTimeout(() => {
                editor.setSelection(cursorPosition + field.length + 6);
                closePopOver();
            }, 100);
        }
    };

    const handleSaveEmailTemplate = () => {
        if (templateName.trim() === "") {
            showToaster("Please Enter Email Template Name", "warning");
            return false;
        } else if (subject.trim() === "") {
            showToaster("Please enter Email Template Subject", "warning");
            return false;
        } else if ((value.trim() === "") || (value.trim() === "<p></p>") || (value.trim() === "<p><br></p>")) {
            showToaster("Please enter Email Template Description", "warning");
            return false;
        }
        const data = {
            "templateId": 0,
            "templateName": templateName,
            "templatedesc": value,
            "subject": subject,
            // "body": messageFormik.values.emailBody,
            "jsonFile": "",
            "htmlFile": "",
            "type": 2,
            "isActive": false,
            "createdby": userLocalData.getvalue('recrId'),
            "clientId": userLocalData.getvalue('clientId'),
        }
        trackPromise(
            ApiService.postWithData('admin', 'saveEmailTemplate', data).then((response: any) => {
                // console.log(response);
                if (response.data.Success === true) {
                    showToaster("Email Template saved Successfully", "success");
                    handlePopoverClose();
                } else {
                    showToaster(response.data.Message, "error");
                }
            })
        )
    }

    return (
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
            {/* {
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
            } */}
            {
                (mentions) ?
                    <div>
                        <PlaceHolders onInsertField={insertField} />
                        {/* <IconButton onClick={handlePopoverOpen} title="HTML Mode">
                            <DataObjectIcon sx={{ color: '#444' }} />
                        </IconButton>
                        <Popover
                            id="save-popover"
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handlePopoverClose}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                        >
                           

                        </Popover> */}
                    </div>
                    :
                    null

            }
            {
                (policyPlaceholder) ?
                    <div>
                        <PolicyPlaceholders onInsertField={insertField} />
                    </div>
                    : null
            }
            {
                saveTemplate ?
                    <div>
                        <IconButton onClick={handlePopoverTempOpen} disabled={!subject || !editorHtml} title="Save as Template">
                            <SaveIcon sx={{ color: 'var(--c-neutral-70)' }} />
                        </IconButton>
                        <Popover
                            id="save-popover"
                            open={tempOpen}
                            anchorEl={tempAnchorEl}
                            onClose={handlePopoverClose}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                        >
                            <Typography sx={{ m: 1 }}>Template Name:</Typography>
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
                                onClick={handleSaveEmailTemplate}>
                                Save
                            </Button>
                        </Popover>
                    </div>
                    : ""
            }

        </div>
    )
}

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
    toolbarId: string;
    id: string;
    editorHtml: string;
    handleChange: any;
    mentions?: boolean;
    saveTemplate?: boolean;
    anchorEl?: any;
    tempAnchorEl?: any;
    placeholder?: string;
    subject?: string;
    policyPlaceholder?: boolean;
}

export default class Editor extends React.Component<MyState, { editorHtml: string, anchorEl: any, tempAnchorEl: any, templateName: string }> {
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
        enableSave: boolean,
        placeholder: string,
        subject: string,
        policyPlaceholder?: boolean
    }) {
        super(props);
        this.state = { editorHtml: "", anchorEl: null, tempAnchorEl: null, templateName: "" };
        this.handleChange = this.handleChange.bind(this);
        this.editor = React.createRef<any>();
        this.handlePopoverClose = this.handlePopoverClose.bind(this);
        this.handlePopoverOpen = this.handlePopoverOpen.bind(this);
        this.handleTemplateName = this.handleTemplateName.bind(this);

    }

    handleChange(html: any) {
        this.setState({ editorHtml: html });
    }

    handlePopoverOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.setState({ anchorEl: event.currentTarget });
    };
    handlePopoverTempOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.setState({ templateName: "" });
        this.setState({ tempAnchorEl: event.currentTarget });
    };

    handlePopoverClose = () => {
        this.setState({ anchorEl: null });
        this.setState({ tempAnchorEl: null });
        this.setState({ templateName: "" });
    };


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
        const tempOpen = Boolean(this.state.tempAnchorEl);
        return (
            <div className="text-editor">

                <CustomToolbar className={`toolbar ${this.props.toolbarId}`} toolbarId={this.props.toolbarId} mentions={this.props.mentions} saveTemplate={this.props.saveTemplate} open={open} anchorEl={this.state.anchorEl} handlePopoverOpen={this.handlePopoverOpen} tempOpen={tempOpen} tempAnchorEl={this.state.tempAnchorEl} handlePopoverTempOpen={this.handlePopoverTempOpen} handlePopoverClose={this.handlePopoverClose} handleTemplateName={this.handleTemplateName} templateName={this.state.templateName} editorHtml={this.editor as unknown as any} value={this.props.editorHtml} handleChange={this.props.handleChange} placeholder={(this.props.placeholder !== undefined) ? this.props.placeholder : "Email Body"} mergeField={mergeField} closePopOver={this.handlePopoverClose} subject={this.props.subject} policyPlaceholder={this.props.policyPlaceholder} />
                <ReactQuill
                    id={this.props.id}
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
                    onKeyUp={() => {
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
    // "bullet",
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
