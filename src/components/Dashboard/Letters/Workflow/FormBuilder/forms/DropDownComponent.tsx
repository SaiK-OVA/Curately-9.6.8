import  { useContext } from "react";
import  {React, useState, useEffect } from "../../../../../../shared/modules/React";
import {Box} from '../../../../../../shared/modules/MaterialImports/Box';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Button} from '../../../../../../shared/modules/MaterialImports/Button'
import {Typography} from '../../../../../../shared/modules/MaterialImports/Typography';


import { Store, FormStore } from '../../../../../../App';

import ModalComponent from '../shared/modal/ModalComponent';
import useFormBuilderStore, { FORMBUILDER_STATE } from "../../../../../../shared/store/FormBuilderStore";


import { shallow } from 'zustand/shallow';


const formBuilderSelector = (state: FORMBUILDER_STATE) => ({
    formData: state.formData,
    setFormData: state.setFormData
});

import "./form.scss"

interface DropdownProps {
    field: any
}
const DropdownComponent: React.FC<DropdownProps> = ({ field }) => {
    const [propsData, setPropsData] = useContext(Store)
    const [formData, setFormData] = useContext(FormStore);
    // const { formData, setFormData } = useFormBuilderStore(formBuilderSelector, shallow);
    const [isOpen, setOpen] = useState(false);
    const [optionsData, setOptionsData] = useState(field.options)

    const handleOpen = () => {
        setOpen(true)
    }

    const closeModal = (flag: any) => {
        setOpen(flag)
    }

    const getDropdownValue = (options: any) => {
        console.log(options, "opt")
        setOptionsData(options)
    }

    useEffect(() => {
        // console.log(options, 'options')
        const newState = formData.map((obj: any) => {
            if (obj.id === field.id) {
                return { ...obj, options: optionsData };
            }
            return obj;
        });
        setFormData(newState);
    }, [optionsData])



    return (
        <>
            <Box className="dropdown-container">
                <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", borderBottom: "1px solid #1565c0", cursor: "pointer" }} onClick={handleOpen}>
                    <Typography className='dropdown-title'>Type or select an option</Typography>
                    <ExpandMoreIcon sx={{ fontSize: "20px", color: "#1565c0" }} />
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Button className="add-choice" variant="text" onClick={handleOpen}>
                        {optionsData.length ? "Edit Choices" : "Add Choices"}
                    </Button>
                    <Typography sx={{ fontSize: "14px", color: "#1565c0", opacity: "0.7", marginTop: "8px" }}>{optionsData.length + " options in list"}</Typography>
                </Box>
            </Box>
            <ModalComponent open={isOpen} closeModal={closeModal} getDropdownValue={getDropdownValue} field={field} />
        </>
    )
}

export default DropdownComponent