import { useContext, useRef } from 'react';
import {
    React,
    useState,
    useEffect,
    // useRef,
    // useMemo
} from '../../../../../../shared/modules/React';
import { Box } from '../../../../../../shared/modules/MaterialImports/Box';
import { styled } from '@mui/material/styles';
import { Typography } from '../../../../../../shared/modules/MaterialImports/Typography';
import { Select } from '../../../../../../shared/modules/MaterialImports/FormElements';
import InputBase from '@mui/material/InputBase';
import { MenuItem } from '../../../../../../shared/modules/MaterialImports/Menu';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Button } from '../../../../../../shared/modules/MaterialImports/Button';
import CancelIcon from '@mui/icons-material/Cancel';
import { ReactSortable } from "react-sortablejs";
import ContentEditable from 'react-contenteditable';
import { FormStore, Store } from "../../../../../../App";
import "./form.scss"
// import Parsable from '../../../../../../shared/utils/Parsable';
// import { shallow } from 'zustand/shallow';


// import useFormBuilderStore, { FORMBUILDER_STATE } from '../../../../../../shared/store/FormBuilderStore';
// const formBuilderSelector = (state: FORMBUILDER_STATE) => ({
//     formData: state.formData,
//     setFormData: state.setFormData
// });

const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
        marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}));

// const OpenDown: React.FunctionComponent = (props: SelectProps) => {
//     return <KeyboardArrowDownIcon />;
// };

