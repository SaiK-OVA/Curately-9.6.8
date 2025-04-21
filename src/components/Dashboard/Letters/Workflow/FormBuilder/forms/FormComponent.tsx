import { useContext, } from 'react';
import  {React, useRef} from '../../../../../../shared/modules/React';
import {Grid, Button} from '../../../../../../shared/modules/commonImports';
import {Box} from '../../../../../../shared/modules/MaterialImports/Box';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import MenuComponent from '../shared/menu/MenuComponent';
import TextComponent from './TextComponent';
import InsertMenuModalComponent from '../shared/modal/InsertMenuModalComponent';
// import { Store } from '../MainComponent/MainComponent';

import { useDrag, useDrop } from 'react-dnd'

import type { Identifier, XYCoord } from 'dnd-core'

import { Store, FormStore } from "../../../../../../App";

import { formFields, FormField } from '../shared/utills/Constants';

import { shallow } from 'zustand/shallow';

// import useFormBuilderStore, { FORMBUILDER_STATE } from '../../../../../../shared/store/FormBuilderStore';

// const formBuilderSelector = (state: FORMBUILDER_STATE) => ({
//     formData: state.formData, 
//     setFormData: state.setFormData
// });


interface DragItem {
    index: number
    id: string
    type: string
}

const style = {

    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: 'white',
    cursor: 'pointer',
}

export interface FormProps {
    id: any
    index: number
    moveCard: (dragIndex: number, hoverIndex: number) => void
    addFormElement: (type: any) => void
    deleteFormElement: (index: number) => void
    copyFormElement: (type: any, index: number) => void
    formItem: any
    getAdingPosition: (index: number) => void
    addingPosition: any,
    canDelete?: boolean,
    generateDataKey?: boolean
    focusId?: string | null;
    setFocusId: (id: string | null) => void;
    isCustomFieldDeleteSettingEnabled?: boolean;
}

