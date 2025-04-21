import { useEffect, useState } from "../../../../../../shared/modules/React";
import { Button } from '../../../../../../shared/modules/MaterialImports/Button';
import { Checkbox } from '../../../../../../shared/modules/MaterialImports/FormElements';
import { Grid } from '../../../../../../shared/modules/MaterialImports/Grid';
import { Stack } from '../../../../../../shared/modules/MaterialImports/Stack';
import { TextField, FormControlLabel } from '../../../../../../shared/modules/MaterialImports/FormInputs';
import { Divider } from '../../../../../../shared/modules/MaterialImports/Divider';
// import Typography from '@mui/material/Typography';
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import ClearIcon from '@mui/icons-material/Clear';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogTitle, DialogActions, DialogContent } from '../../../../../../shared/modules/MaterialImports/Dialog';
import { useParams } from "react-router-dom";
import { userLocalData } from "../../../../../../shared/services/userData";
import { showToaster } from "../../../../../shared/SnackBar/SnackBar";
import ApiService from '../../../../../../shared/api/api';
import { trackPromise } from "../../../../../../shared/modules/PromiseTrackter";
import { convert } from 'html-to-text';

// import { BorderAll, BorderBottom } from "@mui/icons-material";
import { useFormik, Yup } from "../../../../../../shared/modules/Formik";
// import Parsable from '../../../../../../shared/utils/Parsable';

import './CriteriaModal.scss';

