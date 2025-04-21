import { React, useState } from "../../../../../../shared/modules/React";
// import { Quill } from "react-quill";
import { Quill } from 'react-quill-new';
import SearchIcon from '@mui/icons-material/Search';
// import { IconButton, Popover, Typography, TextField, Button } from "@mui/material";
import { IconButton, InputAdornment, TextField } from "../../../../../../shared/modules/commonImports";
import { Popover } from "../../../../../../shared/modules/MaterialImports/Popover";
import DataObjectIcon from '@mui/icons-material/DataObject';

import "./QuilToolbar.scss"
import { Box } from "../../../../../../shared/modules/MaterialImports/Box";
import { Tab, Tabs } from "../../../../../../shared/modules/MaterialImports/Tabs";
// Custom Undo button icon component for Quill editor. You can import it directly
// from 'quill/assets/icons/undo.svg' but I found that a number of loaders do not
// handle them correctly
const CustomUndo = () => (
    <svg viewBox="0 0 18 18">
        <polygon className="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10" />
        <path
            className="ql-stroke"
            d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"
        />
    </svg>
);

// Redo button icon component for Quill editor
const CustomRedo = () => (
    <svg viewBox="0 0 18 18">
        <polygon className="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10" />
        <path
            className="ql-stroke"
            d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"
        />
    </svg>
);

function mergeField(val) {

    // console.log(val);
    const cursorPosition = this?.quill?.getSelection().index;
    this?.quill?.insertText(cursorPosition, ' <<'
        + val + '>> ');
    // this?.quill?.setSelection(cursorPosition + 1);
}

// Add sizes to whitelist and register them
const Size = Quill.import("formats/size");
Size.whitelist = ["extra-small", "small", "24px", "large"];
Quill.register(Size, true);

// Add fonts to whitelist and register them
const Font = Quill.import("formats/font");
Font.whitelist = [
    "arial",
    "comic-sans",
    "courier-new",
    "georgia",
    "helvetica",
    "lucida"
];
Quill.register(Font, true);

// Modules object for setting up the Quill editor
export const modules = {
    toolbar: {
        container: "#toolbar",
        handlers: {
            mergeField: mergeField
        }
    },
    history: {
        delay: 500,
        maxStack: 100,
        userOnly: true
    }
};

// Formats objects for setting up the Quill editor
export const formats = [
    "size",
    "bold",
    "italic",
    "underline",
    // "align",
    "strike",
    "list",
    "bullet",
    "link",
    "image",
    "color",

];


// Quill Toolbar component
export const QuillToolbar = ({ handlePopoverOpen, handlePopoverClose, open, anchorEl, placeholders, editorHtml }) => {

    const insertField = (field) => {
        const editor = editorHtml.current.getEditor();
        let selection = editor.getSelection();
        if (!selection) {
            editor.focus();
            selection = editor.getSelection();
        }

        if (selection) {
            const cursorPosition = selection.index;
            editor.insertText(cursorPosition, ` {{${field}}} `);
            editor.setSelection(cursorPosition + field.length + 6);
            handlePopoverClose();
        }
    };
    return (
        <div id="toolbar">
            <span className="ql-formats">
                <button className="ql-bold" />
                <button className="ql-italic" />
                <button className="ql-underline" />
                <button className="ql-strike" />
            </span>

            <span className="ql-formats">

                <select className="ql-header" defaultValue="3">
                    <option value="1">Heading</option>
                    <option value="2">Subheading</option>
                    <option value="3">Normal</option>
                </select>
            </span>

            <span className="ql-formats">
                <select className="ql-align" />
                <select className="ql-color" />
                <select className="ql-background" />
            </span>

            <span className="ql-formats">
                <button className="ql-list" value="ordered" />
                <button className="ql-list" value="bullet" />
                <button className="ql-indent" value="-1" />
                <button className="ql-indent" value="+1" />
            </span>

            <span className="ql-formats">
                <button className="ql-clean" />
            </span>

            <span className="ql-formats">


                <IconButton onClick={handlePopoverOpen} title="HTML Mode">
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
                    <CustomFields placeholder={placeholders} onInsertField={insertField} />

                </Popover>
            </span>

            {/* <span className="ql-formats">
            <button className="ql-blockquote" />
            <button className="ql-direction" />
        </span> */}

            {/* <span className="ql-formats">
                <button className="ql-link" />
                <button className="ql-image" />
            </span> */}


            {/* <select defaultValue={"0"} className="ql-mergeField">
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
        </select> */}


            {/* <span className="ql-formats">
            <button className="ql-undo">
                <CustomUndo />
            </button>
            <button className="ql-redo">
                <CustomRedo />
            </button>
        </span> */}
        </div>
    )
};




function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box style={{ width: '360px' }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const a11yProps = (index) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
};

export const CustomFields = ({ onInsertField, placeholder }) => {
    const [tabValue, setTabValue] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };
    console.log('aaaaaa', placeholder)

    const filteredPlaceholders = placeholder?.PlaceHolders
        ? Object.keys(placeholder.PlaceHolders).reduce((acc, category) => {
            const filteredItems = placeholder.PlaceHolders[category].filter((item) =>
                item.viewfieldname.toLowerCase().includes(searchTerm.toLowerCase())
            );
            if (filteredItems.length > 0) {
                acc[category] = filteredItems;
            }
            return acc;
        }, {})
        : {};

    return (
        <div>
            <Box>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs example">
                        <Tab style={{ textTransform: 'capitalize', fontSize: '12px', fontFamily: 'Segoe UI' }} label="Basics" disableRipple {...a11yProps(0)} />
                        <Tab style={{ textTransform: 'capitalize', fontSize: '12px', fontFamily: 'Segoe UI' }} label="Custom" disableRipple {...a11yProps(1)} />
                        {/* <Tab style={{ textTransform: 'capitalize' }} label="Advanced" {...a11yProps(2)} /> */}
                    </Tabs>
                </Box>
                <CustomTabPanel value={tabValue} index={0}>
                    <div>
                        <div style={{ padding: '0px 0.75rem ' }}>
                            <TextField
                                placeholder="Search dynamic variables..."
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    )
                                }}
                                variant="outlined"
                                size="small"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                sx={{ marginTop: '12px' }}
                                fullWidth
                            />
                        </div>
                        <div className="dynamicVariables" style={{ padding: '0.75rem' }}>
                            {Object.keys(filteredPlaceholders).map((category, index) => (
                                <div key={index}>
                                    <div className=" categoryName" style={{ margin: '4px 0px' }}>{category}</div>
                                    {filteredPlaceholders[category]?.map((item, idx) => (
                                        <div className="fieldName" key={idx}>
                                            <div className="viewFieldName" onClick={() => onInsertField(item.viewfieldname)}>{`{{${item.viewfieldname}}}`}</div>
                                            <div className="columnValue">{item.columnvalue}</div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </CustomTabPanel>
                <CustomTabPanel value={tabValue} index={1}></CustomTabPanel>
                <CustomTabPanel value={tabValue} index={2}></CustomTabPanel>
            </Box>
        </div>
    );
}

export default QuillToolbar;