const FormComponent: React.FC<FormProps> = ({ id, index, moveCard, addFormElement, copyFormElement, deleteFormElement, formItem, getAdingPosition, addingPosition, generateDataKey = false, focusId, setFocusId, isCustomFieldDeleteSettingEnabled = true }) => {

    const [propsData, setPropsData] = useContext(Store)

    const [anchorEl, setAnchorEl] = React.useState(null);

    // const [open, setOpen] = React.useState(false);
    const [createdFields, setCreatedFields] = React.useState<FormField[]>(formFields);
    const [currentTargetIndex, setCurrentIndex] = React.useState(null)
    const editableRefs = useRef<(HTMLDivElement | null)[]>([])
    const btnRef = useRef<HTMLButtonElement | any>(null)
    const [isInsertMenuModal, setIsInsertMenuModal] = React.useState(false)
    const [formData, setFormData] = useContext(FormStore);
    // const { formData, setFormData } = useFormBuilderStore(formBuilderSelector, shallow);

    const onClickInsert = (index: any) => {

        getAdingPosition(index)
        setIsInsertMenuModal(true)
        sessionStorage.setItem("isFromHeader", "false")
        sessionStorage.setItem("indexPos", index)
    }

    const closeInsertModal = (flag: boolean) => {
        setIsInsertMenuModal(flag)
    }
    const handleMenuClose = (value: any) => {
        setAnchorEl(value)

    }


    const handleMouseEnter = (index: any) => {
        let height = "0px"
        setCurrentIndex(index)
        if (editableRefs.current) {
            height = `${editableRefs.current[index]?.clientHeight}px`
            // setBoxHeight(height)
        }
        // console.log(editableRefs, 'editableRefs')
    }

    const handleMouseLeave = (index: any) => {
        setCurrentIndex(null)
        // setBoxHeight("0px")

    }


    const addElement = (type: any) => {
        // console.log(type);
        addFormElement(type)

    }


    const copyElement = (type: any, index: any) => {
        copyFormElement(type, index)

    }
    const deleteElement = (itemId: any) => {
        deleteFormElement(itemId)

    }

    const getHeight = (index: any) => {
        const ele = document.getElementById("element_" + index);
        if (ele)
            return ele.offsetHeight + "px"
    }

    const dragRef = useRef<HTMLDivElement>(null)
    const [{ handlerId }, drop] = useDrop<
        DragItem,
        void,
        { handlerId: Identifier | null }
    >({
        accept: 'card',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item: DragItem, monitor) {
            if (!dragRef.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index

            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return
            }

            // Determine rectangle on screen
            const hoverBoundingRect = dragRef.current?.getBoundingClientRect()

            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

            // Determine mouse position
            const clientOffset = monitor.getClientOffset()

            // Get pixels to the top
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%

            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }

            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }

            // Time to actually perform the action
            moveCard(dragIndex, hoverIndex)

            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex
        },
    })

    const [{ isDragging }, drag] = useDrag({
        type: "card",
        item: () => {
            return { id, index }
        },
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const opacity = isDragging ? 0 : 1
    drag(drop(dragRef))


    const handleFocus = (e: any) => {
        e.stopPropagation()

        let updatedData = formData.map((form: any) => {
            if (form.id !== formData[index].id) {
                form.isActive = false
            }
            else {
                form.isActive = true
            }
            return form
        })
        // formItem.isActive = true
        setFormData([...updatedData])

        // console.log(formData[formIndex], 'form index')
    }

    return (
        <>
            {
                propsData.isPreview === false && (
                    <>

                        {/* <Grid size={12}>
                                <Grid container sx={{ justifyContent: "center" }} onMouseEnter={handleShowDefault} onMouseLeave={handleHideDefault}>
                                    <Grid size={1}></Grid>
                                    <Grid size={6} sx={{ visibility: isShowDefauldAdd ? "shown" : "hidden" }}>
                                        <Box sx={{ display: "flex", alignItems: "center" }}>
                                            <Button
                                                disableRipple
                                                variant="text" onClick={() => onClickInsert(-1)} className='btn-hover btn-add'>
                                                <AddOutlinedIcon sx={{ fontSize: "28px !important", color: "#08adff" }} />
                                            </Button>

                                            <Box sx={{ width: "64.4%", height: "3px", backgroundColor: "#08adff" }}></Box>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid> */}




                        <Grid container className="text-main" onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={() => handleMouseLeave(index)} ref={dragRef} style={{ ...style, opacity, border: formItem.isActive ? "2px solid #3f51b5" : "none" }} data-handler-id={handlerId} id={formItem.id + `comp${index}`}>
                            <Grid size={1} sx={{ alignSelf: "center", mt: 2 }} >
                                <Box sx={{ display: "flex", visibility: currentTargetIndex === index ? "shown" : "hidden", transition: "height 1s, width 1s" }}>

                                    <Button
                                        disableRipple
                                        variant="text" className="control-cls btn-hover btn-drag" ref={btnRef}>
                                        <DragIndicatorOutlinedIcon sx={{ fontSize: "28px", color: "rgb(187, 186, 184)", cursor: "move", backgroundColor: currentTargetIndex === index ? "#dee3e9" : "none", height: getHeight(index) }} className="control-icon" />
                                    </Button>
                                </Box>
                            </Grid>
                            <Grid size={10}>
                                <Grid container>
                                    <Grid size={11}>
                                        <Box ref={(ref: HTMLDivElement) => editableRefs.current[index] = ref} id={"element_" + index}>
                                            <TextComponent key={index} inputType={formItem.fieldType} currentIndexValue={currentTargetIndex} formIndex={index} deleteElement={deleteElement} field={formItem} copyElement={copyElement} addingPosition={addingPosition} canDelete={formItem.canDelete} generateDataKey={generateDataKey}
                                                focusId={focusId}
                                                setFocusId={setFocusId}
                                                isCustomFieldDeleteSettingEnabled={isCustomFieldDeleteSettingEnabled}
                                            />
                                        </Box>
                                    </Grid>
                                    {/* <Grid size={'auto'}>
                                                    <Box sx={{ borderRight: currentTargetIndex === index ? "3px solid #08adff" : "none", position: "relative", top: "17px", height: boxHeight }}>

                                                    </Box>
                                                </Grid> */}
                                </Grid>
                            </Grid>
                            <Grid size={1} >

                            </Grid>
                            <Grid size={1}></Grid>
                            <Grid size={11} sx={{ visibility: currentTargetIndex === index ? "shown" : "hidden" }}>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Button
                                        disableRipple
                                        variant="text" onClick={() => onClickInsert(index)} className='btn-hover btn-add'>
                                        <AddOutlinedIcon sx={{ fontSize: "28px !important", color: "#08adff" }} />
                                    </Button>

                                    <Box sx={{ width: "78%", height: "3px", backgroundColor: "#08adff" }}></Box>
                                </Box>
                            </Grid>
                        </Grid>
                        <MenuComponent anchorElement={anchorEl} handleMenuClose={handleMenuClose} />

                        {/* <Box id="controls">
                        <ControlSettings anchorElement={anchorPopperEl} handleMenuClose={handleMenuClose} />
                    </Box> */}

                        <InsertMenuModalComponent openInsertModal={isInsertMenuModal} closeInsertModal={closeInsertModal} createdFields={createdFields} addElement={addElement} />


                    </>

                )
            }

        </>

    )
}

export default FormComponent


