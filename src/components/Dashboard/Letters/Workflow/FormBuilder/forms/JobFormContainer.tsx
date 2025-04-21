import  {  useContext } from 'react'
import {React,  useCallback, useState, useEffect } from '../../../../../../shared/modules/React'
import update from 'immutability-helper'
// import type { FC } from 'react'
import {Grid} from '../../../../../../shared/modules/MaterialImports/Grid';
import {Box} from '../../../../../../shared/modules/MaterialImports/Box';
import {Button} from '../../../../../../shared/modules/MaterialImports/Button';
// import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import FormComponent from './FormComponent'

import withScrolling from 'react-dnd-scrolling';
// { createHorizontalStrength, createVerticalStrength }
import InsertMenuModalComponent from '../shared/modal/InsertMenuModalComponent';
// import { styled } from '@mui/material/styles';
import {TextField} from '../../../../../../shared/modules/MaterialImports/TextField';
// import Stack from '@mui/material/Stack';
import {Typography} from '../../../../../../shared/modules/MaterialImports/Typography';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardActions from '@mui/material/CardActions';
// import Paper from '@mui/material/Paper';
import {CircularProgress} from '../../../../../../shared/modules/MaterialImports/CircularProgress';
import { useParams, useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { FormField } from '../shared/utills/Constants';

// import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import ApiService from '../../../../../../shared/api/api';
import Header from '../Header/Header';
import { v4 as uuidv4 } from 'uuid';
import { FormStore } from "../../../../../../App";


import './FormContainer.scss';
import './JobFormContainer.scss';

import { userLocalData } from '../../../../../../shared/services/userData';
// import useFormBuilderStore, { FORMBUILDER_STATE } from '../../../../../../shared/store/FormBuilderStore';

import { shallow } from 'zustand/shallow';


// const formBuilderSelector = (state: FORMBUILDER_STATE) => ({
//     formData: state.formData, 
//     setFormData: state.setFormData
// });

const ScrollingComponent = withScrolling('div');
// const vStrength = createVerticalStrength(500);
// const hStrength = createHorizontalStrength(300);

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const JobFormContainer = () => {
    const navigate = useNavigate()
    const vertical = "top";
    const horizontal = "right";
    // const [propsData, setPropsData] = useContext(Store)
    const [formData, setFormData] = useContext(FormStore);
    // const { formData, setFormData } = useFormBuilderStore(formBuilderSelector, shallow);
    // const [formFieldsData, setFormFieldsData] = useState<any>(null)
    const [addingPosition, setAddingPosition] = React.useState(0)
    // const [isShowDefauldAdd, setDefaultAddShow] = React.useState(false)
    // const [createdFields, setCreatedFields] = useState<FormField[]>(formFields);
    const [isInsertMenuModal, setIsInsertMenuModal] = React.useState(false);
    const [isLoaded, setIsLoaded] = useState(false)
    let addingPositionTemp = 0
    const [isFirst, setIsFirst] = React.useState(false);
    // const [scrollId, setScrolId] = useState<any>(null)
    const { formId } = useParams()
    const [toaster, setOpen] = React.useState(false);
    const [severityError, setSeverity] = React.useState<any>("");
    const [toastrMessage, setToastrMessage] = React.useState("");
    const [formName, setFormName] = useState("")
    const [formNameError, setFormNameError] = useState(false)

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

        if (obj.fieldType === "multiplechoice") {
            obj.choices = [{ id: 1, character: "A", value: "Choice 1" }]
        }
        formFields = insert(formData, (isFirst ? 0 : addingPosition + 1), obj)
        formFields.forEach((item: any, index: any) => {
            item.id = uuidv4();
            item.value = '';
        })


        // setCreatedFields([...formFields])
        setFormData([...formFields]);
        setIsFirst(false);
    }

    // const getRandom = () => {
    //     let length = 10;

    //     return Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1));

    // }

    const deleteFormElement = (itemId: any) => {
        console.log(itemId, 'tttee')
        const updatedData = formData.filter((item: any, i: any) => item.id !== itemId);

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
        formFields.forEach((item: any, index: any) => {
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
    }

    // end add , delete and copy

    const getAdingPosition = (index: number) => {
        console.log(index, 'getAdingPosition')
        addingPositionTemp = index;
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
                />
            )
        },
        [formData],
    )



    useEffect(() => {
        //   console.log(formData);
        setFormData([...formData]);
    }, []);

    const saveData = async () => {
        if (!formName) {
            setFormNameError(true)
            return
        }
        try {
            let postData: any = {
                "action": "save",
                "form_name": "",
                "json": {
                    components: formData,
                    curately: true
                },
                "userid": userLocalData.getvalue('recrId'),
                "webFormDesc": "",
                "webformThankContent": "",
                clientId: userLocalData.getvalue('clientId')
            }
            // console.log(formData);

            postData.aliasName = postData.form_name.charAt(0)
            postData.form_name = formName;
            if (formId) {
                postData.form_id = formId
            }
            // let resp = await apiService.saveFormData(postData)
            ApiService.postWithData('admin', 'sequenceFormBuilder', postData)
                .then((response: any) => {
                    if (response.data) {
                        setOpen(true)
                        setSeverity("success")
                        let toastMessage = !formId ? "Your form has been saved successfully" : "Your form has been updated successfully";
                        setToastrMessage(toastMessage);
                        navigate(`/${userLocalData.getvalue('clientName')}/letter/forms/list`);
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                    // alert('Error occurred.', 'error');
                });

        }
        catch (e) {
            // console.log(e)
            setOpen(true)
            setSeverity("error")
            setToastrMessage("Failed to save form")
        }
    }

    const handleCancel = () => {
        navigate(`/${userLocalData.getvalue('clientName')}/letter/forms/list`);
    }

    useEffect(() => {
        const fetchFormData = async () => {
            try {
                let postData = { "action": "get", "form_id": formId, userid: userLocalData.getvalue('recrId'), clientId: userLocalData.getvalue('clientId') }
                // let response = await ApiService.displayFormData(postData)
                ApiService.postWithData('admin', 'sequenceFormBuilder', postData)
                    .then((response: any) => {

                        let form_name = response.data?.form_name;
                        setFormName(form_name);
                        let parsedData = response.data.json.components;
                        setFormData(parsedData);
                        setIsLoaded(true);
                        // console.log(response, 'fg', response.data.json.components);
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                        // alert('Error occurred.', 'error');
                    });

            }
            catch (e) {
                setIsLoaded(true)
            }
        }
        if (formId) {
            fetchFormData()
        }
        else {
            setIsLoaded(true)
        }

    }, [formId])

    return (
        // <Grid container sx={{ alignItems: "center", justifyContent: "center" }} className="main-body">
        // </Grid>
        (<Grid sx={{ display: 'flex' }} className='formBuilder jobFormBuilder'>
            {/* <nav>
                <Link to="/login">Logout</Link>
            </nav> */}
            <Grid sx={{ flexGrow: 1 }}>
                <Grid>
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
                                className="form-name-text"
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
                            <Header />
                        </Box>
                        <Box className='d-flex'>
                            <Button size="small" variant='contained' color='primary' className="form-action-btn" sx={{ mr: 1 }} onClick={saveData} disabled={formData.length === 0}>{formId ? "Update" : "Save"}</Button>
                            <Button size="small" variant='outlined' color='secondary' className="form-action-btn" onClick={handleCancel}>Cancel</Button>
                        </Box>
                    </Grid>
                </Grid>

                <div className='mainForm'>
                    {
                        isLoaded ?
                            <DndProvider backend={HTML5Backend} >
                                <ScrollingComponent >
                                    {formData && formData?.map((form: any, i: any) => renderCard(form, i))}
                                </ScrollingComponent>
                            </DndProvider> :
                            <div>
                                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "80%" }}><CircularProgress /></Box>
                            </div>
                    }

                    <InsertMenuModalComponent openInsertModal={isInsertMenuModal} closeInsertModal={closeInsertModal} createdFields={formData} addElement={addFormElement} />

                    <Snackbar onClose={() => setOpen(false)}
                        anchorOrigin={{ vertical, horizontal }}

                        key={vertical + horizontal}
                        open={toaster}
                        autoHideDuration={4000}
                    >
                        {
                            (<Alert severity={severityError}>{toastrMessage}</Alert>)

                        }

                    </Snackbar>
                </div>
            </Grid>
        </Grid>)
    );


}

export default JobFormContainer;