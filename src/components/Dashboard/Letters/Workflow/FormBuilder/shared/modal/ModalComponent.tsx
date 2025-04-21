import { useContext } from 'react';
import  {React, useState, useEffect } from '../../../../../../../shared/modules/React';
import {Button, TextField} from '../../../../../../../shared/modules/commonImports';
import {Dialog, DialogTitle, DialogContent, DialogActions} from '../../../../../../../shared/modules/MaterialImports/Dialog';
import DialogContentText from '@mui/material/DialogContentText';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import {Box} from '../../../../../../../shared/modules/MaterialImports/Box';


import { FormStore } from "../../../../../../../App";

// import { shallow } from 'zustand/shallow';

// import useFormBuilderStore, { FORMBUILDER_STATE } from '../../../../../../../shared/store/FormBuilderStore';

// const formBuilderSelector = (state: FORMBUILDER_STATE) => ({
//     formData: state.formData
// });

import './modal.scss'

interface ModalProps {
    open: boolean;
    closeModal: (openFlag: boolean) => void;
    getDropdownValue: (options: any) => void;
    field: any
}

const ModalComponent: React.FC<ModalProps> = ({ open, closeModal, getDropdownValue, field }) => {
    const [formData, setFormData] = useContext(FormStore)
    // const { formData } = useFormBuilderStore(formBuilderSelector, shallow);
    const [inputValues, setInputValue] = useState("")
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [isDisabled, setIsDisbaled] = useState(true)

    const handleClose = () => {
        closeModal(false);
    };
    const handleSave = () => {
        console.log(inputValues, 'inputValues')
        let arr = inputValues.split(/\r?\n|\r|\n/g);
        let finalOptions: any[] = [];
        arr.forEach((value) => {
            if (value !== "") {
                finalOptions.push(value)
            }
        })
        getDropdownValue(finalOptions)
        closeModal(false);
    };

    const handleInputChange = (e: any) => {

        let strValues = field.options?.toString()
        let finalValues = strValues.replace(/,/g, '\n')

        if (finalValues !== e.target.value) {
            setIsDisbaled(false)
        }
        else {
            setIsDisbaled(true)
        }



        setInputValue(e.target.value)

    }

    useEffect(() => {
        setIsDisbaled(true)
    }, [open])

    useEffect(() => {
        formData.forEach((form: any) => {
            if (form.id === field.id) {
                if (form.options?.length) {
                    let strValues = field.options.toString()
                    let finalValues = strValues.replace(/,/g, '\n')
                    setInputValue(finalValues)
                    let arr = finalValues.split(/\r?\n|\r|\n/g);
                    let finalOptions: any[] = [];
                    arr.forEach((value: any) => {
                        if (value !== "") {
                            finalOptions.push(value)
                        }
                    })
                    getDropdownValue(finalOptions)
                }
                else {
                    setInputValue("")
                    getDropdownValue([])
                }

            }
        })
    }, [JSON.stringify(formData)])

    return (
        <div className="modal-dropdown">

            <Dialog
                className='formBuilder'
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title" className="dropdown-help-title">
                    {field.options?.length ? "Edit choices" : "Add choices"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText className="dropdown-help-text" >
                        <Box sx={{ mb: 1 }} > Write or paste your choices below. Each choice must be on a separate line.</Box>

                    </DialogContentText>
                    <Box>
                        <TextField multiline
                            value={inputValues}
                            onChange={handleInputChange}
                            placeholder=' Your choices go here
                            one per line'
                            rows={10}

                            sx={{
                                width: "100%",
                                '& .MuiInputBase-input.MuiOutlinedInput-input': {
                                    color: '#1A1A1A',
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    fontFamily: 'Segoe UI',
                                },
                                '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'var(--c-primary-color)',
                                },
                                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'var(--c-primary-color)',
                                    borderWidth: '2px',
                                },
                            }}

                        />
                    </Box>
                </DialogContent>
                <DialogActions className='dialogue-actions'>
                    <Button variant="contained" onClick={handleClose} className="btn-action">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} variant="contained" className="btn-action" disabled={isDisabled}>
                        Save choices
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ModalComponent