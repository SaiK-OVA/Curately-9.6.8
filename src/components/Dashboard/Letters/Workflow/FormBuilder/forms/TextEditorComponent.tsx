import  { useContext } from 'react';
import {React,  useState, useEffect } from '../../../../../../shared/modules/React';
// import ReactQuill from 'react-quill';
import ReactQuill from 'react-quill-new';
import {Box} from '../../../../../../shared/modules/MaterialImports/Box';
import {Popover} from '../../../../../../shared/modules/MaterialImports/Popover';

// import 'react-quill/dist/quill.snow.css';
import 'react-quill-new/dist/quill.snow.css';

import "./form.scss"

import { FormStore } from "../../../../../../App";
import { shallow } from 'zustand/shallow';
// import useFormBuilderStore, { FORMBUILDER_STATE } from '../../../../../../shared/store/FormBuilderStore';


// const formBuilderSelector = (state: FORMBUILDER_STATE) => ({
//     formData: state.formData,
//     setFormData: state.setFormData
// });

interface TextProps {
    editorLabel: (text: string) => void,
    labelName: string;
    field: any
}

const TextEditorComponent: React.FC<TextProps> = ({ editorLabel, labelName, field }) => {
    // const [value, setValue] = useState(labelName);

    // const setEditValue = (event: any) => {
    //     setValue(event.target?.value);
    //     editorLabel(event.target?.value);
    // }
    // React.useEffect(() => {
    //     setValue(labelName);

    // }, [])
    const [formData, setFormData] = useContext(FormStore);
    // const { formData, setFormData } = useFormBuilderStore(formBuilderSelector, shallow);

    const [editorContent, setEditorContent] = useState('')
    const handleEditorChange = (content: any) => {
        setEditorContent(content)
    }


    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        if (field.htmlContent) {
            setEditorContent(field.htmlContent)
        }
    }, [anchorEl])

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    // console.log('value', value)

    // const removerHtmlTags = (inputText: any) => {
    //     return inputText.replace(/(<([^>]+)>)/ig, '');
    // }

    const handleSave = () => {
        const newState = formData.map((obj: any) => {
            if (obj.id === field.id) {
                return { ...obj, htmlContent: editorContent };
            }
            return obj;
        });
        setFormData(newState);
    }

    return (
        <Box >

            <Box onClick={handleClick} sx={{
                maxWidth: "750px",
                border: '1px solid ', borderRadius: '4px',
                width: 'auto', minHeight: '100px', overflowWrap: 'break-word',
                cursor: 'pointer', p: 1, margin: 0,
                color: '#1A1A1A',
                fontSize: '14px',
                fontWeight: 600,
                fontFamily: 'Segoe UI',
                "&:hover": {
                    borderColor: 'var(--c-primary-color)'
                },
                borderColor: open ? '#1565c0' : '#ccc',
                borderWidth: open ? '2px' : '1px',
                '& p': {
                    margin: 0
                },
                '& h1': {
                    margin: 0
                },
                '& h2': {
                    margin: 0
                },
                '& h3': {
                    margin: 0
                },

            }}
                dangerouslySetInnerHTML={{ __html: editorContent }}
            />
            {/* <TextField
                multiline
                rows={editorContent.split('\n').length + 1}
                onClick={handleClick}
                fullWidth
                spellCheck='false'
                InputProps={{
                    style: {
                        whiteSpace: 'pre-wrap'
                    },
                    readOnly: true
                }}
                value={removerHtmlTags(editorContent)}
            /> */}

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                sx={{ ml: 1 }}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'left',
                }}
            >
                <>
                    <ReactQuill theme="snow" value={editorContent} onChange={handleEditorChange} style={{ height: '180px', width: '350px', overflow: 'hidden' }} onBlur={handleSave} />
                </>
            </Popover>

        </Box>
    );
}

export default TextEditorComponent