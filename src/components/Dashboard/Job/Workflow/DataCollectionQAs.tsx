import * as React from 'react';
import { create } from 'zustand';

import { Dialog, DialogContent, DialogTitle, CloseIcon } from './../../../../shared/modules/MaterialImports/Dialog';
import { Divider } from './../../../../shared/modules/MaterialImports/Divider';

// import { Dialog } from 'primereact/dialog';
import { Grid } from '../../../../shared/modules/MaterialImports/Grid2';
import './DataCollectionQA.scss';



type DataCollectionQAsStore = {
    qaData: { quesId: string, question: string, answer: string, workflow_job_cand_id: string }[];
    title: string;
    open: boolean;
    close: () => void;
};

const useDataCollectionQAsStore = create<DataCollectionQAsStore>((set: any) => ({
    qaData: [],
    title: '',
    open: false,
    // onSubmit: undefined,
    close: () => set({ open: false }),
}));

export const OpenDataCollectionQAs = (qaData: any, title: string) => {
    useDataCollectionQAsStore.setState({
        qaData,
        title,
        open: true
    });
};
export const DataCollectionQAsDialog = () => {

    const { qaData, open, title, close } = useDataCollectionQAsStore();

    const closePopup = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            // return;
        }

        close();
    };

    const formatAnswer = (answer: any) => {
        try {
            const parsed = JSON.parse(answer);
            if (Array.isArray(parsed) && parsed[0] && parsed[0].rank !== undefined) {
                return parsed
                    .sort((a, b) => a.rank - b.rank)
                    .map(item => `Rank ${item.rank}: ${item.value}`)
                    .join(', ');
            }
            if (typeof parsed === 'number' || typeof parsed === 'string') {
                return parsed.toString();
            }
            if (typeof parsed === 'object' && parsed !== null) {
                return Object.values(parsed).filter(value => value).join(', ');
            }
        } catch (e) {
            return answer;
        }
    };

    return (
        // <Dialog dismissableMask={true} visible={open} position={'right'} style={{ width: '85vw', height: '100vh', maxHeight: '100vh', margin: 0 }} onHide={() => closePopup()} draggable={false} resizable={false} id="QAsDialog"
        //     header={
        //         <span className='addHeader tt-capital'>
        //             {title}
        //         </span>
        //     }
        // >
        <Dialog open={open} maxWidth={'xl'} PaperProps={{ sx: { position: "fixed", top: 0, right: 0, m: 0, width: '85vw', height: '100vh', maxHeight: '100vh' } }} onClose={() => closePopup()} id="QAsDialog" >
            <DialogTitle>
                <Grid container direction="row" justifyContent="space-between" alignItems="center" >
                    <span className='addHeader tt-capital'>
                        {title}
                    </span>
                    <div>
                        <Grid container direction="row" justifyContent="end" alignItems="center" >
                            <CloseIcon onClick={() => closePopup()} />
                        </Grid>
                    </div>
                </Grid>
            </DialogTitle>
            <Divider />
            <DialogContent className='fs-13'>
                {
                    qaData.map((i, index) => (
                        <Grid key={`${i.quesId}-${index}`} className="mb-2">
                            <label className="fw-7 questionLabel">{i.question}</label>
                            <div className="answerText">{formatAnswer(i.answer)}</div>
                        </Grid>
                    ))
                }
            </DialogContent>
        </Dialog>
    );
}
