import  { useState } from '../../../../../../shared/modules/React';
import {Grid, Button, TextField, FormControl} from '../../../../../../shared/modules/commonImports';
import {Divider} from '../../../../../../shared/modules/MaterialImports/Divider';
import {Dialog, DialogTitle, DialogContent} from "../../../../../../shared/modules/MaterialImports/Dialog";
import {MenuItem} from "../../../../../../shared/modules/MaterialImports/Menu";
import { MUIAutoComplete } from "../../../../../shared/MUIAutoComplete/MUIAutoComplete";
import './GeneratePopup.scss';
import QuizDialog from './QuestionsPopUp';
import ApiService from '../../../../../../shared/api/api';
import { trackPromise,
    //  usePromiseTracker 
    } from '../../../../../../shared/modules/PromiseTrackter';
import { userLocalData } from '../../../../../../shared/services/userData';
import { showToaster } from '../../../../../shared/SnackBar/SnackBar';
export interface GenerateProps {
    open: boolean,
    closePopup: any,
}
interface SelectedSequence {
    id: string;
    name?: string;
}
const GeneratePopup = ({ open, closePopup }: GenerateProps) => {
    const [openn, setOpen] = useState(false);
    const [selectedSequence, setSelectedSequence] = useState<SelectedSequence>({});
    const [difficultyLevel, setDifficultyLevel] = useState('Easy');
    const [numberOfQuestions, setNumberOfQuestions] = useState('5');
    const handleClickOpen = () => {
        setOpen(true);
        const data = { jobId: selectedSequence.id, clientId: userLocalData.getvalue('clientId'), difficulty: difficultyLevel, numberOfQuestionsPerSkill: numberOfQuestions }
            trackPromise(
                ApiService.postWithData(2168095, 'curatelyAdmin/getScreenQuiz', data).then(
                    (response: any) => {
                        
                        if (response.data.Success) {
                            showToaster("Questions  has been fetched successfully", 'success');                 
                        } else {                       
                            showToaster( "An error occured while fetching questions ", 'error');
                        }
                        
                    }
                )
            )
    };

    const handleDifficultyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDifficultyLevel(event.target.value);
    };

    const handleNumberOfQuestionsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNumberOfQuestions(event.target.value);
    };
    return (
        <div id="generate">
            <Dialog
                maxWidth={'sm'}
                fullWidth={true} open={open} id='AddGenerateModal'
            >
                <DialogTitle
                    className='py-2'
                >
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <span className='addHeader'>
                            Generate
                        </span>
                        <div>
                            <Grid
                                container
                                direction="row"
                                justifyContent="end"
                                alignItems="center"
                            >
                                <Button className='mr-3' color="primary" variant="contained" size="small" onClick={handleClickOpen}>
                                    Generate
                                </Button>
                                <Button color="secondary" variant="outlined" size="small" onClick={closePopup}>
                                    Cancel
                                </Button>
                            </Grid>
                        </div>
                    </Grid>
                </DialogTitle>
                <Divider />
                <DialogContent>
                    
                        <Grid
                            container
                            direction="row" justifyContent="center" className="mb-1">
                            <Grid size={6} className='mt-1'>
                                <label className='inputLabel mb-3'>Job
                                </label>
                                <MUIAutoComplete className='mt-1'
                                    id='jobTitle'
                                    handleChange={(id: any, name: string) => {
                                        setSelectedSequence({ id, name });
                                        
                                    }}
                                    valuePassed={
                                        (selectedSequence.id) ? { label: selectedSequence.name, id: selectedSequence.id } : {}
                                    }
                                    isMultiple={false}
                                    width="100%"
                                    type='assignJobToCandidate'
                                    placeholder="Enter Job"

                            />
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        direction="row" className="mb-1" justifyContent="center">
                        <Grid size={6} className='mt-1'>
                            <FormControl fullWidth className="mb-2">
                                <label className='inputLabel mb-1'>Difficulty Level</label>
                                <TextField
                                    select
                                    id="Difficulty Level"
                                    size="small" defaultValue={"Easy"}
                                    value={difficultyLevel}
                                    onChange={handleDifficultyChange}
                                    >
                                    <MenuItem value="Advanced">Advanced</MenuItem>
                                    <MenuItem value="Medium">Medium</MenuItem>
                                    <MenuItem value="Easy">Easy</MenuItem>
                                </TextField>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        direction="row" className="mb-1" justifyContent="center">
                        <Grid size={6} className='mt-1'>
                            <FormControl fullWidth className="mb-2">
                                <label className='inputLabel mb-1'>Number Of Questions</label>
                                <TextField
                                    select
                                    id="No.ofQuestions"
                                    size="small" defaultValue={"0"}
                                    value={numberOfQuestions}
                                    onChange={handleNumberOfQuestionsChange}
                                    >
                                    <MenuItem value="5">5</MenuItem>
                                    <MenuItem value="10">10</MenuItem>
                                    <MenuItem value="15">15</MenuItem>
                                    <MenuItem value="20">20</MenuItem>
                                    <MenuItem value="25">25</MenuItem>
                                </TextField>
                            </FormControl>
                        </Grid>
                    </Grid>
                </DialogContent>
                <Divider />
            </Dialog >
       
           {openn &&  <QuizDialog openn={openn} setOpen={() =>setOpen(false)}/>}
        </div >
    )
}

export default GeneratePopup