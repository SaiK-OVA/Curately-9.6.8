// import Card from '@mui/material/Card';
import { CardHeader, CardContent } from '../../../../shared/modules/MaterialImports/Card';

import { Grid } from '../../../../shared/modules/MaterialImports/Grid';
import { React, useEffect, useState } from '../../../../shared/modules/React';

import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
// import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

// import CardBodyData from '../CardBodyData/CardBodyData';
import Filter1Icon from '@mui/icons-material/Filter1';
// import { DashboardCardInterface } from '../dashboardCardModel';

// import TrendLines from '../../Reports/Charts/Demo/TrendLines/TrendLines';
// import PieChart from "../../Reports/Charts/Demo/PieChart/PieChart";
import { Typography } from '../../../../shared/modules/MaterialImports/Typography';
import CountDetails from '../CountModal/CountModal';

import { confirmDialog } from "../../../shared/ConfirmDialog/ConfirmDialog";

import { ToggleButtonGroup, ToggleButton } from './../../../../shared/modules/MaterialImports/ToggleButton';
import { Tooltip } from './../../../../shared/modules/MaterialImports/ToolTip';
import useCardStore, { DASHBOARD_CARD_STATE } from '../DashboardCardStore';
import { shallow } from 'zustand/shallow';
import { Calendar } from 'primereact/calendar';
import { DateTime } from '../../../../shared/modules/Luxon';
import { userLocalData } from '../../../../shared/services/userData';
import ApiService from '../../../../shared/api/api';
import { trackPromise } from '../../../../shared/modules/PromiseTrackter';
import CardGraph from '../CardGraph/CardGraph';


import './CardData.scss';

//new dashboard html
// import Boxicon from './../../././../../assets/icons/jobicon.png'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '../../../../shared/modules/MaterialImports/Dialog';
import { Button } from '../../../../shared/modules/MaterialImports/Button'
import { TextField } from '../../../../shared/modules/MaterialImports/FormInputs'
import { DashboardCardInterface } from '../dashboardCardModel';




const cardStore = (state: DASHBOARD_CARD_STATE) => ({
    updateDefaultValuesData: state.updateDefaultValuesData,
    cardsList: state.cards
});

