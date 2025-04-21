//import Box from '@mui/material/Box';
//import Typography from '@mui/material/Typography';
import { useContext} from 'react';
import {useEffect, useState } from '../../../../../../shared/modules/React';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import InsertMenuModalComponent from '../shared/modal/InsertMenuModalComponent';
import PreviewComponent from '../Preview/PreviewNew';

// import { FormStore } from "../../../../../../App";
// import { shallow } from 'zustand/shallow';


// const formBuilderSelector = (state: FORMBUILDER_STATE) => ({
//     formData: state.formData,
//     setFormData: state.setFormData
// });

// import EmbedImage from '../../../shared/modal/EmbedImage';
// import EmbedVideo from '../../../shared/modal/EmbedVideo';
// import EmbedAudio from '../../../shared/modal/EmbedAudio';
// import EmbedAnything from '../../../shared/modal/EmbedAnything';
import EmbedModal from '../shared/modal/EmbedModal';
import {Tooltip} from '../../../../../../shared/modules/MaterialImports/ToolTip';
import {Grid, Button} from '../../../../../../shared/modules/commonImports';
import {Divider} from '../../../../../../shared/modules/MaterialImports/Divider';
import CloseIcon from '@mui/icons-material/Close';
// import { trackPromise } from 'react-promise-tracker';
// import ApiService from '../../../../../../shared/api/api';

import { useParams } from "react-router-dom";
// import { userLocalData } from '../../../../../../shared/services/userData';
// import { showToaster } from '../../../../../shared/SnackBar/SnackBar';
import { v4 as uuidv4 } from 'uuid';
import { FormStore } from '../../../../../../App';
import { trackPromise } from "../../../../../../shared/modules/PromiseTrackter";
import ApiService from "../../../../../../shared/api/api";
import { userLocalData } from '../../../../../../shared/services/userData';
import Parsable from '../../../../../../shared/utils/Parsable';
import {FormControlLabel} from '../../../../../../shared/modules/MaterialImports/FormInputs';
import {Checkbox} from '../../../../../../shared/modules/MaterialImports/FormElements';
import { Dialog, DialogActions, DialogTitle, DialogContent } from '../../../../../../shared/modules/MaterialImports/Dialog';
// import useFormBuilderStore, { FORMBUILDER_STATE } from '../../../../../../shared/store/FormBuilderStore';

//import IconButton from '@mui/material/IconButton';


// const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
//     <Tooltip
//         {...props}
//         classes={{ popper: className }}
//         arrow
//     />
// ))(({ theme }) => ({
//     [`& .${tooltipClasses.arrow}`]: {
//         color: "#000000",
//     },
//     [`& .${tooltipClasses.tooltip}`]: {
//         backgroundColor: "#000000",
//         color: "#ffffff",
//         fontSize: "13px",
//         fontFamily: "Segoe UI",
//         fontWeight: "600",
//     },
// }));



