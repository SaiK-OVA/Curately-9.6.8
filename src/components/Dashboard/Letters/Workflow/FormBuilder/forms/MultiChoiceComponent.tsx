import { useContext } from 'react';
import  {React, useState, useEffect } from '../../../../../../shared/modules/React';
import {Box} from '../../../../../../shared/modules/MaterialImports/Box';
import {Typography} from '../../../../../../shared/modules/MaterialImports/Typography';
import {Button} from '../../../../../../shared/modules/MaterialImports/Button';
import CancelIcon from '@mui/icons-material/Cancel';
import { FormStore } from "../../../../../../App";
import ContentEditable from 'react-contenteditable';
// import { shallow } from 'zustand/shallow';
// import useFormBuilderStore, { FORMBUILDER_STATE } from '../../../../../../shared/store/FormBuilderStore';


// const formBuilderSelector = (state: FORMBUILDER_STATE) => ({
//     formData: state.formData,
//     setFormData: state.setFormData
// });


import './form.scss'

interface MultiProps {
    isFromPreview: boolean;
    field: any;
    formIndex: number;
}

const MultiChoiceComponent: React.FC<MultiProps> = ({ isFromPreview, field, formIndex }) => {
    // console.log(field, 'ff mult')
    const [multiOptions, setMultiOptions] = useState<any[]>(field.choices ? field.choices : []);
    const [formData, setFormData] = useContext(FormStore);
    // const { formData, setFormData } = useFormBuilderStore(formBuilderSelector, shallow);
    // const [propsData, setPropsData] = useContext(Store)
    const [choiceIndex, setChoiceIndex] = useState<any>(null);
    // const editableMultiRefs = useRef<(HTMLDivElement | null)[]>([])
    const [isChanged, setIsChanged] = useState(false)
    const handleMouseEnter = (index: any) => {
        setChoiceIndex(index)
    }

    const trimExtraSpaces = (string: any) => {
        return string
            .replace(/<[^>]+>/g, '') // remove html tags
            .replace(/&nbsp;/g, ' ')
            .replace(/&amp;/g, '&')
            .replace(/&gt;/g, '>')
            .replace(/&lt;/g, '<');
    }

    const handleMouseLeave = (index: any) => {
        setChoiceIndex(null)
    }
    let characters = [];
    for (let i = 97; i <= 122; i++) {
        characters.push(String.fromCharCode(i));
    }
    const createChoice = () => {
        let indexCount = Number(multiOptions.length)
        let characterVal = characters[indexCount]

        let id = multiOptions.length + 1
        // let id = multiOptions[multiOptions.length - 1].id + 1
        let choiceObj = {
            id: id + field.id,
            value: "Choice " + id,
            character: characterVal
        }
        setMultiOptions((prevState) => [...prevState, choiceObj])
        setTimeout(() => {
            // console.log(`choice${multiOptions.length - 1}`)
            if (document.getElementById(`choice${multiOptions.length}${field.id}`)) {
                document.getElementById(`choice${multiOptions.length}${field.id}`)?.focus()
                let ele: any = document.getElementById(`choice${multiOptions.length}${field.id}`)

                let selection: any = document.getSelection();
                let range: any = document.createRange();
                if (ele.lastChild?.nodeType === 3) {
                    range.setStart(ele.lastChild, ele.lastChild.length);
                } else {
                    range.setStart(ele, ele.childNodes.length);
                }
                selection.removeAllRanges();
                selection.addRange(range);
            }
        }, 100)
        setIsChanged((prev: any) => !prev)
    }

    const handleRemove = (item: any) => {

        let copiedOptions = [...multiOptions]
        let filteredOptions = copiedOptions.filter((opt) => opt.id !== item.id);
        let count = 0;
        // filteredOptions.forEach((option) => {
        //     option.id = count + 1
        //     option.character = characters[count]
        //     count++
        // })
        for (let i = 0; i < filteredOptions.length; i++) {
            filteredOptions[i].id = count + 1;
            filteredOptions[i].character = characters[i]
            count++
        }
        // console.log(filteredOptions, "ff")
        setTimeout(() => {
            setMultiOptions([...filteredOptions])
            setIsChanged((prev: any) => !prev)
        }, 100)

    }

    const handleInputChange = (e: any, itemId: any) => {
        console.log(e, 'fr');
        // formIndex
        let index: any = multiOptions.findIndex((item) => item.id === itemId)

        if (index !== -1) {
            const newOptions = [...multiOptions]
            // let updatedVal = e.target.value.replace(/\&nbsp;/g, '')
            newOptions[index].value = trimExtraSpaces(e.target.value)
            // setMultiOptions([...newOptions])
            formData[formIndex].choices = newOptions;
            setFormData([...formData]);
            // console.log(formData);
        }


    }


    useEffect(() => {

        // console.log(options, 'options')
        const newState = formData.map((obj: any) => {
            if (obj.id === field.id) {
                return { ...obj, choices: multiOptions };
            }
            return obj;
        });
        setFormData(newState);
    }, [isChanged])

    // useEffect(() => {
    //     setMultiOptions(field.choices);
    //     console.log(field.id);
    // }, [JSON.stringify(formData)])

    useEffect(() => {
        setMultiOptions(field.choices);
    }, [field.choices])



    return (
        <Box className="multi-container" sx={{ mt: 1 }}>
            {multiOptions?.map((opt, index) => {
                return (
                    <Box key={index} sx={{ width: "45%" }} className="multi-parent" onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={() => handleMouseLeave(index)}>
                        <Typography className="multi-opt">{opt?.character?.toUpperCase()}</Typography>

                        <Box className="mult-cancel-box">
                            <ContentEditable
                                className='content-edit title-text'
                                html={opt.value}
                                onChange={(e) => handleInputChange(e, opt.id)}
                                style={{ alignSelf: "center", width: "90%" }}
                                id={"choice" + index + field.id}
                                onDragStart={(e: any) => {
                                    e.stopPropagation();

                                }} draggable="true"
                                disabled={isFromPreview}

                            />
                            {/* <Box className="multi-edit-text" contentEditable="true" placeholder="choice" onInput={(e) => handleInputChange(e, index)} ref={(ref: HTMLDivElement) => editableMultiRefs.current[index] = ref}>{opt.value}</Box> */}
                            <Button className="multi-cancel-btn" sx={{ visibility: index === choiceIndex && multiOptions.length > 1 ? "shown" : "hidden" }}
                                onClick={(e) => handleRemove(opt)}>
                                <CancelIcon sx={{ fontSize: "24px", color: "#1565c0", fill: "rgb(151 145 145)" }} />
                            </Button>
                        </Box>
                    </Box>
                )
            })}

            <Box>
                <Button className="add-choice" variant="text" onClick={createChoice}>Add Choices</Button>
            </Box>
        </Box>
    )
}

export default MultiChoiceComponent