import {useContext } from 'react';
import { useState, useEffect } from '../../../../../../shared/modules/React';
// import Accordion from '@mui/material/Accordion';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import AccordionSummary from '@mui/material/AccordionSummary';
import {Button, Grid} from '../../../../../../shared/modules/commonImports';
// import Checkbox from '@mui/material/Checkbox';
import {Divider} from '../../../../../../shared/modules/MaterialImports/Divider';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
// import CloseIcon from '@mui/icons-material/Close';
// import InfoIcon from '@mui/icons-material/Info';
// import AddIcon from '@mui/icons-material/Add';
// import Chip from '@mui/material/Chip';
// import TextField from '@mui/material/TextField';
import { Dialog as ReactDialog } from 'primereact/dialog';
// import { confirmDialog } from "../../../../../../components/shared/ConfirmDialog/ConfirmDialog"
import './AIMagicWand.scss';
import { showToaster } from "../../../../../shared/SnackBar/SnackBar";
// import { trackPromise } from 'react-promise-tracker';
import ApiService from "../../../../../../shared/api/api";
import { userLocalData } from "../../../../../../shared/services/userData";
// import DoneIcon from '@mui/icons-material/Done';
import GenerateMagicWand from './GenerateMagicWand';
import {Box} from "../../../../../../shared/modules/MaterialImports/Box";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
// import AIFormView from './AIFormView';
import { useParams } from 'react-router-dom';
import FormContainer1 from '../forms/FormContainer1'
import { FormStore } from '../../../../../../App';



interface AIMagicWandProps {
    open: boolean;
    closePopup: any;
    AIFormID: any;
}