const Criteria = ({ showAddCriteria, closePopup, jobDescription, criteriaData, saveOrUpdateCriteria }: {
    showAddCriteria: boolean;
    closePopup: any;
    jobDescription: string;
    criteriaData: any;
    saveOrUpdateCriteria: { (data: any): any }
}) => {

    const [jobCriteriaData, setJobCriteriaData] = useState<any>(null)

    const criteriaFormik = useFormik({
        initialValues: { criteria: [] },
        validationSchema: Yup.object().shape({
            criteria: Yup.array().of(
                Yup.object().shape({
                    match_criteria: Yup.string(),
                    score: Yup.number(),
                    must_have: Yup.boolean()
                })
            )
        }),
        onSubmit: () => { }
    })
    const { jobId } = useParams();



    const handleRegenerateCriteria = (criteriaData?: any) => {
 
        let payLoad: any = {
            jobId: jobId,
            clientId: userLocalData.getvalue("clientId"),
            recrId: userLocalData.getvalue('recrId'),
            jobDescription: convert(jobDescription),
        }
      
        trackPromise(
            ApiService.postWithData('admin', 'reRunCriteriaEvaluationJob', payLoad)
                .then(
                    (response: any) => {
                        if (response.data.Success) {
                            const fetchedCriteria = response?.data;
                            // if (fetchedCriteria?.criteria && Parsable.isJSON(fetchedCriteria.criteria)) {
                            //     setJobCriteriaData({ ...fetchedCriteria, criteria: JSON.parse(fetchedCriteria.criteria) });
                            // }
                            const fetchedReCriteria = JSON.parse(fetchedCriteria.criteria);
                            const tempCriteriaData = fetchedReCriteria?.map((each: any) => ({
                                ...each,
                                must_have: each.must_have === "True" ? true : each.must_have === "False" ? false : Boolean(each.must_have),
                                score: each.score ? each.score : fetchedReCriteria?.length > 0 ? 100 / fetchedReCriteria?.length : 0,
                            }))
                            criteriaFormik.setFieldValue("criteria", tempCriteriaData)
                       
                          //  showToaster('Job Criteria reRun successfully.', 'success');

                        } else {
                            showToaster((response.data.Message) ? response.data.Message : 'An error occured', 'error')
                        }
                    })
        )


    };

    const handleClear = (index: number) => {
        const updatedCriteria = [...criteriaFormik.values.criteria];
        updatedCriteria.splice(index, 1);  // Remove the item at the given index
        criteriaFormik.setFieldValue("criteria", updatedCriteria);  // Update the state
    };

    const handleDragEnd = (result: any) => {
        const { source, destination } = result;

        if (!destination || source.index === destination.index) {
            return;
        }
        const reordered = Array.from(criteriaFormik.values.criteria);
        const [removed] = reordered.splice(source.index, 1);
        reordered.splice(destination.index, 0, removed);
        criteriaFormik.setFieldValue("criteria", reordered);
    };

    const handleAddCriterion = () => {
        const { criteria } = criteriaFormik.values;
        criteriaFormik.setFieldValue("criteria", [...criteria, { match_criteria: "", score: 0, must_have: false }])
    };

    // console.log(loadAddCr)
    const deleteCr = (id: number) => {
        // https://qaadminapi.curately.ai/curatelyAdmin/deleteCriteriaEvaluationJob
        // ApiService.postWithData("admin", 'deleteCriteriaEvaluationJob', {
        //     jobCriteriaId: id,
        //     clientId: userLocalData.getvalue("clientId"),
        //     recrId: userLocalData.getvalue('recrId'),
        // }).then(
        //     (response: any) => {
        //         if (response?.data?.Success) {
        //             loadAddCr();
        //             showToaster(response?.data?.Message, 'success');
        //         } else {
        //             showToaster(response?.data?.Message, 'error');
        //         }
        //     }
        // )

    }

    useEffect(() => {
        handleCriteriaData();
    }, [criteriaData]);

    const handleCriteriaData = () => {
        if (!!criteriaData?.length) {
            const tempCriteriaData = criteriaData.map((each: any) => ({
                ...each,
                must_have: each.must_have === "True" ? true : each.must_have === "False" ? false : Boolean(each.must_have),
                score: each.score ? each.score : criteriaData?.length > 0 ? 100 / criteriaData?.length : 0,
            }))
            criteriaFormik.setFieldValue("criteria", tempCriteriaData)
        }
    } 
    
    const handleSaveOrUpdate = () => {
        const { criteria } = criteriaFormik.values;
        const condArr = ["", null, undefined, 0];
        if (!!criteria?.length) {

            const isAllCriteriaValid = criteria.every((each: any) => {
                let isMatchCriteriaValid = false, isScoreValid = false;

                if (condArr.includes(each.score)) {
                    showToaster("Score is required", "error");
                    isScoreValid = false;
                } else isScoreValid = true;

                if (condArr.includes(each.match_criteria)) {
                    showToaster("Match criteria is required", "error");
                    isMatchCriteriaValid = false;
                } else isMatchCriteriaValid = true;

                return (isMatchCriteriaValid && isScoreValid);
            });

            const overallScore = criteria.reduce((total, item: any) =>
                total + parseFloat(item.score), 0);

            if (isAllCriteriaValid) {
                if (overallScore === 100) {
                    saveOrUpdateCriteria(criteria);
                } else {
                    showToaster("Overall score must be equal to 100", "error")
                }
            }

        } else showToaster("Please add atleast one criteria", "error");
    }

    return (
        <div id="CriterialModal">
            <Dialog open={showAddCriteria} onClose={() => closePopup(false)} maxWidth="lg" fullWidth>
                <DialogTitle className="py-2">
                    <Grid container direction="row" justifyContent="space-between" alignItems="center">
                        <span className="addHeader">{!showAddCriteria ? "Add" : "Edit"} Criteria</span>
                        <CloseIcon onClick={() => closePopup(false)} />
                    </Grid>
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <Grid container size={12} sx={{ p: 0, m: 0 }}>
                        <Grid size={6} sx={{ overflow: 'hidden' }}  >
                            <span className='addHeader  p-2' >Job Description</span>
                            <Divider className='mb-1 mt-1' />
                            <div className='jobDescription pl-1 pr-0 ql-editor' style={{ minHeight: "300px", height: "460px", maxHeight: "100%", overflowY: "auto" }}
                                // onContextMenu={handleContextMenu} 
                                dangerouslySetInnerHTML={{ __html: jobDescription }}></div>
                        </Grid>

                        <Divider orientation="vertical" flexItem sx={{ height: 'auto', pr: 2 }} />

                        <Grid size={5} sx={{ pl: 2 }} >

                            <Grid
                                container
                                size={12}
                                spacing={1}
                                style={{ marginBottom: '4px' }}
                            >
                                <Grid size={1} className="  mr-2 " >
                                    <span className="addHeader1"></span>
                                </Grid>
                                <Grid size={6} className="   mr-2 " >
                                    <span className="addHeader1">Match Criteria</span>

                                </Grid>
                                <Grid size={2} className="  mr-1 " >
                                    <span className="addHeader1">Must Have</span>
                                </Grid>
                                <Grid size={2} className="   mr-2 " >
                                    <span className="addHeader1">Score</span>

                                </Grid>
                                <Grid size={1} className=" " >

                                </Grid>
                            </Grid>
                            <DragDropContext onDragEnd={handleDragEnd}>
                                {/* <div style={{ maxHeight: "300px", overflowY: "auto" }}> */}
                                <Droppable droppableId="droppable" >
                                    {(provided) => (
                                        <div ref={provided.innerRef} {...provided.droppableProps}>
                                            {criteriaFormik.values.criteria.map((item: any, index) => (
                                                <Draggable key={index} draggableId={index.toString()} index={index}  >
                                                    {(provided) => (
                                                        <Grid
                                                            container
                                                            className="boxRow"
                                                            size={12}
                                                            spacing={1}
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            style={{ marginBottom: '4px', ...provided.draggableProps.style }}
                                                        >
                                                            <Grid size={1} className=" mr-3 " >
                                                                <Stack direction="row" alignItems="center" mt={"8px"}>
                                                                    <DragIndicatorIcon />
                                                                    {index + 1}
                                                                </Stack>
                                                            </Grid>
                                                            <Grid size={6} className=" mr-0 " >
                                                                <TextField
                                                                    sx={{ width: "100%", maxHeight: "auto" }}
                                                                    size="small"
                                                                    type="text"
                                                                    value={item.match_criteria}
                                                                    name={`criteria[${index}].match_criteria`}
                                                                    id={`criteria[${index}].match_criteria`}
                                                                    onChange={criteriaFormik.handleChange}
                                                                    multiline
                                                                />
                                                            </Grid>
                                                            <Grid size={2} className=" mr-1 " >
                                                                <FormControlLabel
                                                                    control={<Checkbox checked={item.must_have}
                                                                        onClick={(e: any) => {
                                                                            criteriaFormik.setFieldValue(`criteria[${index}].must_have`, e.target.checked)
                                                                        }}
                                                                    />}
                                                                    label=""
                                                                    labelPlacement="start"
                                                                    id="active"
                                                                    name="active"
                                                                />
                                                            </Grid>
                                                            <Grid size={1} className="  ml-0 mr-1 " >
                                                                <TextField
                                                                    fullWidth
                                                                    name={`criteria[${index}].score`}
                                                                    id={`criteria[${index}].score`}
                                                                    variant="outlined"
                                                                    type="number"
                                                                    size="small"
                                                                    sx={{ width: '50px' }}
                                                                    value={item.score}
                                                                    placeholder="score"
                                                                    onChange={criteriaFormik.handleChange}
                                                                />
                                                            </Grid>
                                                            <Grid size={1} className="  ml-3  mr-0 " >
                                                                <ClearIcon
                                                                    sx={{ fontSize: "18px", marginTop: "10px", cursor: "pointer" }}
                                                                    onClick={() => handleClear(index)}
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                                {/* // </div> */}
                            </DragDropContext>
                        </Grid>
                    </Grid>

                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleRegenerateCriteria}>Re-Generate</Button>
                    {criteriaFormik.values.criteria.length < 5 && (
                        <Button variant="contained" className="secondary" onClick={handleAddCriterion}>+ Add Criteria</Button>
                    )}
                    <Button variant="contained" onClick={handleSaveOrUpdate}>{!showAddCriteria ? "Save" : "Update"}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Criteria;
