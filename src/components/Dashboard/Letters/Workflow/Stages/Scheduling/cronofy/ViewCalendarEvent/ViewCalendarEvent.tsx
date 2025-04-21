import { useEffect } from '../../../../../../../../shared/modules/React';
// useState
// import Card from '@mui/material/Card';
import {Grid} from '../../../../../../../../shared/modules/MaterialImports/Grid';
import {Dialog, DialogContent, DialogTitle} from '../../../../../../../../shared/modules/MaterialImports/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import CardContent from '@mui/material/CardContent';

// import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

import {Typography} from '../../../../../../../../shared/modules/MaterialImports/Typography';
import {Divider} from '../../../../../../../../shared/modules/MaterialImports/Divider';
// import { Button } from '../../../../../../shared/modules/commonImports';


import { DateTime } from '../../../../../../../../shared/modules/Luxon';

import './ViewCalendarEvent.scss';

const ViewCalendarEvent = (
    { calendarData, open, closePopup, eventData }: {
        calendarData: any;
        open: boolean;
        closePopup: () => void;
        eventData?: any;
    }
) => {


    // console.log(eventData)
    const eventInitialValues = {
        title: eventData.summary,
        description: eventData.description,
        startDate: (eventData.start_date) ?
            DateTime.fromFormat(eventData.start_date.replace('T', ' '), 'yyyy-MM-dd hh:mm:ss').toFormat('MM/dd/yyyy hh:mm')
            :
            DateTime.now().set({ hour: 9, minute: 30 }).plus({ day: 1 }).toFormat('MM/dd/yyyy hh:mm'), // start_date
        endDate: (eventData.end_date) ?
            DateTime.fromFormat(eventData.end_date.replace('T', ' '), 'yyyy-MM-dd hh:mm:ss').toFormat('MM/dd/yyyy hh:mm')
            :
            DateTime.now().plus({ days: 7 }).set({ hour: 17, minute: 30 }).plus({ day: 1 }).toFormat('MM/dd/yyyy hh:mm'), // end_date
        locationDescription: eventData.location,
        conferencing: eventData.providerid,
        zoomLink: eventData.join_url,
        calendarId: eventData.calendarId,
        duration: eventData.duration,
    }

    useEffect(() => {

    }, [])


    const handleClose = () => {
    };

    // const handleListItemClick = (stage: any) => {
    //     onClose(stage);
    // };

    return (
        <Dialog
            maxWidth={'xl'}
            // sx={{ width: 900, maxWidth: 900, minWidth: 900 }}
            fullWidth={false}
            onClose={handleClose} open={open} className='ViewCalendarEvent'
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
                    <span>
                        {eventInitialValues.title}
                    </span>
                    <span onClick={() => closePopup()} className="closePopup">
                        <CloseIcon />
                    </span>
                </Grid>
            </DialogTitle>
            <Divider />
            <DialogContent
                sx={{
                    width: '740px',
                    minHeight: '320px',
                    maxHeight: '70vh'
                }}
            >
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="flex-start"
                >
                    {/* <Typography variant="h3">
                        {eventInitialValues.title}
                    </Typography> */}
                    <Typography variant="body1">
                        {eventInitialValues.description}
                    </Typography>
                    <div className='py-2'>
                        {eventInitialValues.startDate} - {eventInitialValues.endDate}
                    </div>
                    <Typography variant="body1">
                        {eventInitialValues.locationDescription}
                    </Typography>
                    <Typography variant="body1">
                        {
                            (eventInitialValues.conferencing === "ms_teams")
                                ?
                                "Microsoft Teams"
                                :
                                (eventInitialValues.conferencing === "zoom")
                                    ?
                                    `Zoom  -  ${eventInitialValues.zoomLink}`
                                    :
                                    ""
                        }
                    </Typography>
                    <Typography variant="body1">
                        {/* {eventInitialValues.calendarId} */}
                    </Typography>
                    <Typography variant="body1">
                        {eventInitialValues.duration}
                    </Typography>


                </Grid>
            </DialogContent>
            {/* <Divider />
            <DialogActions>
                <Button
                    variant='contained'
                    startIcon={<SaveIcon />}
                    // onClick={saveNewHireForm}
                    size={'small'}
                    type='submit'
                >
                    Next
                </Button>
            </DialogActions> */}
        </Dialog>
    );
}
export default ViewCalendarEvent;