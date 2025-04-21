import { useContext } from 'react';
import { useCallback, useState, useEffect, useRef } from '../../../../../../shared/modules/React';
import update from 'immutability-helper'
// import type { FC } from 'react'
import { Grid, Button, TextField } from '../../../../../../shared/modules/commonImports';
import {Box} from '../../../../../../shared/modules/MaterialImports/Box';
// import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import FormComponent from './FormComponent'

// import FormControl from '@mui/material/FormControl';

// import FormControlLabel from '@mui/material/FormControlLabel';
// import Switch from '@mui/material/Switch';
import withScrolling from 'react-dnd-scrolling';
// { createHorizontalStrength, createVerticalStrength }
import InsertMenuModalComponent from '../shared/modal/InsertMenuModalComponent';
// import { styled } from '@mui/material/styles';
// import Stack from '@mui/material/Stack';
import {Typography} from '../../../../../../shared/modules/MaterialImports/Typography';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardActions from '@mui/material/CardActions';
// import Paper from '@mui/material/Paper';
// import CircularProgress from '@mui/material/CircularProgress';
// import { useParams } from 'react-router-dom';
// import Snackbar from '@mui/material/Snackbar';
// import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { FormField } from '../shared/utills/Constants';

// import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import Header from '../Header/Header';
import { v4 as uuidv4 } from 'uuid';
import { FormStore } from "../../../../../../App";
// import { shallow } from 'zustand/shallow';

// import useFormBuilderStore, { FORMBUILDER_STATE } from '../../../../../../shared/store/FormBuilderStore';

// const formBuilderSelector = (state: FORMBUILDER_STATE) => ({
//     formData: state.formData,
//     setFormData: state.setFormData
// });

import './FormContainer.scss';
import './form.scss';
// import { userLocalData } from '../../../../../../shared/services/userData';
import { showToaster } from '../../../../../shared/SnackBar/SnackBar';

import AIFormView from '../List/AIFormView';
import ApiService from "../../../../../../shared/api/api";


const ScrollingComponent = withScrolling('div');
// const vStrength = createVerticalStrength(500);
// const hStrength = createHorizontalStrength(300);

// const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
//     props,
//     ref,
// ) {
//     return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