interface RankingProps {
    isFromPreview: boolean;
    field: any;
    changeHandlerFn?: any;
    getRankValues: (value: any, id: any) => void;
    optionsList: any
}
const RankingComponent: React.FC<RankingProps> = ({ isFromPreview, field, changeHandlerFn, getRankValues, optionsList }) => {
    const [propsData, setPropsData] = useContext(Store)
    const [formData, setFormData] = useContext(FormStore);
    // const { formData, setFormData } = useFormBuilderStore(formBuilderSelector, shallow);
    const [options, setOptions] = useState<number[]>([]);
    const [choices, setChoices] = useState<any[]>([])
    const [choiceIndex, setChoiceIndex] = useState<any>(null)
    const [isOptionChanged, setIsoptionChanged] = useState(false)
    const [isClearClick, setIsClearClick] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    // const ranksRef = useRef<(HTMLDivElement | null)[]>([]);
    // const [isRankRemoved, setRankRemoved] = useState(false)

    const createChoice = () => {

        let indexCount = Number(choices.length) + 1;
        let newChoice = "Choice " + indexCount;
        let id = 1;
        let userRank = 1;

        if (choices.length !== 0) {
            id = choices[choices.length - 1].id + 1;
            userRank = choices[choices.length - 1].rank + 1;
        }

        let choiceObj = {
            id: id,
            value: newChoice,
            rank: userRank,
        };



        setChoices((prevState) => [...prevState, choiceObj]);
        setTimeout(() => {
            // console.log(`rank${choices.length - 1}`)
            if (document.getElementById(`rank${choices.length}`)) {
                document.getElementById(`rank${choices.length}`)?.focus()
                let ele: any = document.getElementById(`rank${choices.length}`)
                // console.log(ele[0], 'erff')
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
        // setIsLoaded(true)

    }
    useEffect(() => {
        // console.log(choices,field.id)
        getRankValues(choices, field.id)
    }, [choices])


    useEffect(() => {
        let count = 0;
        let optionsCount = []


        for (let i = 0; i < choices.length; i++) {
            optionsCount.push(count + 1)
            count++
        }
        setOptions(optionsCount)


        // console.log(choices, 'choo')
    }, [choices])

    useEffect(() => {

        const newState = formData.map((obj: any) => {
            if (obj.id === field.id) {
                return { ...obj, ranks: choices };
            }
            return obj;
        });
        setFormData(newState);
        setIsLoaded(true)
        // console.log("gert", choices)
    }, [choices])

    const handleMouseEnter = (index: any) => {
        setChoiceIndex(index)
    }

    const handleMouseLeave = (index: any) => {
        setChoiceIndex(null)
    }




    const onClickOrderNumber = (index: any, choice: any, option: any) => {

        if (isFromPreview) {
            setIsoptionChanged(true)
            setIsClearClick(false)
            let selectedChoice = choices.filter((choiceItem: any) => {
                return choiceItem.id === choice.id;
            })

            let remainingChoices = choices.filter((choiceItem: any) => {
                return choiceItem.id !== choice.id;
            })

            let selectedOption = options.filter((optionItem: any) => {
                return optionItem === option
            })

            let remainingOptions = options.filter((optionItem: any) => {
                return optionItem !== option
            })
            selectedChoice[0].rank = selectedOption[0];
            for (let choiceItem = 0; choiceItem < remainingChoices.length; choiceItem++) {
                remainingChoices[choiceItem].rank = remainingOptions[choiceItem]
            }
            let updateChoices: any[] = [...remainingChoices, ...selectedChoice]
            // console.log(remainingOptions, 'remainingOptions', updateChoices)
            // const orderOfCurrentChoice = choices.findIndex(choice => (
            //     choice.value === choiceValue
            // ));
            // let iterateCount = 0
            // const targetOrder = index + 1
            // const indexOfCurrentChoice = orderOfCurrentChoice + 1

            // const updateChoices = choices.map((choice: any) => {
            //     iterateCount = iterateCount + 1
            //     if (iterateCount < indexOfCurrentChoice && iterateCount < targetOrder) {
            //         return { ...choice }
            //     }
            //     else if (iterateCount <= indexOfCurrentChoice && iterateCount > targetOrder) {
            //         return choices[iterateCount - 2]
            //     }
            //     else if (iterateCount >= indexOfCurrentChoice && iterateCount < targetOrder) {
            //         return choices[iterateCount]
            //     }
            //     else if (iterateCount === targetOrder) {
            //         return { ...choice, value: choiceValue }
            //     }
            //     else if (iterateCount > targetOrder) {
            //         return choices[iterateCount - 1]
            //     }
            // })

            // let intialVal = 0;
            // updateChoices.forEach((opt) => {
            //     opt.id = intialVal + 1
            //     opt.rank = intialVal + 1
            //     intialVal++
            // })

            getRankValues(updateChoices, field.id)
            setChoices(updateChoices)
            const newState = formData.map((obj: any) => {
                if (obj.id === field.id) {
                    return { ...obj, isRankUpdated: true };
                }
                return obj;
            });
            setFormData(newState);

        }
    }

    const handleOrderChange = (e: any) => {
        setIsoptionChanged(true)
        setIsClearClick(false)
        let selectedChoice = choices.filter((choiceItem: any) => {
            return choiceItem.id === choices[e.oldIndex].id;
        })

        let remainingChoices = choices.filter((choiceItem: any) => {
            return choiceItem.id !== choices[e.oldIndex].id;
        })

        let selectedOption = options.filter((optionItem: any) => {
            return optionItem === options[e.newIndex]
        })

        let remainingOptions = options.filter((optionItem: any) => {
            return optionItem !== options[e.newIndex]
        })
        selectedChoice[0].rank = selectedOption[0];
        for (let choiceItem = 0; choiceItem < remainingChoices.length; choiceItem++) {
            remainingChoices[choiceItem].rank = remainingOptions[choiceItem]
        }
        let updateChoices: any[] = [...remainingChoices, ...selectedChoice]
        const newState = formData.map((obj: any) => {
            if (obj.id === field.id) {
                return { ...obj, isRankUpdated: true };
            }
            return obj;
        });
        setFormData(newState);
        // console.log(remainingOptions, 'remainingOptions', updateChoices)
        // const orderOfCurrentChoice = choices.findIndex(choice => (
        //     choice.value === choiceValue
        // ));
        // let iterateCount = 0
        // const targetOrder = index + 1
        // const indexOfCurrentChoice = orderOfCurrentChoice + 1

        // const updateChoices = choices.map((choice: any) => {
        //     iterateCount = iterateCount + 1
        //     if (iterateCount < indexOfCurrentChoice && iterateCount < targetOrder) {
        //         return { ...choice }
        //     }
        //     else if (iterateCount <= indexOfCurrentChoice && iterateCount > targetOrder) {
        //         return choices[iterateCount - 2]
        //     }
        //     else if (iterateCount >= indexOfCurrentChoice && iterateCount < targetOrder) {
        //         return choices[iterateCount]
        //     }
        //     else if (iterateCount === targetOrder) {
        //         return { ...choice, value: choiceValue }
        //     }
        //     else if (iterateCount > targetOrder) {
        //         return choices[iterateCount - 1]
        //     }
        // })

        // let intialVal = 0;
        // updateChoices.forEach((opt) => {
        //     opt.id = intialVal + 1
        //     opt.rank = intialVal + 1
        //     intialVal++
        // })

        getRankValues(updateChoices, field.id)
        setChoices(updateChoices)
        // onClickOrderNumber(updatedIndex, choices[updatedIndex], options[updatedIndex])


    }

    const trimExtraSpaces = (string: any) => {
        return string
            .replace(/<[^>]+>/g, '') // remove html tags
            .replace(/&nbsp;/g, ' ')
            .replace(/&amp;/g, '&')
            .replace(/&gt;/g, '>')
            .replace(/&lt;/g, '<');
    }

    const handleTitle = (event: any, itemId: number) => {
        let index: any = choices.findIndex((item) => item.id === itemId)

        if (index !== -1) {
            const newChoices = [...choices]
            newChoices[index].value = trimExtraSpaces(event.target.value)
            setChoices(newChoices)
        }
    }

    const handleRemove = (id: any) => {
        let updatedChoices = choices.filter((choice) => choice.id !== id)
        let count = 0;
        // filteredOptions.forEach((option) => {
        //     option.id = count + 1
        //     option.character = characters[count]
        //     count++
        // })
        for (let i = 0; i < updatedChoices.length; i++) {
            updatedChoices[i].id = count + 1;
            updatedChoices[i].rank = count + 1
            // updatedChoices[i].value = count + 1
            count++
        }
        // console.log(updatedChoices, 'updatedChoices')
        setChoices(updatedChoices)
        // setIsLoaded(true)
    }

    const clearAll = (e: any) => {
        getRankValues("", field.id)
        changeHandlerFn(field.id?.toString(), JSON.stringify(e.target.value), true);
        setIsClearClick(true)
        const newState = formData.map((obj: any) => {
            if (obj.id === field.id) {
                return { ...obj, isRankUpdated: false };
            }
            return obj;
        });
        setFormData(newState);

    }
    // const mainFormData = useMemo(() => formData, [])

    const fieldRanksRef = useRef("");

    useEffect(() => {
        if (field && (field.ranks.length > 0) && ((fieldRanksRef.current !== JSON.stringify(field.ranks)) || !fieldRanksRef.current)) {
            fieldRanksRef.current = JSON.stringify(field.ranks)
            setChoices(field.ranks)
        }
        // console.log("is calling")
        // console.log(choices)

    }, [field])

    useEffect(() => {
        if (isFromPreview) {
            // console.log(field, 'fiii')
            if (field.isRankUpdated) {
                setIsoptionChanged(true)
                setIsClearClick(false)
            }

        }
    }, [propsData.isPreview])

    useEffect(() => {
        if (isFromPreview) {
            if (optionsList) {
                // setChoices(Parsable.isJSON(optionsList) ? JSON.parse(optionsList) : optionsList);
                setIsoptionChanged(true)
            }
            else {
                setIsoptionChanged(false)
            }
        }


    }, [optionsList, isFromPreview])




    return (

        <>
            {isLoaded && <Box className="ranking-container">
                <Typography sx={{ mb: 1 }} className="drag-text">Drag and Drop to rank options</Typography>
                <ReactSortable list={choices} setList={setChoices} onEnd={handleOrderChange} animation={200}
                    delay={2} >
                    {choices?.sort(function (item1, item2) {
                        return item1.rank - item2.rank;
                    }).map((choice, index) => {
                        return (
                            <Box sx={{ display: "flex", cursor: "grabbing" }} key={choice.rank + index} onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={() => handleMouseLeave(index)} onDragStart={(e: any) => {
                                e.stopPropagation();

                            }} draggable="true">
                                <Box className="ranking-box" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }} onDragStart={(e: any) => {
                                    e.stopPropagation();

                                }} draggable="false" key={choice.rank}>
                                    {isFromPreview ? <Select
                                        id="demo-customized-select-native"
                                        value={choice.rank}
                                        sx={{ border: "1px solid #1565c0", }}
                                        input={<BootstrapInput />}
                                        renderValue={(value) => {
                                            return (
                                                <Box sx={{ display: "flex" }}>
                                                    {isOptionChanged ? (isClearClick ? '-' : choice.rank) : '-'}
                                                </Box>

                                            );
                                        }}
                                        onChange={(e: any) => { changeHandlerFn(field.id?.toString(), JSON.stringify(e.target.value), true); }}
                                    // IconComponent={OpenDown}
                                    >
                                        {/* <MenuItem value={"-"}>-</MenuItem> */}
                                        {options.map((option, index) => {
                                            return (
                                                <MenuItem key={option + index} onClick={() => onClickOrderNumber(index, choice, option)} value={option} >{option}</MenuItem>
                                            )
                                        })}


                                    </Select> : <Select
                                        id="demo-customized-select-native"
                                        value={choice.rank}
                                        sx={{ border: "1px solid #1565c0", }}
                                        input={<BootstrapInput />}

                                        renderValue={(value) => {
                                            // console.log(value);
                                            return (
                                                <Box sx={{ display: "flex", }}>

                                                    {"-"}
                                                </Box>
                                            );
                                        }}
                                    // IconComponent={OpenDown}
                                    >
                                        {/* <MenuItem value={"-"}>-</MenuItem> */}
                                        {options.map((option, index) => {
                                            return (
                                                <MenuItem value={option} key={option + index}>{option}</MenuItem>
                                            )
                                        })}


                                    </Select>}

                                    <ContentEditable
                                        className='content-edit title-text'
                                        html={choice.value}
                                        onChange={(e) => handleTitle(e, choice.id)}
                                        id={"rank" + index}
                                        disabled={isFromPreview}

                                    />
                                    {/* <Typography placeholder="choice" contentEditable="true" className="choice-text" ref={(ref: HTMLDivElement) => editableChoiceRefs.current[index] = ref} key={choice.id} onInput={(e) => handleInputChange(e, index)}>{choice.value}</Typography> */}
                                    <DragIndicatorOutlinedIcon sx={{ fontSize: "26px", color: "#1565c0" }} />
                                </Box>
                                {!isFromPreview && <Button className="cancel-btn" sx={{ visibility: choiceIndex === index ? "shown" : "hidden" }}
                                    onClick={() => handleRemove(choice.id)}>
                                    <CancelIcon sx={{ fontSize: "24px", color: "#1565c0" }} />
                                </Button>}

                            </Box>
                        )
                    })}
                </ReactSortable>
                {isFromPreview ? <Box>
                    <Button className="add-choice" variant="text" onClick={clearAll}>Clear All</Button>
                </Box> : <Box>
                    <Button className="add-choice" variant="text" onClick={createChoice}>Add Choices</Button>
                </Box>}

            </Box>}
        </>
    )
}

export default RankingComponent;