import  { useContext } from 'react';
import { React} from '../../../../../../shared/modules/React';
import {Button} from '../../../../../../shared/modules/MaterialImports/Button';
import {Dialog, DialogTitle, DialogContent,DialogActions} from '../../../../../../shared/modules/MaterialImports/Dialog';
// import DialogContentText from '@mui/material/DialogContentText';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Radio, RadioGroup} from '../../../../../../shared/modules/MaterialImports/FormElements';
import CloseIcon from '@mui/icons-material/Close';
import { DateTime } from '../../../../../../shared/modules/Luxon';
// import Divider from '@mui/material/Divider';
import { Store } from "../DataLabs/DataLabs";
import apiService from "../../shared/api/apiService";

import './RightSection.scss'
import { Box } from '../../../../../../shared/modules/MaterialImports/Box';
import { FormControl, FormControlLabel } from '../../../../../../shared/modules/MaterialImports/FormInputs';
import { Typography } from '../../../../../../shared/modules/MaterialImports/Typography';

interface EditModalProps {
    rowId: any,
    sequenceModalData: any,
    openTableSequenceModal: any,
    selectedRowId: any,
    handleCloseTableSequenceModal: () => void;
    SendMySequenceList: (data: any) => void;
    SendAllSequenceList: (data: any) => void;
    sendParentRadio: (data: any) => void
    showSeqSuccess: () => void;
    localData: any;
}

const sequenceHeaderList = ['Campaign Name', 'Createdby', 'Date']

const sequenceList = [
    {
        "candidates_total": "0",
        "stages_count": "1",
        "recr": "Aditya Kumar",
        "sequence_id": "90",
        "created_date": "2023-12-19 00:00:00.0",
        "recrId": "1893",
        "sequence_name": "Testing for Curately",
        "finish_total": "0",
        "fail_count": "0"
    },
    {
        "candidates_total": "0",
        "stages_count": "1",
        "recr": "Manish Karani",
        "sequence_id": "89",
        "created_date": "2023-08-23 00:00:00.0",
        "recrId": "46",
        "sequence_name": "BMS Nuture",
        "finish_total": "0",
        "fail_count": "0"
    },
    {
        "candidates_total": "7",
        "stages_count": "2",
        "recr": "Manish Karani",
        "sequence_id": "88",
        "created_date": "2023-08-23 00:00:00.0",
        "recrId": "46",
        "sequence_name": "BMS Sourcing",
        "finish_total": "0",
        "fail_count": "0"
    },
    {
        "candidates_total": "2",
        "stages_count": "1",
        "recr": "Myra Ninge",
        "sequence_id": "87",
        "created_date": "2023-05-08 00:00:00.0",
        "recrId": "1993",
        "sequence_name": "my tst",
        "finish_total": "0",
        "fail_count": "0"
    },
    {
        "candidates_total": "4",
        "stages_count": "4",
        "recr": "Sunil Yekulla",
        "sequence_id": "85",
        "created_date": "2022-12-20 00:00:00.0",
        "recrId": "2070",
        "sequence_name": "Sequence#004",
        "finish_total": "2",
        "fail_count": "0"
    },
    {
        "candidates_total": "3",
        "stages_count": "3",
        "recr": "Sunil Yekulla",
        "sequence_id": "84",
        "created_date": "2022-12-20 00:00:00.0",
        "recrId": "2070",
        "sequence_name": "Sequence#002",
        "finish_total": "3",
        "fail_count": "0"
    },
    {
        "candidates_total": "2",
        "stages_count": "3",
        "recr": "Sunil Yekulla",
        "sequence_id": "82",
        "created_date": "2022-12-20 00:00:00.0",
        "recrId": "2070",
        "sequence_name": "Sequence#006",
        "finish_total": "2",
        "fail_count": "0"
    },
    {
        "candidates_total": "5",
        "stages_count": "3",
        "recr": "Sunil Yekulla",
        "sequence_id": "81",
        "created_date": "2022-12-20 00:00:00.0",
        "recrId": "2070",
        "sequence_name": "Sequence#005",
        "finish_total": "2",
        "fail_count": "0"
    },
    {
        "candidates_total": "2",
        "stages_count": "3",
        "recr": "Sunil Yekulla",
        "sequence_id": "79",
        "created_date": "2022-12-20 00:00:00.0",
        "recrId": "2070",
        "sequence_name": "Sequence#003",
        "finish_total": "0",
        "fail_count": "0"
    },
    {
        "candidates_total": "3",
        "stages_count": "3",
        "recr": "Sunil Yekulla",
        "sequence_id": "77",
        "created_date": "2022-12-20 00:00:00.0",
        "recrId": "2070",
        "sequence_name": "Sequence#001",
        "finish_total": "3",
        "fail_count": "0"
    },
    {
        "candidates_total": "1",
        "stages_count": "2",
        "recr": "Mastan Vali",
        "sequence_id": "72",
        "created_date": "2022-12-16 00:00:00.0",
        "recrId": "61",
        "sequence_name": "Vali test 1",
        "finish_total": "0",
        "fail_count": "0"
    },
    {
        "candidates_total": "4",
        "stages_count": "4",
        "recr": "Aditya Kumar",
        "sequence_id": "71",
        "created_date": "2022-12-14 00:00:00.0",
        "recrId": "1893",
        "sequence_name": "Manish test 12145",
        "finish_total": "0",
        "fail_count": "2"
    },
    {
        "candidates_total": "4",
        "stages_count": "2",
        "recr": "Aditya Kumar",
        "sequence_id": "70",
        "created_date": "2022-12-14 00:00:00.0",
        "recrId": "1893",
        "sequence_name": "Report_Test04",
        "finish_total": "0",
        "fail_count": "0"
    },
    {
        "candidates_total": "3",
        "stages_count": "4",
        "recr": "Aditya Kumar",
        "sequence_id": "69",
        "created_date": "2022-12-14 00:00:00.0",
        "recrId": "1893",
        "sequence_name": "Reports_test003",
        "finish_total": "1",
        "fail_count": "0"
    },
    {
        "candidates_total": "5",
        "stages_count": "4",
        "recr": "Aditya Kumar",
        "sequence_id": "68",
        "created_date": "2022-12-14 00:00:00.0",
        "recrId": "1893",
        "sequence_name": "Mail data#001",
        "finish_total": "3",
        "fail_count": "0"
    },
    {
        "candidates_total": "3",
        "stages_count": "3",
        "recr": "Aditya Kumar",
        "sequence_id": "67",
        "created_date": "2022-12-14 00:00:00.0",
        "recrId": "1893",
        "sequence_name": "Reports_test#2",
        "finish_total": "0",
        "fail_count": "1"
    }
]