const CardData = (
    { cardIndex, removeEle, layoutUpdated, saveCardsData }:
        {
            cardIndex: number;
            removeEle: (i: string) => void;
            layoutUpdated: () => void;
            saveCardsData: (cardsList: DashboardCardInterface[]) => void
            // chartData: any;
            // count: number;

        }

) => {

    const { updateDefaultValuesData, cardsList } = useCardStore(cardStore, shallow);
    const [showChart, setShowChart] = useState(false);
    const [countDetailsModal, setCountDetailsModal] = useState(false);
    const [dataCount, setDataCount] = useState(0);
    const [localDateSelected, setLocalDateSelected] = useState(
        cardsList[cardIndex]?.defaultValues?.dateSelected || "TM"
    );

    //new dashboard html
    const [selectedDateRange, setSelectedDateRange] = useState("");

    const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);
    const [newTitle, setNewTitle] = useState(cardsList[cardIndex].defaultValues.modifiedTitle);


    const updateDates = (value: string) => {
        let dates = {
            fromDate: (cardsList[cardIndex].defaultValues.fromDate && (cardsList[cardIndex].defaultValues.fromDate !== "Invalid DateTime") && DateTime.fromFormat(cardsList[cardIndex].defaultValues.fromDate, 'MM/dd/yyyy').isValid) ?
                DateTime.fromFormat(cardsList[cardIndex].defaultValues.fromDate, 'MM/dd/yyyy').toFormat('MM/dd/yyyy')
                :
                DateTime.now().toFormat('MM/dd/yyyy'),
            toDate: (cardsList[cardIndex].defaultValues.toDate && (cardsList[cardIndex].defaultValues.toDate !== "Invalid DateTime") && DateTime.fromFormat(cardsList[cardIndex].defaultValues.fromDate, 'MM/dd/yyyy').isValid) ?
                DateTime.fromFormat(cardsList[cardIndex].defaultValues.toDate, 'MM/dd/yyyy').toFormat('MM/dd/yyyy')
                :
                DateTime.now().toFormat('MM/dd/yyyy')

        };
        let tempDateToDisplay = '';
        switch (value) {
            case 'today':
                dates.fromDate = DateTime.now().toFormat('MM/dd/yyyy');
                break;
            case 'yesterday':
                dates.fromDate = DateTime.now().plus({ day: -1 }).toFormat('MM/dd/yyyy');
                dates.toDate = DateTime.now().plus({ day: -1 }).toFormat('MM/dd/yyyy');
                break;
            case 'thisWeek':
                tempDateToDisplay = 'This Week';
                dates.fromDate = DateTime.now().startOf('week').toFormat('MM/dd/yyyy');
                dates.toDate = DateTime.now().toFormat('MM/dd/yyyy');
                break;
            case 'nextWeek':
                tempDateToDisplay = 'Next Week';
                dates.fromDate = DateTime.now().plus({ weeks: 1 }).startOf('week').toFormat('MM/dd/yyyy');
                dates.toDate = DateTime.now().plus({ weeks: 1 }).endOf('week').plus({ days: -2 }).toFormat('MM/dd/yyyy');
                break;
            case 'lastWeek':
                tempDateToDisplay = 'Last Week';
                dates.fromDate = DateTime.now().plus({ weeks: -1 }).startOf('week').toFormat('MM/dd/yyyy');
                dates.toDate = DateTime.now().plus({ weeks: -1 }).endOf('week').plus({ days: -2 }).toFormat('MM/dd/yyyy');
                break;
            case 'month':
                dates.fromDate = DateTime.fromObject({ year: DateTime.now().toObject().year, month: DateTime.now().toObject().month, day: 1 }).toFormat('MM/dd/yyyy');
                dates.toDate = DateTime.now().toFormat('MM/dd/yyyy');
                break;
            case 'quarter':
                dates.fromDate = DateTime.fromFormat('' + Math.floor((new Date().getMonth() + 3) / 3), 'q').toFormat('MM/dd/yyyy');
                dates.toDate = DateTime.now().toFormat('MM/dd/yyyy');
                break;
            case 'year':
                dates.fromDate = DateTime.fromObject({ year: DateTime.now().toObject().year, month: 1, day: 1 }).toFormat('MM/dd/yyyy');
                dates.toDate = DateTime.now().toFormat('MM/dd/yyyy');
                break;
            case 'customRange':
                tempDateToDisplay = 'Custom Range';
                break;
            default:
                break;
        }

        updateDefaultValuesData(
            cardsList[cardIndex].i,
            {
                ...cardsList[cardIndex].defaultValues,
                dateSelected: value,
                fromDate: dates.fromDate,
                toDate: dates.toDate
            }
        );
        //new dashboard html
        setSelectedDateRange(`${tempDateToDisplay ? tempDateToDisplay : value.charAt(0).toUpperCase() + value.slice(1)} (${dates.fromDate} - ${dates.toDate})`);

        return dates;
    }



    const getCountData = (dateString: any) => {
        console.log(cardsList[cardIndex].id)
        const dates = updateDates(dateString);
        let dataToPass = {
            recrId: userLocalData.getvalue('recrId'),
            clientId: userLocalData.getvalue('clientId'),
            startDate: dates.fromDate,
            endDate: dates.toDate,
            stageId: ""
        }

        let ipToPass: 193 | 216 | 'admin' = 'admin';
        let urlToPass = '';
        // Submit-- > 100
        // Interview-- > 300
        // Offer-- > 400
        switch (cardsList[cardIndex].id) {
            case 'jobsReceived':
                ipToPass = 'admin';
                urlToPass = 'dashBoardJobsCount';
                break;
            case 'starts':
                urlToPass = 'dashBoardStartsCount';
                dataToPass.stageId = '200';
                break;
            case 'interviews':
                urlToPass = 'dashBoardStageCount';
                dataToPass.stageId = '300';
                break;
            case 'offersReceived':
                urlToPass = 'dashBoardStageCount';
                dataToPass.stageId = '400';
                break;
            case 'submissions':
                urlToPass = 'dashBoardStageCount';
                dataToPass.stageId = '100';
                break;
            case 'jobsWithoutSubs':
                urlToPass = 'dashJobsWithoutSubsCount'; //'Curately/Dashboard/dash_jobs_without_subs_count.jsp';
                //ipToPass = 193;
                break;
            case 'recruitersWOSubs':
                urlToPass = 'recruitersWithoutSubsCount'
                break;
            case 'recruitersWOShortlists':
                urlToPass = 'recruitersWithoutShortlistsCount'
                break;
            case 'recruitersWOInterviews':
                urlToPass = 'recruitersWithoutInterviewsCount'
                break;
            case 'swsc24h':
                // submissions without status change in 24 hours
                urlToPass = 'submissionsWithoutStatusChangeCount'
                break;
            case 'aojwc':
                urlToPass = 'assignedJobWithoutCoverageCount'
                // Assigned/Owned job without coverage
                break;
            case 'scwsci3d':
                urlToPass = "shortlistedCandidatesWithoutStatusChangeCount"
                // Shortlisted candidates without status change in 3 days
                break;
            case 'iwsci5d':
                urlToPass = 'interviewsWithoutStatusChangeCount'
                // Interviews without Status change in 5 days
                break;
            // case 'eeoc':
            //     break;
            // case 'eeocVeteran':
            //     // openGraph(unId);
            //     break;
            default:
                break;
        }
        if (urlToPass) {
            trackPromise(
                ApiService.postWithData(ipToPass, urlToPass, dataToPass).then(
                    (response: any) => {
                        if (ipToPass === 'admin') {
                            if (response.data.Success) {
                                setDataCount((response.data.count) ? Number(response.data.count) : 0);
                            }
                            // } else if (ipToPass === '216') {
                            //     if (response.data.Message === 'Success') {
                            //         setDataCount((response.data.count) ? Number(response.data.count) : 0);
                            //     }

                        }
                    }
                )
            )
        }
    }

    useEffect(() => {
        console.log(cardsList[cardIndex].defaultValues.modifiedTitle);
        getCountData(cardsList[cardIndex].defaultValues.dateSelected);
    }, [])

    useEffect(() => {
        const { fromDate, toDate, dateSelected } = cardsList[cardIndex].defaultValues;
        if (dateSelected === "customRange" && fromDate && toDate) {
            getCountData("customRange");
        }
    }, [cardsList[cardIndex].defaultValues.fromDate, cardsList[cardIndex].defaultValues.toDate]);

    //new dashboard html
    function truncateMiddle(text: string, maxLength: any) {
        if (text.length <= maxLength) return text;
        const half = maxLength / 1.5;
        return text.slice(0, half) + '...' + text.slice(-half);
    }

    const handleSettingsOpen = () => {
        setNewTitle(cardsList[cardIndex].defaultValues.modifiedTitle);
        setSettingsDialogOpen(true);
    };

    const handleSettingsClose = () => {
        setSettingsDialogOpen(false);
    };

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.target.value);
    };

    const handleUpdateTitle = () => {
        let tempCardList = [...cardsList];
        tempCardList[cardIndex].defaultValues.modifiedTitle = newTitle;
        // updateDefaultValuesData(
        //     cardsList[cardIndex].i,
        //     {
        //         ...cardsList[cardIndex].defaultValues,
        //         modifiedTitle: newTitle
        //     }
        // );
        saveCardsData(tempCardList);
        setSettingsDialogOpen(false);
    };

    const saveAuditLog = (id: number) => {
        ApiService.saveAuditLog(id);
    }

    const graphCalled = (cardId: string) => {

        switch (cardId) {
            case 'jobsReceived':
                saveAuditLog(3845);
                break;
            case 'starts':
                saveAuditLog(3849);
                break;
            case 'jobsWithoutSubs':
                saveAuditLog(3862);
                break;
            default:
                break;
        }
    }


    const refreshCalled = (cardId: string) => {

        switch (cardId) {
            case 'jobsReceived':
                saveAuditLog(3846);
                break;
            case 'starts':
                saveAuditLog(3850);
                break;
            case 'interviews':
                saveAuditLog(3853);
                break;
            case 'offersReceived':
                saveAuditLog(3856);
                break;
            case 'submissions':
                saveAuditLog(3859);
                break;
            case 'jobsWithoutSubs':
                saveAuditLog(3863);
                break;
            case 'recruitersWOSubs':
                saveAuditLog(3866);
                break;
            case 'recruitersWOShortlists':
                saveAuditLog(3869);
                break;
            case 'recruitersWOInterviews':
                saveAuditLog(3872);
                break;
            case 'swsc24h':
                saveAuditLog(3875);
                break;
            case 'aojwc':
                saveAuditLog(3878);
                break;
            case 'scwsci3d':
                saveAuditLog(3881);
                break;
            case 'iwsci5d':
                saveAuditLog(3884);
                break;
            default:
                break;
        }
    }


    const settingsCalled = (cardId: string) => {

        switch (cardId) {
            case 'jobsReceived':
                saveAuditLog(3847);
                break;
            case 'starts':
                saveAuditLog(3851);
                break;
            case 'interviews':
                saveAuditLog(3854);
                break;
            case 'offersReceived':
                saveAuditLog(3857);
                break;
            case 'submissions':
                saveAuditLog(3860);
                break;
            case 'jobsWithoutSubs':
                saveAuditLog(3864);
                break;
            case 'recruitersWOSubs':
                saveAuditLog(3867);
                break;
            case 'recruitersWOShortlists':
                saveAuditLog(3870);
                break;
            case 'recruitersWOInterviews':
                saveAuditLog(3873);
                break;
            case 'swsc24h':
                saveAuditLog(3876);
                break;
            case 'aojwc':
                saveAuditLog(3879);
                break;
            case 'scwsci3d':
                saveAuditLog(3882);
                break;
            case 'iwsci5d':
                saveAuditLog(3885);
                break;
            default:
                break;
        }
    }

    const closeButtonCalled = (cardId: string) => {

        switch (cardId) {
            case 'jobsReceived':
                saveAuditLog(3848);
                break;
            case 'starts':
                saveAuditLog(3852);
                break;
            case 'interviews':
                saveAuditLog(3855);
                break;
            case 'offersReceived':
                saveAuditLog(3858);
                break;
            case 'submissions':
                saveAuditLog(3861);
                break;
            case 'jobsWithoutSubs':
                saveAuditLog(3865);
                break;
            case 'recruitersWOSubs':
                saveAuditLog(3868);
                break;
            case 'recruitersWOShortlists':
                saveAuditLog(3871);
                break;
            case 'recruitersWOInterviews':
                saveAuditLog(3874);
                break;
            case 'swsc24h':
                saveAuditLog(3877);
                break;
            case 'aojwc':
                saveAuditLog(3880);
                break;
            case 'scwsci3d':
                saveAuditLog(3883);
                break;
            case 'iwsci5d':
                saveAuditLog(3886);
                break;
            default:
                break;
        }
    }


    return (
        <>
            <CardHeader className='headerGrid '
                subheader={<span                                            //new dashboard html
                    className="middle-truncate dragHandle"
                >{truncateMiddle(cardsList[cardIndex].defaultValues.modifiedTitle, 25)}</span>}
                action={
                    <div className='iconsDiv pt-2'>
                        {cardsList[cardIndex].inputs.graph &&
                            <>
                                {showChart ?
                                    <Filter1Icon onClick={() => { setShowChart(false) }} /> :
                                    <TimelineOutlinedIcon onClick={() => { graphCalled(cardsList[cardIndex].id); setShowChart(true) }} />
                                }
                            </>
                        }
                        <CachedOutlinedIcon onClick={() => { refreshCalled(cardsList[cardIndex].id); getCountData(cardsList[cardIndex].defaultValues.dateSelected) }} />
                        <SettingsOutlinedIcon onClick={() => { settingsCalled(cardsList[cardIndex].id); handleSettingsOpen() }} />
                        <CloseOutlinedIcon onClick={() => {
                            closeButtonCalled(cardsList[cardIndex].id);
                            // removeEle(cardsList[cardIndex].i)
                            confirmDialog(`Are you sure you want to delete ${cardsList[cardIndex].defaultValues.modifiedTitle} ?`, () => {
                                // deleteJobById(row.original.jobId); // Replace 1 with the actual jobId you want to delete
                                removeEle(cardsList[cardIndex].i)
                            }, "warning")
                        }} />
                    </div>
                }>
            </CardHeader>
            <CardContent className='p-0 dashCardContent'>
                <Grid container direction="column" className='py-4 px-3'>

                    {
                        showChart ?
                            <CardGraph cardData={cardsList[cardIndex]} />
                            :
                            <>
                                {
                                    cardsList[cardIndex].inputs.datesDiv &&
                                    <ToggleButtonGroup
                                        color="primary"
                                        value={localDateSelected}
                                        exclusive
                                        onChange={(event: React.MouseEvent<HTMLElement>, newDate: string | null) => {
                                            if (newDate) {
                                                setLocalDateSelected(newDate);
                                                layoutUpdated();
                                                getCountData(newDate);
                                            }
                                            // updateDefaultValuesData(cardsList[cardIndex].i, { ...cardsList[cardIndex].defaultValues, dateSelected: newDate });
                                        }}
                                        aria-label="Dates Selected"
                                        className='mb-2 weeks_main'
                                    >
                                        <Tooltip title="This week"><ToggleButton className='py-1 px-2' value="thisWeek">TW</ToggleButton></Tooltip>
                                        <Tooltip title="Last Week"><ToggleButton className='py-1 px-2' value="lastWeek">LW</ToggleButton></Tooltip>
                                        <Tooltip title="This Month"><ToggleButton className='py-1 px-2' value="month">TM</ToggleButton></Tooltip>
                                        <Tooltip title="This Quarter"><ToggleButton className='py-1 px-2' value="quarter">TQ</ToggleButton></Tooltip>
                                        <Tooltip title="This Year"><ToggleButton className='py-1 px-2' value="year">TY</ToggleButton></Tooltip>
                                        <Tooltip title="Date Range"><ToggleButton className='py-1 px-2' value="customRange">DR</ToggleButton></Tooltip>
                                    </ToggleButtonGroup>
                                }

                                {/* <Typography variant='h3' className='count' onClick={() => { setCountDetailsModal(true) }}>{dataCount}</Typography> */}

                                {/* new dashboard html */}
                                <div className="card_count_icon" >

                                    <Typography
                                        variant='h3'
                                        className={`count `}
                                        style={{ color: `${dataCount === 0 ? '#000000' : '#146ef6'}` }}
                                        onClick={() => {
                                            if (dataCount > 0) setCountDetailsModal(true)
                                        }}
                                    >
                                        {dataCount}
                                    </Typography>

                                    {/* <WorkRoundedIcon className='Box_icon'/> */}
                                    {/* <img src={Boxicon} alt="" className="Box_icon"></img> */}
                                </div>
                                <div className="date-range-display">
                                    {/* <Typography variant="body2">{selectedDateRange}</Typography> */}
                                    {cardsList[cardIndex].defaultValues.dateSelected === "customRange" ? <Typography variant="body2">Custom Range<Calendar
                                        value={
                                            [
                                                cardsList[cardIndex].defaultValues.fromDate ? new Date(cardsList[cardIndex].defaultValues.fromDate) : null,
                                                cardsList[cardIndex].defaultValues.toDate ? new Date(cardsList[cardIndex].defaultValues.toDate) : null
                                            ]
                                        }
                                        onChange={(e) => {
                                            console.log(e.value)
                                            if (e?.value?.length && e?.value?.length > 1) {
                                                updateDefaultValuesData(
                                                    cardsList[cardIndex].i,
                                                    {
                                                        ...cardsList[cardIndex].defaultValues,
                                                        fromDate: e.value[0] ? DateTime.fromJSDate(e.value[0]).toFormat('MM/dd/yyyy') : "",
                                                        toDate: e.value[1] ? DateTime.fromJSDate(e.value[1]).toFormat('MM/dd/yyyy') : "",
                                                        dateSelected: "customRange"
                                                    }
                                                );
                                            } else if (e?.value?.length && e?.value[0]) {
                                                updateDefaultValuesData(
                                                    cardsList[cardIndex].i,
                                                    {
                                                        ...cardsList[cardIndex].defaultValues,
                                                        fromDate: DateTime.fromJSDate(e.value[0]).toFormat('MM/dd/yyyy')
                                                    }
                                                );
                                            }
                                        }}
                                        selectionMode="range"
                                        readOnlyInput
                                        hideOnRangeSelection={true}
                                        // hideOnDateTimeSelect={true}
                                        placeholder='Select date'
                                        dateFormat="mm/dd/yy"
                                        className='fs-14'
                                        showIcon
                                        // minDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))}
                                        maxDate={new Date()}
                                    /></Typography> :
                                        <Typography variant="body2">{selectedDateRange}</Typography>}

                                </div>
                            </>
                    }

                </Grid>
            </CardContent>

            {
                countDetailsModal ?
                    <CountDetails
                        dialogOpen={countDetailsModal}
                        handleDialogClose={() => { setCountDetailsModal(false) }}
                        cardData={cardsList[cardIndex]}
                    />
                    :
                    null
            }
            {showChart && CardData}
            <Dialog className='dialog_box_main' open={settingsDialogOpen} onClose={handleSettingsClose}>
                <DialogTitle>Settings</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Card Title"
                        size='small'
                        type="text"
                        fullWidth
                        value={newTitle}
                        onChange={handleTitleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSettingsClose} variant='outlined' size="small">Cancel</Button>
                    <Button onClick={handleUpdateTitle} variant='contained' size="small">Update</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default CardData;
