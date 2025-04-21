import { useContext } from 'react';
import { React, useRef, useEffect } from '../../../../../../shared/modules/React';
import {Box} from '../../../../../../shared/modules/MaterialImports/Box';
import {Checkbox} from '../../../../../../shared/modules/MaterialImports/FormElements';
import { FormStore } from "../../../../../../App";
import ContentEditable from 'react-contenteditable';
import './form.scss';

interface CheckboxProps {
    isFromPreview: boolean;
    field: any;
}

const CheckboxComponent: React.FC<CheckboxProps> = ({ isFromPreview, field }) => {
    const [formData, setFormData] = useContext(FormStore);
    const contentEditableRef = useRef<HTMLDivElement>(null);


    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedFormData = formData.map((obj: any) =>
            obj.id === field.id
                ? { ...obj, checkboxOption: { ...obj.checkboxOption, checked: event.target.checked } }
                : obj
        );
        setFormData(updatedFormData);
    };

    const handleChoiceValueChange = (event: any) => {
        const newValue = event.target.value || event.target.innerHTML.replace(/<[^>]+>/g, '');
        const updatedFormData = formData.map((obj: any) =>
            obj.id === field.id
                ? { ...obj, checkboxOption: { ...obj.checkboxOption, value: newValue } }
                : obj
        );
        setFormData(updatedFormData);
    };
    const handleFocus = () => {
        if (contentEditableRef.current) {
            contentEditableRef.current.focus();
        }
    };

    useEffect(() => {
        const updatedFormData = formData.map((obj: any) =>
            obj.id === field.id
                ? {
                    ...obj,
                    checkboxOption: {
                        id: field.id,
                        value: field.checkboxOption?.value || "New Option",
                        checked: field.checkboxOption?.checked || false,
                    },
                    labelName: field.labelName || "",
                    description: field.description || "",
                }
                : obj
        );
        setFormData(updatedFormData);
    }, [field.id, field.checkboxOption?.value, field.checkboxOption?.checked, field.labelName, field.description, setFormData]);

    return (
        <Box sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
            <Checkbox
                checked={field.checkboxOption?.checked || false}
                onChange={handleCheckboxChange}
            />
            <ContentEditable
                innerRef={contentEditableRef}
                className='checkbox-edit title-text'
                html={field.checkboxOption?.value || 'New Option'}
                disabled={isFromPreview}
                onChange={handleChoiceValueChange}
                tagName="span"
                style={{
                    marginLeft: '8px',
                    cursor: isFromPreview ? 'default' : 'text',
                    paddingLeft: '5px',
                    color: field.checkboxOption?.value ? 'initial' : 'gray',
                    minWidth: '150px',
                    display: 'inline-block'
                }}
                placeholder='Enter checkbox label'
                onClick={handleFocus}
                onFocus={(e) => {
                    if (!field.checkboxOption?.value) {
                        e.target.innerHTML = '';
                    }
                    handleFocus();
                }}
                onBlur={(e) => {
                    if (!field.checkboxOption?.value) {
                        e.target.innerHTML = 'Enter checkbox label';
                    }
                }}
            />


        </Box>
    );
};

export default CheckboxComponent;
