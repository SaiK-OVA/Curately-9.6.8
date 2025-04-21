import { useEffect, useState } from "../../../../../shared/modules/React";
import { Button } from '../../../../../shared/modules/MaterialImports/Button';
import { Checkbox } from '../../../../../shared/modules/MaterialImports/FormElements';
import { Grid } from '../../../../../shared/modules/MaterialImports/Grid';
import { Stack } from '../../../../../shared/modules/MaterialImports/Stack';
import { TextField, FormControlLabel } from '../../../../../shared/modules/MaterialImports/FormInputs';
import { Divider } from '../../../../../shared/modules/MaterialImports/Divider';
import { Typography } from '../../../../../shared/modules/MaterialImports/Typography';
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import ClearIcon from '@mui/icons-material/Clear';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '../../../../../shared/modules/MaterialImports/Dialog';
import { useParams } from "react-router-dom";
import { userLocalData } from "../../../../../shared/services/userData";
import { showToaster } from "../../../../shared/SnackBar/SnackBar";
import ApiService from '../../../../../shared/api/api';
import { trackPromise } from "../../../../../shared/modules/PromiseTrackter";

interface Criterion {
    matchCriteria: string;
    score: number;
    mustHave: boolean;
    position: number;
    jobId: number;
    createdBy: number;
}
type DescriptionOverViewData = {
    skill: {
        mainCategory: string;
        skill: string;
        subCategory: string;
    }[];
    searchstring: string[];
    jobtitle: string[];
    publicJobDescr: string;
}
const Criteria = ({ showAddCriteria, closePopup }: {
    showAddCriteria: boolean;
    closePopup: any;
}) => {
    // const EvalutionCriteria = [
    //     { name: 'Experience managing teams of 10+ people'},
    //     { name: 'Focused on account management in the last two roles'},
    //     { name: 'Proven track record of client communication excellence' },
    //     { name: 'Should have experience in the healthCare industry' },
    // ];

    const [criteria, setCriteria] = useState<Criterion[]>([]);
    // const [addCriteria, setAddCriteria] = useState([])
    const [descriptionOverView, setDescriptionOverView] = useState<DescriptionOverViewData>({
        publicJobDescr: "",
        jobtitle: [],
        searchstring: [],
        skill: []
    });

    const { jobId } = useParams();

    // const handleClear = (index: number) => {
    //     const updatedCriteria = [...criteria];
    //     updatedCriteria.splice(index, 1);  // Remove the item at the given index
    //     setCriteria(updatedCriteria);  // Update the state
    // };

    const handleDragEnd = (result: any) => {
        const { source, destination } = result;

        if (!destination || source.index === destination.index) {
            return;
        }
        const reordered = Array.from(criteria);
        const [removed] = reordered.splice(source.index, 1);
        reordered.splice(destination.index, 0, removed);

        setCriteria(reordered);
    };

    const handleAddCriterion = () => {
        const newCriterion: Criterion = {
            matchCriteria: '',
            score: 0,
            mustHave: false,
            position: criteria.length + 1,
            jobId: 0,
            createdBy: 0
        };
        setCriteria(prevCriteria => [...prevCriteria, newCriterion]);
    };

    const loadAddCr = () => {
        // https://qaadminapi.curately.ai/curatelyAdmin/getCriteriaEvaluationJob      
        ApiService.postWithData("admin", 'getCriteriaEvaluationJob', {
            jobId: 101,
            clientId: userLocalData.getvalue("clientId"),
        }).then(
            (response: any) => {
                console.log(response)
                if (response?.data?.Success) {
                    const fetchedCriteria = response?.data?.jobCriteriaEvaluations || [];
                    setCriteria(fetchedCriteria);
                } else {
                    showToaster(response?.data?.Message, 'error');
                }
            }
        )
    }

    // console.log(loadAddCr)
    const deleteCr = (id: number) => {
        // https://qaadminapi.curately.ai/curatelyAdmin/deleteCriteriaEvaluationJob
        ApiService.postWithData("admin", 'deleteCriteriaEvaluationJob', {
            jobCriteriaId: id,
            clientId: userLocalData.getvalue("clientId"),
            recrId: userLocalData.getvalue('recrId'),
        }).then(
            (response: any) => {
                if (response?.data?.Success) {
                    loadAddCr();
                    showToaster(response?.data?.Message, 'success');
                } else {
                    showToaster(response?.data?.Message, 'error');
                }
            }
        )
    }
    // https://qaadminapi.curately.ai/curatelyAdmin/saveOrUpdateCriteriaEvaluationJob
    const saveCriteria = () => {
        // if (Criteria.score === "") {
        //     showToaster("Please enter Talent Pool Name", "error");
        //     return false;
        // }
        trackPromise(
            ApiService.postWithData('admin', 'saveOrUpdateCriteriaEvaluationJob', {
                jobId: 2345,
                criteriaDetails: [],
                clientId: userLocalData.getvalue("clientId"),
                recrId: userLocalData.getvalue('recrId'),

            })
                .then(
                    (response: any) => {
                        // console.log(response.data);
                        if (response.data.Success) {
                            showToaster('Criteria has been saved successfully.', 'success');
                            // onSaveUpdatePool()
                            closePopup();
                            // addTalentPoolFormik.resetForm();
                        } else {
                            showToaster((response.data.Message) ? response.data.Message : 'An error occured', 'error')
                        }
                    })
        )

    }

    useEffect(() => {
        // https://adminapi.curately.ai/curatelyAdmin/getJobOverview/2129/3
        ApiService.getCall("admin", 'getJobOverview/' + jobId + '/' + userLocalData.getvalue('clientId'))

            .then((response) => {
                if (response.data?.List?.length) {
                    // console.log(response.data.List);
                    setDescriptionOverView({
                        publicJobDescr: (response.data.List[0]?.publicJobDescr) ? response.data.List[0].publicJobDescr.replace(/\n/g, '<br/>') : "",
                        jobtitle: (response.data.List[0]?.jobtitle && Array.isArray(response.data.List[0].jobtitle)) ? response.data.List[0].jobtitle
                            : [],
                        searchstring: (response.data.List[0]?.searchstring && Array.isArray(response.data.List[0].searchstring)) ? response.data.List[0].searchstring
                            : [],
                        skill: (response.data.List[0]?.skill && Array.isArray(response.data.List[0].skill)) ? response.data.List[0].skill
                            : []
                    });
                }
            });
    }, []);
    useEffect(() => {
        loadAddCr();
    }, [jobId])
    return (
        <Dialog open={showAddCriteria} onClose={() => closePopup(false)} maxWidth="lg" fullWidth>
            <DialogTitle className="py-2">
                <Grid container direction="row" justifyContent="space-between" alignItems="center">
                    <span className="addHeader">Add Criteria</span>
                    <CloseIcon onClick={() => closePopup(false)} />
                </Grid>
            </DialogTitle>
            <Divider />
            <DialogContent>
                <Grid container spacing={2} >
                    <Grid sx={{ width: 700, overflow: 'hidden' }}>
                        <Typography variant="h5" className='mb-2 pl-2' >Job Description</Typography>
                        {/* <Card className='mainCard'></Card> */}
                        <Divider className='mb-1' />
                        <div className='jobDescription pl-4'
                            // onContextMenu={handleContextMenu} 
                            dangerouslySetInnerHTML={{ __html: descriptionOverView.publicJobDescr }}></div>
                    </Grid>
                    <Divider orientation="vertical" flexItem sx={{ height: 'auto' }} />
                    <Grid sx={{ width: 'calc(100% - 710px)' }}>

                        <DragDropContext onDragEnd={handleDragEnd}>
                            {/* <div style={{ maxHeight: "300px", overflowY: "auto" }}> */}
                            <Droppable droppableId="droppable">
                                {(provided) => (
                                    <div ref={provided.innerRef} {...provided.droppableProps}>
                                        {criteria.map((item, index) => (
                                            <Draggable key={index} draggableId={index.toString()} index={index}>
                                                {(provided) => (
                                                    <Grid
                                                        container
                                                        size={12}
                                                        spacing={2}
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={{ marginBottom: '8px', ...provided.draggableProps.style }}
                                                    >
                                                        <Grid size={1} sx={{ marginTop: '25px' }}>
                                                            <Stack direction="row" alignItems="center">
                                                                <DragIndicatorIcon sx={{ marginTop: '5px' }} />
                                                                <b>{index + 1}</b>

                                                            </Stack>
                                                        </Grid>
                                                        <Grid size={6}>
                                                            <span className="addHeader">Match Criteria</span>
                                                            <TextField
                                                                sx={{ width: "100%" }}
                                                                size="small"
                                                                type="text"
                                                                value={item.matchCriteria}
                                                            />
                                                        </Grid>
                                                        <Grid size={1} className="mr-4 mt-4">
                                                            <FormControlLabel
                                                                control={<Checkbox />}
                                                                label=""
                                                                labelPlacement="start"
                                                                id="active"
                                                                name="active"
                                                            />
                                                        </Grid>
                                                        <Grid size={2}>
                                                            <span className="addHeader">Score</span>
                                                            <TextField
                                                                fullWidth
                                                                id="score"
                                                                name="score"
                                                                variant="outlined"
                                                                type="number"
                                                                size="small"
                                                                value={item.score}
                                                                placeholder="score" />
                                                        </Grid>
                                                        <Grid size={1} className="mt-4">
                                                            <ClearIcon
                                                                sx={{ fontSize: "16px", marginTop: "14px" }}
                                                                onClick={() => deleteCr(index)}
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
                {criteria.length < 5 && (
                    <Button variant="contained" onClick={handleAddCriterion}>+ Add Criteria</Button>
                )}
                <Button variant="contained" onClick={saveCriteria}>Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default Criteria;
