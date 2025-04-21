import { useEffect, useRef, useState } from '../../../../../../shared/modules/React';

import { StageInterface } from '../AddWorkflow';
import { Card, CardContent } from '../../../../../../shared/modules/MaterialImports/Card';
import { Grid } from '../../../../../../shared/modules/MaterialImports/Grid';
import { Dialog, DialogContent, DialogTitle } from '../../../../../../shared/modules/MaterialImports/Dialog';


import CloseIcon from '@mui/icons-material/Close';

import './AddStageModal.scss'
import { Divider } from '../../../../../../shared/modules/MaterialImports/Divider';
import { getStageIcon } from '../../../../../../shared/modules/stageicon';
import masterStagesList from '../../../../../../shared/data/Stages';
import { userLocalData } from '../../../../../../shared/services/userData';

const stagesToAdd = JSON.parse(JSON.stringify(masterStagesList));

export interface SimpleDialogProps {
    open: boolean;
    onClose: (value: StageInterface) => void;
    closePopup: () => void;
    selectedCards: StageInterface[]
}

const AddStageModal = (
    { onClose, open, closePopup, selectedCards }: SimpleDialogProps
) => {
    const stagesToHide = useRef({
        approved: false,
        rejected: false,
        onHold: false
    })
    // const { onClose, open, closePopup, idsToHide } = props;

    const [stagesLoad, setStagesLoad] = useState(false);
    const [stagesList, setStagesList] = useState<StageInterface[]>([]);

    useEffect(() => {
        console.log(selectedCards);
        console.log(stagesToAdd);
        if (userLocalData.getvalue('clientName') === "agileoneaxalta") {
            setStagesList(stagesToAdd.filter((stage: StageInterface) => ((stage.stageTypeId !== '8') && (stage.stageTypeId !== '12') && (stage.stageTypeId !== '15'))));
        } else {
            setStagesList(stagesToAdd);
        }
        let approvedObj = selectedCards.find((obj: any) => {
            return obj.name === "Approved"
        });
        let rejectedObj = selectedCards.find((obj: any) => {
            return obj.name === "Rejected"
        });
        let onHoldObj = selectedCards.find((obj: any) => {
            return obj.name === "On Hold"
        });
        stagesToHide.current = {
            approved: (approvedObj && approvedObj.name) ? true : false,
            rejected: (rejectedObj && rejectedObj.name) ? true : false,
            onHold: (onHoldObj && onHoldObj.name) ? true : false
        }
        console.log(stagesToHide.current);
        setStagesLoad(true);
        //     if (idsToHide.length) {
        //         console.log(idsToHide);
        //         // const toDelete = new Set(idsToHide);
        //         // stages = stages.filter((obj: StageInterface) => !toDelete.has(obj?.number));
        //         let tempStages = [...stagesToAdd];
        //         for (let th = 0; th < idsToHide.length; th++) {
        //             let indexToPass = tempStages.findIndex(function (obj: StageInterface) {
        //                 return obj.number === idsToHide[th];
        //             })
        //             if (indexToPass >= 0) {
        //                 tempStages.splice(indexToPass, 1);
        //             }

        //         }
        //         setStagesToAdd([...tempStages]);
        //         setStagesLoad(true)
        //     }
    }, [])


    const handleListItemClick = (stage: StageInterface) => {
        onClose(stage);
    };

    return (
        <Dialog
            maxWidth={'sm'}
            // sx={{ width: 900, maxWidth: 900, minWidth: 900 }}
            fullWidth={false}
            // onClose={handleClose}
            open={open} className='AddStageModal'>
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
                        Add Stage
                    </span>
                    <span onClick={() => closePopup()} className="closePopup">
                        <CloseIcon />
                    </span>
                </Grid>
            </DialogTitle>
            <Divider />
            <DialogContent>
                {
                    (stagesLoad)
                        ?
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            {
                                stagesList.map((stage: StageInterface) => (
                                    <Grid size={4} key={stage.number} className={`${((stagesToHide.current.approved && stage.name === 'Approved') || (stagesToHide.current.rejected && stage.name === 'Rejected') || (stagesToHide.current.onHold && stage.name === 'On Hold') || ((stage.number === "15") && !userLocalData.adminSettings(20012))) ? 'd-none' : ''}`}>
                                        <Card onClick={() => handleListItemClick(stage)} className='stage'>
                                            <CardContent className='px-3 py-2'>
                                                <Grid
                                                    sx={{ display: 'flex' }}
                                                >
                                                    {getStageIcon(stage.name)}
                                                    <span className='title'>{stage.title}</span>
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))
                            }
                        </Grid>
                        : null
                }
            </DialogContent>
        </Dialog>
    );
}
export default AddStageModal;