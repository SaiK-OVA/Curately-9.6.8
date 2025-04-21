import  {React, useState } from '../../../../../../shared/modules/React';
import {Grid, TextField, Button} from '../../../../../../shared/modules/commonImports';
import {Dialog, DialogContent, DialogTitle, DialogActions}  from '../../../../../../shared/modules/MaterialImports/Dialog';
import {Divider} from '../../../../../../shared/modules/MaterialImports/Divider';
import CloseIcon from '@mui/icons-material/Close';

// import ApiService from '../../../../../../shared/api/api';
// import { trackPromise } from 'react-promise-tracker';
import { StageInterface } from '../AddAICampaigns';
// import StageName from '../StageName/StageName';

export interface SimpleDialogProps {
    open: boolean;
    selectedStageFromTemplate: StageInterface;
    onClose: (value: StageInterface) => void;
    closePopup: () => void;
}

const AddStageModal = (props: SimpleDialogProps) => {
    const { onClose, selectedStageFromTemplate, open, closePopup } = props;

    const [stageDetails, setStageDetails] = useState({
        stageName: '',
        subject: '',
        mailBody: ''
    });
    const [formData, setFormData] = useState({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setStageDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    let data = {};
    const addAndClose = (stage: StageInterface) => {
        if (stageDetails.stageName) {
            data = {
                stageName: stageDetails.stageName,
                subject: stageDetails.subject,
                mailBody: stageDetails.mailBody
            };
            setFormData(data);
            return (
                <>
                    {/* <StageName data={formData}/> */}
                </>
            )

            // Uncomment and use the following code when integrating with API
            /*
            trackPromise(
                ApiService.postWithData('233seq', 'DemoAutomation/saveStage', data).then((response: any) => {
                    if (response.data.message === "Success") {
                        onClose({
                            stageId: response.data.stageId + "",
                            name: stageDetails.stageName,
                            title: stageDetails.subject,
                            body: stageDetails.mailBody
                        });
                        closePopup();
                    } else {
                        console.error(response.data.Error);
                    }
                })
            );
            */
        } else {
            console.error('Enter Stage Name.');
        }
        closePopup();
    };

    return (
        <Dialog open={open} className='AddStageTemplate' maxWidth={'md'}>
            <DialogTitle>
                <Grid container direction="row" justifyContent="space-between" alignItems="center">
                    <span>Add New Stage</span>
                    <span onClick={closePopup} className="closePopup">
                        <CloseIcon />
                    </span>
                </Grid>
            </DialogTitle>
            <Divider />
            <DialogContent>
                <div style={{ display: 'grid' }}>
                    <span>New Stage Name</span>
                    <TextField
                        id='stageName'
                        type="text"
                        value={stageDetails.stageName}
                        onChange={handleChange}
                        name='stageName'
                        fullWidth
                        size='small'
                        className='mt-1 mb-2'
                        placeholder='Name'
                        sx={{ width: 360 }}
                    />
                    <span>Subject</span>
                    <TextField
                        id='subject'
                        type="text"
                        value={stageDetails.subject}
                        onChange={handleChange}
                        name='subject'
                        fullWidth
                        size='small'
                        className='mt-1 mb-2'
                        placeholder='Subject'
                        sx={{ width: 360 }}
                    />
                    <span>Description (optional)</span>
                    <TextField
                        id='mailBody'
                        type="text"
                        value={stageDetails.mailBody}
                        onChange={handleChange}
                        name='mailBody'
                        fullWidth
                        size='small'
                        className='mt-1 mb-2'
                        placeholder='Enter Description'
                        sx={{ width: 360 }}
                    />
                </div>
                {/* {formData && <StageName
                    data={formData}
                />} */}
            </DialogContent>
            <Divider />
            <DialogActions>
                <Button color="secondary" variant="outlined" onClick={closePopup} size='small'>
                    Cancel
                </Button>
                <Button
                    color="primary"
                    variant="contained"
                    size='small'
                    onClick={() => addAndClose(selectedStageFromTemplate)}
                >
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddStageModal;