const SequenceModal: React.FC<EditModalProps> = ({
    rowId,
    sequenceModalData,
    openTableSequenceModal,
    selectedRowId,
    handleCloseTableSequenceModal,
    SendMySequenceList,
    SendAllSequenceList,
    sendParentRadio,
    showSeqSuccess,
    localData,
}) => {
    const [selectedValue, setSelectedValue] = React.useState('');
    const [parentSelectValue, SetParentSelectValue] = React.useState('My Sequences');
    const [searchData, setSearchData, isFilterApplied, setFilterApply, isCompanySelected, setIsCompanySelected] = useContext(Store);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.value);
    };
    const handleParentRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        SetParentSelectValue(event.target.value);
        sendParentRadio(event.target.value)
        if (event.target.value === 'My Sequences') {
            apiService.getMySequenceList(searchData.userId)
                .then((response: any) => {
                    //console.log('getMySequenceList:', response.data);
                    SendMySequenceList(response.data.Data)
                })
                .catch((error: any) => {
                    console.error('Error fetching data:', error);
                });
        } else {
            apiService.getAllSequenceList()
                .then((response: any) => {
                    //console.log('getAllSequenceList:', response.data);
                    SendAllSequenceList(response.data.Data)
                })
                .catch((error: any) => {
                    console.error('Error fetching data:', error);
                });
        }
    };

    // console.log('parentSelectValue', parentSelectValue)

    const handleSubmit = (personId: any) => {
        if (!selectedValue) {
            alert('Please select a sequence');

        } else {

            let selectedlocalobj = localData.filter((item: any) => (
                item.person_id === personId
            ))

            console.log('selectedlocalobj', selectedlocalobj)
            console.log('UserIddd', selectedlocalobj[0].userId)

            apiService.SendSequenceList(selectedValue, searchData.userId, selectedlocalobj[0].userId)
                .then((response: any) => {
                    console.log('SendSequenceList:', response.data);
                })
                .catch((error: any) => {
                    console.error('Error fetching data:', error);
                });
            handleCloseTableSequenceModal();
            showSeqSuccess()
            setSelectedValue('')
        }
    };

    const controlProps = (item: string) => ({
        checked: selectedValue === item,
        onChange: handleChange,
        value: item,
        name: 'size-radio-button-demo',
        inputProps: { 'aria-label': item },
    });

    return (
        <Dialog
            className='sequence-dialog'
            open={openTableSequenceModal && selectedRowId === `${rowId}`}
            onClose={handleCloseTableSequenceModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title" sx={{ p: 0 }}>
                <Box className='sequnce-modal-header-con'>
                    <Typography className='sequnce-modal-header'>
                        Send Sequence
                    </Typography>
                    <Button className='sequnce-modal-close-btn' onClick={handleCloseTableSequenceModal}>
                        <CloseIcon className='sequnce-modal-close-btn-icon' />
                    </Button>
                </Box>
                <hr className='hr-line' />
            </DialogTitle>

            <DialogContent sx={{ p: '0px 22px 1px 22px', overflowY: 'scroll', maxHeight: '250px' }}>
                <FormControl className='top-radio-con'>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue='My Sequences'
                        name="radio-buttons-group"
                        className='top-radio-btn-con'
                        onChange={handleParentRadioChange}
                    >
                        <FormControlLabel className='top-radio-btn-label' value="My Sequences" control={<Radio size='small' />} label="My Sequences" />
                        <FormControlLabel className='top-radio-btn-label' value="All Sequences" control={<Radio size='small' />} label="All Sequences" />
                    </RadioGroup>
                </FormControl>

                <TableContainer component={Paper} sx={{ overflowX: 'hidden' }}>
                    <Table sx={{ minWidth: 600 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                {sequenceHeaderList.map((item: any) => (
                                    <TableCell key={item} className='sequence-table-Header'>{item}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sequenceModalData.map((row: any) => (
                                <TableRow
                                    key={row.sequence_id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" sx={{ p: '5px' }}>
                                        <Radio {...controlProps(row.sequence_id)} size="small" />
                                    </TableCell>
                                    <TableCell className='sequence-table-cell'>{row.sequence_name}</TableCell>
                                    <TableCell className='sequence-table-cell'>{row.recrName}</TableCell>
                                    <TableCell className='sequence-table-cell'>{DateTime.fromISO(row.created_date).toFormat('MM-DD-YYYY')}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>

            <DialogActions sx={{ borderTop: '1px solid rgba(0, 0, 0, 0.12)' }}>
                <Button onClick={() => handleSubmit(rowId)} className='seq-submit-btn'>
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
}


export default SequenceModal