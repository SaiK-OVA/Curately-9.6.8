import  {React, useState, useEffect } from "../../../../../../../shared/modules/React";
import ApiService from "../../../../../../../shared/api/api";
import { showToaster } from '../../../../../../shared/SnackBar/SnackBar';
import { userLocalData } from "../../../../../../../shared/services/userData";
import { Dialog, DialogTitle, DialogContent, DialogActions } from '../../../../../../../shared/modules/MaterialImports/Dialog';
import './Sequence.scss'
import { DateTime } from '../../../../../../../shared/modules/Luxon';
import {Grid, IconButton, Button} from '../../../../../../../shared/modules/commonImports';
import CloseIcon from '@mui/icons-material/Close';
import {Divider} from '../../../../../../../shared/modules/MaterialImports/Divider';
import {Radio, RadioGroup} from '../../../../../../../shared/modules/MaterialImports/FormElements';
import {FormControl, FormControlLabel} from '../../../../../../../shared/modules/MaterialImports/FormInputs';
import {Box} from '../../../../../../../shared/modules/MaterialImports/Box';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';

interface SequenceType {
    sequenceId: string;
    sequenceName: string;
    recrName: string;
    createdDate: string;
    recruiterId: string;
}
interface SequenceProps {
    open: boolean;
    closePopup: () => void;
    selectedCandidateIds?: any | string[]; // Marking this as optional
}
const Sequence = ({ open, closePopup, selectedCandidateIds }: SequenceProps) => {



    const [sequenceList, setSequenceList] = useState<SequenceType[]>([]);
    const [selectedSequence, setSelectedSequence] = useState<string>(""); const [radioSelection, setRadioSelection] = useState("My Sequences");

    console.log(selectedCandidateIds);

    useEffect(() => {
        const fetchSequences = () => {
            // const recrId = radioSelection === "My Sequences" ? userLocalData.getvalue('recrId') : undefined;
            ApiService.getByParams(193, 'Curately/Sequence/sequence_list.jsp', (radioSelection === "My Sequences") ? { recrId: userLocalData.getvalue('recrId') } : {})
                .then((response) => {

                    if (response.data.Message === "Success") {
                        const sequences = response.data.Data.map((sequence: any) => {
                            let formattedDate = "";
                            if (sequence.created_date) {
                                try {
                                    formattedDate = DateTime.fromFormat(sequence.created_date, 'yyyy-MM-dd HH:mm:ss.S')
                                        .toFormat('MM/dd/yyyy');
                                } catch (error) {
                                    console.error("Date parsing error:", error);
                                }
                            }
                            // created_date: "2024-01-02 00:00:00.0"
                            // fail_count: "0"
                            // finish_total: "0"
                            // recrId: "1893"
                            // recrName: "Aditya Kumar"
                            // sequence_id: "1"
                            // sequence_name: "Test 1"
                            // stages_count: "1"
                            // users_total: "0"

                            return {
                                sequenceId: sequence.sequence_id || "",
                                sequenceName: sequence.sequence_name || "",
                                recrName: sequence.recrName || "",
                                createdDate: formattedDate,
                                recruiterId: sequence.recrId || "",
                            };
                        });

                        setSequenceList(sequences);
                    }
                });
        };

        fetchSequences();
    }, [radioSelection]);
    const handleRadioGroupChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRadioSelection(event.target.value);
    };
    const handleSubmit = async () => {
        if (!selectedSequence) {
            alert("Please select a sequence");
            return;
        }
        const candidateids = Array.isArray(selectedCandidateIds) ? selectedCandidateIds.join(', ') : selectedCandidateIds;

        const selectedSeq = sequenceList.find(seq => seq.sequenceId === selectedSequence);
        if (!selectedSeq) {
            alert("Sequence data not found");
            return;
        }
        //const candids = "5257947,9644329"; 
        const recrid = selectedSeq.recruiterId;

        const payload = {
            sequenceId: selectedSequence,
            userIds: candidateids,
            recrId: recrid
        };
        console.log(payload)
        // https://www4.accuick.com/Accuick_API/Curately/Sequence/sequence_assign_users.jsp?clientId=2&userIds=39&sequenceId=9&recrId=61
        ApiService.postWithData('admin', 'sequenceAssignUsers', payload)
            .then((response) => {
                // console.log(response);
              //  showToaster((response.data.message) ? response.data.message : "sequence saved successfully", 'success');
                // if (response.data.success) {
                //     showToaster((response.data.message) ? response.data.message : "sequence saved successfully",'success');

                //     closePopup();
                // } else {
                //     showToaster((response.data.message) ? response.data.message : "An error occured while submitting the sequence.", 'error')
                // }

                if ((response.data.message === "Success")  || (response.data.Message === "Success")) {
                    showToaster("Campaign has been saved successfully", 'success');
                 //   showToaster("Sequence has been assigned", 'success'); 
                } else {
                    showToaster(response.data.Message ? response.data.Message : "An error occured while assigning ", 'error');
                }

            }

            )
            .catch((error) => {
                console.error("API Error:", error);
            });

        closePopup();
    };

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedSequence(event.target.value);
    };




    return (
        <Dialog
            maxWidth={'md'}
            fullWidth={true} open={open} className='AddJobModal'
            id='nextActionDialogBox'
        >
            <DialogTitle className="header">
                <span>Send Campaign</span>

                <IconButton
                    aria-label="close"
                    onClick={closePopup}
                    className="closeBtn"
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <Divider />
            <DialogContent>
                <Grid>
                    <FormControl>
                        <RadioGroup
                            row
                            value={radioSelection}
                            onChange={handleRadioGroupChange}
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel value="My Sequences" control={<Radio />} label="My Campaigns" />
                            <FormControlLabel value="All Sequences" control={<Radio />} label="All Campaigns" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Box sx={{ height: 150, width: '100%', marginTop: "15px" }}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 450 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell> Campaign Name</TableCell>
                                    <TableCell align="center">Createdby</TableCell>
                                    <TableCell align="right">Date</TableCell>                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {sequenceList.map((sequence) => (
                                    <TableRow key={sequence.sequenceId}>
                                        <TableCell>
                                            <Radio
                                                checked={selectedSequence === sequence.sequenceId}
                                                onChange={handleRadioChange}
                                                value={sequence.sequenceId}
                                            />
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {sequence.sequenceName}
                                        </TableCell>
                                        <TableCell align="center">{sequence.recrName}</TableCell>
                                        <TableCell align="right">{sequence.createdDate}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>

            </DialogContent>
            <Divider />
            <DialogActions>
                <Grid
                    container
                    direction="row"
                    justifyContent="end"
                    alignItems="center"
                >
                    <Button variant="contained"
                        type='button'
                        size="small"
                        color="primary"
                        className='mt-2'
                        onClick={handleSubmit}
                    >Submit</Button>
                </Grid>
            </DialogActions>
        </Dialog>

    )
}
export default Sequence;
