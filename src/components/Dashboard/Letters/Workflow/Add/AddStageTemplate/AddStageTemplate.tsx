import { useState } from '../../../../../../shared/modules/React';
import {Dialog, DialogTitle, DialogContent, DialogActions} from '../../../../../../shared/modules/MaterialImports/Dialog';
import { StageInterface } from '../AddWorkflow';
import './AddStageTemplate.scss'
import {Grid, Button, TextField} from '../../../../../../shared/modules/commonImports';
import {Divider} from '../../../../../../shared/modules/MaterialImports/Divider';
import CloseIcon from '@mui/icons-material/Close';
import ApiService from '../../../../../../shared/api/api';
import { trackPromise } from '../../../../../../shared/modules/PromiseTrackter';
import { showToaster } from '../../../../../shared/SnackBar/SnackBar';
import { userLocalData } from '../../../../../../shared/services/userData';

export interface SimpleDialogProps {
    open: boolean;
    selectedStageFromTemplate: StageInterface;
    onClose: (value: StageInterface) => void;
    closePopup: () => void;
    workflowId: string;
    position: number;
}

const AddStageTemplate = (props: SimpleDialogProps) => {
    const { onClose, selectedStageFromTemplate, open, closePopup, workflowId, position } = props;
    const [selectedStageName, setSelectedStageName] = useState(selectedStageFromTemplate.name);



    const addAndClose = (stage: StageInterface) => {
        if (selectedStageName) {
            let data = {
                stageId: "0",
                title: selectedStageName,
                instructions: "",
                position: position + 1,
                workflowId: workflowId,
                stageTypeId: stage.number,
                clientId: userLocalData.getvalue('clientId')
            }
            trackPromise(
                ApiService.postWithData('admin', 'saveStage', data).then((response: any) => {
                    if (response.data.Success) {

                        onClose({
                            number: stage.number,
                            stageId: response.data.stageId + "",
                            name: stage.name,
                            title: selectedStageName,
                            stageTypeId: stage.number
                        });
                    } else {
                        showToaster(response.data.Error, 'error');
                        // console.log(response.data);
                    }
                })
            )
        } else {
            showToaster('Enter Stage Name.', 'error')
        }
    };

    return (
        <Dialog open={open} className='AddStageTemplate' maxWidth={'md'}>
            <DialogTitle>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <span>
                        Name of Stage Title
                    </span>
                    <span onClick={() => closePopup()} className="closePopup">
                        <CloseIcon />
                    </span>
                </Grid>
            </DialogTitle>
            <Divider />
            <DialogContent>
                <TextField
                    id='stageName'
                    type="text"
                    value={selectedStageName}
                    onChange={(e) => {
                        setSelectedStageName(e.target.value)
                        // console.log(e.target.value)
                    }
                    }
                    name='stageName'
                    fullWidth
                    size='small'
                    className='mt-1 mb-2'
                    placeholder='Name'
                    sx={{ width: 360 }}
                />
            </DialogContent>
            <Divider />
            <DialogActions>
                <Button onClick={() => addAndClose(selectedStageFromTemplate)}>Add</Button>
            </DialogActions>
        </Dialog>
    );
}
export default AddStageTemplate;