const Header = ({ id, setFocusId, customFields }: { id?: any, setFocusId?: any, customFields?: boolean }) => {
    const { formId } = useParams();

    // const [propsData, setPropsData] = useContext(Store)
    const [formData, setFormData] = useContext(FormStore);
    // const { formData, setFormData } = useFormBuilderStore(formBuilderSelector, shallow);
    const [isInsertMenuModal, setIsInsertMenuModal] = useState(false)
    const [createdFields, setCreatedFields] = useState<any[]>([])
    const [scrollId, setScrolId] = useState<any>(null)
    const [isStateChanged, setStateChange] = useState(false)

    const [openPreview, setOpenPreview] = useState(false);
    const [formName, setFormName] = useState("");
    // const [setFormId] = useState("");
    const [customFieldsData, setCustomFieldsData] = useState([]);
    const [openCustomList, setOpenCustomList] = useState(false)
    const [checkedFields, setCheckedFields] = useState<string[]>([]);


    const onClickInsert = () => {
        setIsInsertMenuModal(true)
        sessionStorage.setItem("isFromHeader", "true")
    }

    const closeInsertModal = (flag: boolean) => {
        setIsInsertMenuModal(flag)
    }






    // const [isPreview, setIsPreview] = useState(false)
    // const trimSpaces = (string: any) => {
    //     return string
    //         .replace(/&nbsp;/g, '')
    //         .replace(/&amp;/g, '&')
    //         .replace(/&gt;/g, '>')
    //         .replace(/&lt;/g, '<')
    // }

    // const onClickPreview = () => {
    //     console.log("isCalling")
    //     // let characters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "M", "N"]

    //     // let formFields = [...formData]

    //     formData.forEach((formVal: any) => {
    //         if (formVal.fieldType === "multiplechoice") {
    //             // console.log(formVal, 'formVal')
    //             if (formVal.choices.length) {
    //                 formVal.choices.forEach((choice: any, index: number) => {
    //                     choice.value = trimSpaces(choice.value)
    //                 })

    //             }
    //         }
    //         if (formVal.actVal) {
    //             formVal.actVal = ""
    //         }
    //     })
    //     setFormData([...formData])


    //     // setIsPreview(true)
    //     setPropsData((prevPropsData: any) => ({
    //         ...prevPropsData,
    //         isPreview: true,
    //     }))

    //     sessionStorage.setItem("isPreview", "true")
    // }


    const insert = (arr: any, index: any, newItem: any) => [
        ...arr.slice(0, index + arr.length),
        newItem,
        ...arr.slice(index + arr.length),
    ]



    const addElement = (type: any, index: any) => {
        // console.log("is calling header")
        formData.forEach((form: any) => {
            form.isActive = false;
        })
        // console.log(type);
        let formFields: any[];
        const obj = { ...type };

        // obj.id = formData.length;
        obj.id = uuidv4();

        obj.labelName = '';
        obj.isActive = true;
        obj.description = '';
        if (obj.hasOwnProperty("labelValue")) {
            obj.labelValue = ""
        }

        if (obj.fieldType === "multiplechoice") {
            obj.choices = [{ id: 1 + obj.id, character: "A", value: "Choice 1" }]
        }

        if (obj.fieldType === "weightedmultiplechoice") {
            obj.choices = [{ id: 1 + obj.id, character: "A", value: "Choice 1" }]
        }

        if (obj.fieldType === "conditionallogic") {
            formFields = insert(formData, formData.length, obj)
            setScrolId(`${formData.length + 1}comp${formData.length}`)
        }
        else {
            formFields = insert(formData, 0, obj)
            setScrolId(`${formData.length + 1}comp${formData.length}`)
            // setScrolId(`1comp0`)
        }

        // let indexObj = { val: 0 }

        // setFocusIndex(indexObj)

        // let id = 0;
        formFields?.forEach((item: any, index: any) => {
            if (!item.id) {
                item.id = uuidv4();
            }
        })
        // console.log('formFields', formFields);

        // setCreatedFields([...formFields])
        setFormData([...formFields]);

        setStateChange((prevState) => !prevState)
        setFocusId(obj.id)

    }


    useEffect(() => {

        if (document.getElementById(scrollId)) {
            const element: any = document.getElementById(scrollId);
            element.scrollIntoView({
                block: 'end',
                behavior: 'smooth',
            });
        }

    }, [scrollId, isStateChanged]);

    const handleeClosePreviewPopup = () => {
        setOpenPreview(false);
        // getList();
    };

    const handleCloseCustomList = () => {
        setOpenCustomList(false)
    }

    const getFormDetails = async (id: any) => {
        // setFormId(id);

        setOpenPreview(true);
        console.log(id)
        // let postData = { "action": "get", "form_id": id, userid: userLocalData.getvalue('recrId'), clientId: userLocalData.getvalue('clientId') }
        // try {
        //     // let response = await ApiService.displayFormData(postData);
        //     trackPromise(
        //         ApiService.postWithData('233seq', 'DemoSequence/formBuilder', postData)
        //             .then((response: any) => {
        //                 // console.log(response.data);
        //                 if (response?.data?.form_name) {
        //                     // && response?.data?.form_name.startsWith("curately_")) {
        //                     setFormData((response?.data?.json?.components) ? response?.data?.json?.components : []);
        //                     setFormName((response?.data?.form_name) ? response?.data?.form_name : "")
        //                     setOpenPreview(true);
        //                     // let parsedData = JSON.parse(response.data.json);
        //                 } else {
        //                     showToaster('Json not matching', 'error');
        //                 }
        //             })
        //             .catch((error) => {
        //                 console.error(error);
        //                 // alert('Error occurred.', 'error');
        //             })
        //     )
        // }
        // catch (e) {

        // }

    }

    const onClickCustomFields = () => {
        trackPromise(
            ApiService.getById(214, 'getCustomSettingsById', '20002' + "/" + userLocalData.getvalue('clientId'))
                .then((response: any) => {
                    if (response.data?.Success) {
                        // console.log(response.data.list);
                        if (response.data?.list?.length && Parsable.isJSON(response.data.list[0].json)) {
                            let tempArry = JSON.parse(response.data.list[0].json);
                            // console.log(tempArry);

                            tempArry = tempArry.filter((item: { fieldType: string }) => !['conditionallogic', 'label', 'divider', 'displaytext', 'pagebreak'].includes(item.fieldType));

                            setCustomFieldsData(tempArry)
                        }
                    }
                    setOpenCustomList(true)
                })
        )
    }

    const handleCheckedFields = (e: any, id: string) => {
        if (e.target.checked) {
            setCheckedFields(prevState => [
                ...prevState,
                id
            ])
        }
    }

    const handleAddCustomFields = () => {
        formData.forEach((form: any) => {
            form.isActive = false;
        })

        const filteredArry = customFieldsData.filter((item: any) =>
            checkedFields.includes(item.id)
        )
        
        let objId = "";
        const arryWithCustomId = filteredArry.map((item: any, i: number) => {
            objId = 'customField_' + item.id;
            return ({ 
                ...item, 
                id: 'customField_' + item.id,
                isActive: i === (filteredArry.length - 1) ? true : false,
            }) 
        });
        
        setFormData([...formData, ...arryWithCustomId])
        setOpenCustomList(false);
        setFocusId(objId)
        setCheckedFields([])
    }

    return (
        <>

            {customFields && <Grid className='add-custom-fields' sx={{ position: 'absolute', left: 'calc(50% - 190px)' }}>
                <Tooltip title="Add Questions from the Custom field" onClick={onClickCustomFields}>
                    <Button size='small'
                        sx={{ backgroundColor: "rgb(246 241 248)", height: '29px', textTransform: "initial" }}>
                        Custom Fields
                    </Button>
                </Tooltip>

            </Grid>
            }
            <Grid container spacing={6}>
                <Grid size={4}>

                    <Tooltip title="Add new question" onClick={onClickInsert}>
                        <Button size='small'
                            sx={{ backgroundColor: "rgb(246 241 248)", }}>
                            <AddIcon
                                sx={{
                                    fontFamily: "Segoe UI",
                                    fontWeight: "400",
                                    // backgroundColor: "rgb(246 241 248)", 
                                    minWidth: "40px",
                                }} />
                        </Button>
                    </Tooltip>
                    {/* </Box> */}
                </Grid>
                <Grid size={4}>

                    <Tooltip title="Preview"

                        onClick={() => getFormDetails(formId)}

                    >
                        <Button size='small'
                            // className='d-none'
                            sx={{ backgroundColor: "rgb(246 241 248)", }}
                            disabled={!Boolean(formData.length)}
                        >
                            <VisibilityIcon
                                sx={{
                                    fontFamily: "Segoe UI",
                                    fontWeight: "400",
                                    // backgroundColor: "rgb(246 241 248)", 
                                    minWidth: "40px",
                                }} />
                        </Button>
                    </Tooltip>
                    {/* </Box> */}
                </Grid>
            </Grid>



            <InsertMenuModalComponent openInsertModal={isInsertMenuModal} closeInsertModal={closeInsertModal} createdFields={createdFields} addElement={addElement} />
            <EmbedModal />


            <Dialog open={openPreview} onClose={handleeClosePreviewPopup} className='formBuilder Instructions' fullWidth maxWidth={'xl'}>
                <DialogTitle
                    className='py-2'
                >
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <span>
                            {formName}
                        </span>
                        <span onClick={handleeClosePreviewPopup} className="closePopup">
                            <CloseIcon />
                        </span>
                    </Grid>
                </DialogTitle>
                <Divider />
                <DialogContent sx={{ p: 0 }}>
                    {
                        <PreviewComponent formId={""} formNamePassed={formName} isPreview={true} saveCandidateData={""} isShowOneByOne={true} />
                    }
                </DialogContent>
            </Dialog>


            <Dialog open={openCustomList} onClose={handleCloseCustomList} className='formBuilder' fullWidth maxWidth={'sm'}>
                <DialogTitle
                    className='py-2'
                >
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <span>
                            Custom Fields
                        </span>
                        <span onClick={handleCloseCustomList} className="closePopup">
                            <CloseIcon />
                        </span>
                    </Grid>
                </DialogTitle>
                <Divider />
                <DialogContent sx={{ p: 0 }}>
                    {customFieldsData.map((item: any) => (
                        <Grid sx={{ px: '25px' }}>
                            <FormControlLabel control={
                                <Checkbox
                                    onChange={(e: any) => handleCheckedFields(e, item.id)}
                                />
                            } label={item.labelName} />
                        </Grid>
                    ))
                    }
                </DialogContent>
                <Divider />
                <DialogActions>
                    <Button variant="outlined" type='button' color="secondary" className='ml-2' onClick={handleCloseCustomList}>Cancel</Button>
                    <Button variant='contained' type='button' color="primary" className='ml-2' onClick={handleAddCustomFields}>Add</Button>
                </DialogActions>
            </Dialog>

        </>
    )
}

export default Header