const AIMagicWand = ({
    open,
    closePopup,
    AIFormID
}: AIMagicWandProps) => {
    // const [expandedd, setExpandedd] = useState<ExpandedState>({});
    const [showAIMagicWand, setShowAIMagicWand] = useState(true);

    const [showManual, setShowManual] = useState(true);

    const [viewQuestions, setViewQuestions] = useState<any>([]);


    // const navigate = useNavigate();
    const [formName, setFormName] = useState("");
    const { formId } = useParams();
    const [isLoaded, setIsLoaded] = useState(false);
    const [formData, setFormData] = useContext(FormStore);
    // const { formData, setFormData } = useFormBuilderStore(formBuilderSelector, shallow);

    const saveData = async (data: any, name: string) => {
        // console.log(data)
        let updatedData = data.map((item: any, index: number) => ({
            ...item,
            isActive: index === 0
        }));

        let postData: any = {
            "action": "save",
            "form_name": name,
            "json": {
                components: updatedData,
                curately: true
            },
            "userid": userLocalData.getvalue('recrId'),
            "webFormDesc": "",
            "webformThankContent": "",
            "clientId": userLocalData.getvalue('clientId')
        }
        // console.log(updatedData);

        postData.aliasName = postData.form_name.charAt(0);
        // postData.form_name = "curately_" + formName
        postData.form_name = name;
        if (formId) {
            postData.form_id = formId;
        }
        // let resp = await apiService.saveFormData(postData)
        ApiService.postWithData('admin', 'sequenceFormBuilder', postData)
            .then((response: any) => {
                if (response.data) {
                    let toastMessage = !formId ? "Your form has been saved successfully" : "Your form has been updated successfully";
                    showToaster(toastMessage, 'success');
                    //  navigate(`/${userLocalData.getvalue('clientName')}/letter/forms/list`);
                    closePopup(true);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                // alert('Error occurred.', 'error');
            });

    }


    useEffect(() => {
        const fetchFormData = async () => {
            let postData = { "action": "get", "form_id": formId, userid: userLocalData.getvalue('recrId'), clientId: userLocalData.getvalue('clientId') }
            // let response = await ApiService.displayFormData(postData)
            ApiService.postWithData('admin', 'sequenceFormBuilder', postData)
                .then((response: any) => {

                    let form_name = response.data?.form_name;
                    setFormName(form_name);
                    let parsedData = response.data.json.components;
                    let updatedData = parsedData.map((item: any, index: number) => ({
                        ...item,
                        isActive: index === 0
                    }));
                    setFormData(updatedData);
                    setIsLoaded(true);
                    // console.log(response, 'fg', response.data.json.components);
                })
                .catch((error) => {
                    console.error("Error:", error);
                    // alert('Error occurred.', 'error');
                    setIsLoaded(true)
                });


        }
        if (formId) {
            fetchFormData()
        }
        else {
            setIsLoaded(true)
        }


        return () => {
            setFormData([]);
        }

    }, [formId]);


    const handleShowManual = () => {
        //setFormData();
        setShowManual(true);
        setShowAIMagicWand(false);
    }
    // const handleHideAIMagicWand = () => {
    //     setShowAIMagicWand(false);
    //     setShowManual(false);
    // }
    const handleShowAIMagicWand = () => {
        setShowAIMagicWand(true);
        setShowManual(false);
    }

    const handleReplaceQuestions = (bodyContent: any) => {
        //   setShowReplaceEmailDialog(false); 
        // setViewQuestions(bodyContent);
        //   console.log("bodyContent");
        //   console.log(bodyContent);
        //  console.log(" =====" + viewQuestions);
        setShowManual(true);
        const arrayQuestions = bodyContent.filter((quiz: any) => quiz.checkStatus === true);
        //   console.log(arrayQuestions);
        setViewQuestions(arrayQuestions);

        //  console.log(" =====" + viewQuestions);
    };


    const header = (
        <div className="inline-flex align-items-center justify-content-between   top-0 wandHeader"  >
            <Grid container alignItems="center"  >
                <Grid >
                    <DragIndicatorIcon fontSize="medium" sx={{ paddingLeft: '5px' }} />
                </Grid>

                <Grid style={{ flexGrow: 1, textAlign: 'left' }}>
                    <h4 className="ai-dialog-title">Create New Form</h4>
                </Grid>
                <Grid style={{ textAlign: 'right' }}>
                    <Grid container direction="row" className='mt-1 mb-1'>
                        {/* {!showAIMagicWand && <Button variant="contained" className="btnPrimary mr-3" size="small" onClick={handleShowAIMagicWand} ><AutoFixHighOutlinedIcon fontSize="small" className='mr-1' /> AI Magic Wand</Button>} */}
                        {/* <Button variant="contained" className="btnPrimary mr-3" size="small"  >Save</Button>
                        <Button variant="contained" className="btnPrimary mr-3" size="small"  >Preview</Button> */}
                        <Button variant="outlined" className="btnPrimary" size="small" onClick={() => closePopup(false)}  >Cancel</Button>

                    </Grid>
                </Grid>
            </Grid>
        </div>
    );

    return (
        <ReactDialog className='AIMagicWand'
            header={header}
            visible={open}
            onHide={() => closePopup(false)}
            position="center"
            modal={false}
            closable={false}
        >

            <Grid container alignItems="center" className='dialogbody' >
                <Grid size={showAIMagicWand ? 8 : 12} className='dialogborder'>
                    {/* <Grid container direction='row' style={{ justifyContent: 'flex-start', verticalAlign: 'top', paddingTop: "5px", paddingBottom: "3px" }}>
                            <Grid >
                                <DragIndicatorIcon fontSize="medium" sx={{ paddingLeft: '5px', }} />
                            </Grid>

                            <Grid style={{ textAlign: 'left' }}>

                                <TextField id="standard-basic" size='small' variant="standard" placeholder='Form Title' />
                            </Grid>
                        </Grid>
                        <Divider />
  */}
                    {(!showManual) ?
                        <Grid container style={{ justifyContent: 'center', verticalAlign: 'middle', alignItems: 'baseline', padding: '10%' }}>
                            <Grid container style={{ justifyContent: 'center', alignItems: 'base-line' }}>
                                <Box className="task_box_main" sx={{ cursor: "pointer" }} >
                                    <Grid container style={{ justifyContent: 'center', alignItems: 'base-line' }}>
                                        <Box className="task_box_sub" onClick={handleShowManual}>
                                            <div>
                                                <span className="taskTask">  <ControlPointIcon className='task_icon ' /></span>  <span className="taskTask"> Add an Element</span>
                                            </div>
                                            <div  >
                                                <span className={`categorySpan`}>To start creating your form manually. </span>
                                            </div>
                                        </Box>
                                    </Grid>

                                </Box>
                                <Grid container style={{ justifyContent: 'center', alignItems: 'base-line', padding: '5px' }}>OR</Grid>
                                <Box className="task_box_main" sx={{ cursor: "pointer" }} >
                                    <Grid container style={{ justifyContent: 'center', alignItems: 'base-line' }}>
                                        <Box className="task_box_sub" onClick={handleShowAIMagicWand}>
                                            <div>
                                                <span className="taskTask"> <AutoFixHighOutlinedIcon className='task_icon ' /> </span>  <span className="taskTask"> Try Magic Wand</span>
                                            </div>
                                            <div  >
                                                <span className={`categorySpan`}>An smart AI-Powered Quiz Generator, </span>
                                            </div>
                                        </Box>
                                    </Grid>

                                </Box>
                            </Grid>
                        </Grid>
                        :
                        <Grid container >
                            {/* <AIFormView viewQuestions={quizData} handleShowAIMagicWand={handleShowAIMagicWand} /> */}
                            {isLoaded ?
                                <FormContainer1 callParentSave={saveData} cancelClicked={() => closePopup(false)} formIdPassed={(formId) ? formId : ""} formNamePassed={formName} isFormBuilder={true} showSave={true} showCancel={showAIMagicWand} />
                                :
                                null
                            }
                        </Grid>
                    }
                </Grid>

                <Grid size={showAIMagicWand ? 4 : 0} className={`dialogborder ${showAIMagicWand ? '' : 'd-none'}`} >
                    <Grid container alignItems="center" style={{ position: 'relative', justifyContent: 'center', padding: "2px" }}>
                        <Grid >
                            <DragIndicatorIcon fontSize="medium" sx={{ paddingLeft: '5px' }} />
                        </Grid>
                        {/* <Grid >
                            <AutoFixHighOutlinedIcon fontSize="medium" sx={{ paddingLeft: '2px' }} />
                        </Grid> */}
                        <Grid style={{ flexGrow: 1, textAlign: 'center' }}>
                            <h4 className="ai-dialog-title">AI Magic Wand - Questions Generator</h4>
                        </Grid>
                        <Grid >
                            {/* <IconButton aria-label="close" onClick={handleHideAIMagicWand}>
                                    <CloseIcon fontSize="small" />
                                </IconButton> */}
                        </Grid>
                    </Grid>
                    <Divider />
                    <Grid container alignItems="center" style={{ position: 'relative' }}>
                        <GenerateMagicWand handleReplaceQuestions={handleReplaceQuestions} hideAI={showAIMagicWand} />
                    </Grid>
                </Grid>
            </Grid>
        </ReactDialog>
    );
};

export default AIMagicWand;
