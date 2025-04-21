import React, { useState, useEffect, useContext, useRef } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { MUIAutoComplete } from "../../../../../shared/MUIAutoComplete/MUIAutoComplete";
import { Accordion, AccordionSummary, AccordionDetails, Checkbox } from '@mui/material';
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import './AIFormView.scss';
import { userLocalData } from '../../../../../../shared/services/userData';
import Grid from '@mui/material/Grid2';
import Button from "@mui/material/Button";
import Divider from '@mui/material/Divider';
import MenuItem from "@mui/material/MenuItem";
import { trackPromise } from "react-promise-tracker";
import ApiService from '../../../../../../shared/api/api';
import Radio from '@mui/material/Radio';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { showToaster } from '../../../../../shared/SnackBar/SnackBar';
import * as Yup from "yup";
import CloseIcon from '@mui/icons-material/Close';
import ButtonGroup from '@mui/material/ButtonGroup';
import AddIcon from '@mui/icons-material/Add';
import Box from "@mui/material/Box";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import RemoveIcon from '@mui/icons-material/Remove';
import { FormStore } from '../../../../../../App';

const AIFormView = ({ viewQuestions }: { viewQuestions: any; }) => {
    const [showAIMagicWand, setShowAIMagicWand] = useState(false);
    const [questionExpanded, setQuestionExpanded] = useState(false);

    const [formData, setFormData] = useContext(FormStore);
    const [questionViewList, setQuestionViewList] = useState<any>([]);

    // const handleQuestionAccordionChange = (panel: any) => (event, isExpanded) => {
    //     setQuestionExpanded(isExpanded ? panel : false);
    // };

    // useEffect(() => {
    //     const updatedData = quizData.map((row: any) => {
    //       //  if (row.checkStatus) {
    //             return { ...row };
    //       //  }
    //     });
    //     setQuestionViewList(updatedData); 
    // }, [quizData, quizData.length]);

    return (
        (<div className='AIFormView'>
            <Grid container spacing={0} sx={{ width: '100%' }}>
                <hr style={{ height: "2px" }} />
                {formData.length && formData.map((question: any, qIndex: number) => (
                    (<div className='customCard'>
                        <Grid spacing={1} sx={{ width: '100%' }} size={12}>
                            <Typography
                                
                                style={{ fontWeight: 'bold', fontSize: '14px', flexGrow: 1 }}
                            >
                                {qIndex + 1 + ') ' + question.labelName}
                            </Typography>
                        </Grid>
                        <Grid spacing={1} sx={{ width: '100%', padding:"5px" }} size={12}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>

                                {question?.choices && question?.choices?.map((choice: any, cIndex: number) => (
                                    <Typography key={cIndex} style={{ fontSize: '14px' }} className={`${(choice.value == question.weightedCorrectAnswer) ? 'ansColor' : ''}`} >
                                        {choice.character + ') ' + choice.value}
                                    </Typography>
                                ))}

                            </div>
                        </Grid>
                    </div>)
                    // <Grid size={12} spacing={0} sx={{ width: '100%' }} className={`${question.checkStatus} ? '' : 'd-none'}`} key={qIndex}>
                    //     <Accordion expanded={questionExpanded === question.labelName} onChange={handleQuestionAccordionChange(question.labelName)}>
                    //         <AccordionSummary
                    //             expandIcon={<ExpandMoreIcon />}
                    //             aria-controls={`panel${qIndex}-content`}
                    //             id={`panel${qIndex}-header`}
                    //         >
                    //             <div style={{ display: 'flex', alignItems: 'center', flexGrow: 0 }}>

                    //                 <Typography
                    //                     variant="body1"
                    //                     style={{ fontWeight: '200px', fontSize: '13px', flexGrow: 1 }}
                    //                 >
                    //                     {qIndex + 1 + ') ' + question.labelName} - {question}
                    //                 </Typography>
                    //                 {/* <FormControlLabel
                    //                                         label=""
                    //                                             control={
                    //                                                 <Checkbox
                    //                                                     checked={question.checkStatus}
                    //                                                     onChange={handleCheckboxChange(question.id, qIndex)}
                    //                                                 />
                    //                                             }
                    //                                             style={{ marginRight: '0px', marginLeft: '2px'  }}
                    //                                         />  */}
                    //             </div>
                    //         </AccordionSummary>
                    //         <AccordionDetails>
                    //             <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>

                    //                 {question?.choices && question?.choices?.map((choice: any, cIndex: number) => (
                    //                     <Typography key={cIndex} style={{ fontSize: '13px' }}   >
                    //                         {choice.character + ') ' + choice.value}
                    //                     </Typography>
                    //                 ))}
                    //             </div>
                    //         </AccordionDetails>
                    //     </Accordion>
                    // </Grid>

                ))}
            </Grid>
        </div>)
    );
};
export default AIFormView;