const FormContainer1 = (
    { formIdPassed,
        formNamePassed,
        callParentSave,
        cancelClicked,
        isFormBuilder,
        showSave,
        showCancel,
        canDelete,
        generateDataKey = false,

        // initialFormData
    }
        :
        {
            formIdPassed: string;
            formNamePassed: string;
            callParentSave: (data: any, name: string) => void;
            cancelClicked: () => void;
            isFormBuilder: boolean;
            showSave: boolean;
            showCancel: boolean;
            canDelete?: boolean;
            generateDataKey?: boolean;

        }) => {


    // const vertical = "top";
    // const horizontal = "right";
    // const [propsData, setPropsData] = useContext(Store)
    const [formData, setFormData] = useContext(FormStore);
    // const { formData, setFormData } = useFormBuilderStore(formBuilderSelector, shallow);
    // const [formFieldsData, setFormFieldsData] = useState<any>(null)
    const [addingPosition, setAddingPosition] = useState(0)
    // const [isShowDefauldAdd, setDefaultAddShow] = useState(false)
    // const [createdFields, setCreatedFields] = useState<FormField[]>(formFields);
    const [isInsertMenuModal, setIsInsertMenuModal] = useState(false);
    // console.log('formcontainer generetaekey', generateDataKey);

    const addingPositionTemp = useRef(0);
    const [isFirst, setIsFirst] = useState(false);
    // const [scrollId, setScrolId] = useState<any>(null)

    // const [toaster, setToasterOpen] = useState(false);
    // const [severityError, setSeverity] = useState<any>("");
    // const [toastrMessage, setToastrMessage] = useState("");
    const [formName, setFormName] = useState(formNamePassed)
    const [formNameError, setFormNameError] = useState(false)
    const logDataRef = useRef<HTMLDivElement>(null);
    const [focusId, setFocusId] = useState<string | null>(null);

    const [aiViewList, setAIViewList] = useState(false)


    const handleAIViewChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let AIChecked = event.target.checked
        setAIViewList(AIChecked);

    }

    // const onClickInsert = (index: any) => {
    //     setAddingPosition(-1);
    //     addingPositionTemp = -1;
    //     setIsFirst(true);
    //     setIsInsertMenuModal(true)
    //     sessionStorage.setItem("isFromHeader", "true")
    // }

    // const handleShowDefault = () => {
    //     setDefaultAddShow(true)
    // }

    // const handleHideDefault = () => {
    //     setDefaultAddShow(false)
    // }


    const closeInsertModal = (flag: boolean) => {
        setIsInsertMenuModal(flag)

    }

    const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
        setFormData((prevItems: FormField[]) =>
            update(prevItems, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, prevItems[dragIndex] as FormField],
                ],
            }),
        )
    }, [formData])

    useEffect(() => {
        if (logDataRef.current) {
            // logDataRef.current.scrollTop = logDataRef.current.scrollHeight;
        }
    }, [formData.length]);


    // add, delete and copy form elements

    const insert = (arr: any, index: any, newItem: any) => {
        console.log(index, "heree")
        return [
            ...arr.slice(0, index),
            newItem,
            ...arr.slice(index)
        ]
    }
    // const onClickBackToEditor = () => {
    //     navigate("/formBuilder/list")
    // }
    const addFormElement = (type: any) => {
        formData.forEach((form: any) => {
            form.isActive = false;
        })
        // debugger
        let formFields: any[]
        const obj = { ...type };
        // obj.id = formData.length;
        obj.id = uuidv4();
        obj.isActive = true;
        obj.labelName = '';
        obj.description = '';
        obj.value = '';
        console.log("addingPosition : " + addingPosition);
        console.log("addingPositionTemp : " + addingPositionTemp);
        if (obj.hasOwnProperty("labelValue")) {
            obj.labelValue = ""
        }
        if (obj.fieldType === "checkbox") {
            obj.id = uuidv4();
            obj.labelName = 'New Checkbox Label';
            obj.checked = false;
            obj.isTouched = false;
        }


        if (obj.fieldType === "multiplechoice") {
            obj.choices = [{ id: 1, character: "A", value: "Choice 1" }]
        }
        formFields = insert(formData, (isFirst ? 0 : addingPositionTemp.current + 1), obj)
        formFields.forEach((item: any) => {
            item.id = uuidv4();
            item.value = '';
        })


        // setCreatedFields([...formFields])
        setFormData([...formFields]);
        setIsFirst(false);
        setFocusId(obj.id);
    }

    // const getRandom = () => {
    //     let length = 10;

    //     return Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1));

    // }

    const deleteFormElement = (itemId: any) => {
        console.log(itemId, 'tttee')
        const updatedData = formData.filter((item: any) => item.id !== itemId);

        // setCreatedFields([...updatedData]);
        setFormData([...updatedData]);
    }

    const copyFormElement = (type: any, index: number) => {

        const obj = { ...type };
        obj.id = uuidv4();


        obj.labelName = type.labelName ? 'Copy Of ' + type.labelName : '';
        obj.description = type.description ? type.description : '';
        obj.datakey = "";
        obj.value = "";


        const formFields = insert(formData, index, obj)
        // console.log(formFields);
        // let id = 0;
        formFields.forEach((item: any) => {
            item.id = uuidv4();
            item.value = "";
        })
        console.log(formFields);
        let updatedData = formFields.map((form: any) => {
            if (form.id === formFields[index].id) {
                form.isActive = true
            }
            else {
                form.isActive = false
            }
            return form
        })
        // setCreatedFields([...formFields])
        setFormData([...updatedData]);
        setFocusId(obj.id);
    }

    // end add , delete and copy

    const getAdingPosition = (index: number) => {
        console.log(index, 'getAdingPosition')
        addingPositionTemp.current = index;
        setAddingPosition(index)
    }

    const renderCard = useCallback(
        (form: FormField, index: number) => {
            return (
                <FormComponent
                    key={form.id}
                    index={index}
                    id={form.id}
                    moveCard={moveCard}
                    addFormElement={addFormElement}
                    deleteFormElement={deleteFormElement}
                    copyFormElement={copyFormElement}
                    formItem={form}
                    getAdingPosition={getAdingPosition}
                    addingPosition={addingPosition}
                    // canDelete={formItem.canDelete || false}
                    focusId={focusId}
                    canDelete={canDelete}
                    generateDataKey={generateDataKey}
                    setFocusId={setFocusId}
                />
            )
        },
        [formData],
    )



    useEffect(() => {
        //   console.log(formData);
        if (isFormBuilder) {
            setFormData([...formData]);
        }
    }, []);



    const saveData = async () => {
        if (!formName) {
            showToaster('Please enter Form Name.', 'error');
            return
        }

        const weightedArray = formData.filter((item: any) => { return item.fieldType === 'weightedmultiplechoice' });
        if (weightedArray.length > 0) {
            for (let wa = 0; wa < weightedArray.length; wa++) {
                const item = weightedArray[wa];
                if (!('weightedPoints' in item)) {
                    setFocusId(item.id);
                    showToaster(`Please enter points for ${item.labelName}`, 'error');
                    break;
                } else if (!('weightedCorrectAnswer' in item)) {
                    setFocusId(item.id);
                    showToaster(`Please enter Correct Answer for ${item.labelName}`, 'error');
                    break;
                } else if ((weightedArray.length - 1) === wa) {
                    callParentSave(formData, formName);
                }

            }
        } else {
            callParentSave(formData, formName);
        }
 }

    const saveAuditLog = (id: number) => {
        ApiService.saveAuditLog(id);
    }

    return (
        // <Grid container sx={{ alignItems: "center", justifyContent: "center" }} className="main-body">
        // </Grid>
        (<Grid sx={{ display: 'flex' }} className='formBuilder'>
            {/* <nav>
                <Link to="/login">Logout</Link>
            </nav> */}
            <Grid sx={{ flexGrow: 1 }}>
                <Grid className={`${showCancel ? 'headerfixed_AI' : 'headerfixed'}`}>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-evenly"
                        alignItems="center"
                        className='topBar px-4'
                    >

                        <Box>
                            <TextField type='text' variant="standard"
                                required
                                error={formNameError}
                                label="Enter Form Name"
                                className={`form-name-text ${isFormBuilder ? '' : 'd-none'}`}
                                sx={{
                                    background: "#fff", borderRadius: "4px", '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'rgb(187, 186, 184)',
                                    }, '& .MuiInputBase-input.MuiOutlinedInput-input': {
                                        color: '#1A1A1A',
                                        fontSize: '13px',
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
                                    mb: 1,
                                    mr: 2,


                                }}
                                placeholder={""}
                                value={formName}
                                onChange={(e: any) => {
                                    setFormName(e.target.value)
                                    setFormNameError(false)
                                }}
                            />
                            {formNameError && <Typography className="form-name-error-text" sx={{ pb: 1 }}> Form name is required.</Typography>}

                        </Box>
                        <Box>
                            <Header setFocusId={(val: any) => setFocusId(val)} />
                        </Box>
                        <Box className='d-flex'>
                            {
                                showSave ?
                                    <Button size="small" variant='contained' color='primary' className="form-action-btn" sx={{ mr: 1, mt: 1 }} onClick={()=>{saveData();saveAuditLog(4184)}} disabled={formData.length === 0}>{formIdPassed ? "Update" : "Save"}</Button>
                                    :
                                    null
                            }
                            {/* {
                                showCancel ?
                                    <Stack direction="row" spacing={1} alignItems="center" style={{ verticalAlign: "middle" }}>
                                        <Typography className='mb-1'></Typography>
                                        <Switch checked={aiViewList} onChange={handleAIViewChange} name="AIView" />
                                        <Typography>AI View</Typography>
                                    </Stack>

                                    :
                                    null

                                // <Button size="small" variant='outlined' color='secondary' className="form-action-btn" onClick={() => setAIViewList(true)}>AI View</Button>

                            } */}
                        </Box>
                    </Grid>
                </Grid>

                <div className='mainForm' ref={logDataRef}>
                    {aiViewList ?
                        <AIFormView viewQuestions={formData} />
                        :
                        <>
                            <DndProvider backend={HTML5Backend} >
                                <ScrollingComponent >
                                    {formData && formData?.map((form: any, i: any) => renderCard(form, i))}
                                </ScrollingComponent>
                            </DndProvider>
                            <InsertMenuModalComponent openInsertModal={isInsertMenuModal} closeInsertModal={closeInsertModal} createdFields={formData} addElement={addFormElement} />

                        </>
                    }
                    {/* <div>
                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "80%" }}><CircularProgress /></Box>
                    </div> */}


                    {/* <Snackbar onClose={() => setToasterOpen(false)}
                        anchorOrigin={{ vertical, horizontal }}

                        key={vertical + horizontal}
                        open={toaster}
                        autoHideDuration={4000}
                    >
                        {
                            (<Alert severity={severityError}>{toastrMessage}</Alert>)

                        }

                    </Snackbar> */}
                    <br></br>
                </div>
            </Grid>
        </Grid>)
    );


}

export default FormContainer1;