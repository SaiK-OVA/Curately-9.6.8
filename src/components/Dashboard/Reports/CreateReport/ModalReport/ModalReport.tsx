
import  {React} from '../../../../../shared/modules/React';
import {Button, IconButton} from "../../../../../shared/modules/MaterialImports/Button";
import {Dialog, DialogTitle, DialogContent, DialogActions} from '../../../../../shared/modules/MaterialImports/Dialog';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import './ModalReport.scss'
import {Tooltip} from '../../../../../shared/modules/MaterialImports/ToolTip';
import {Divider} from "../../../../../shared/modules/MaterialImports/Divider";
import {Card, CardHeader, CardContent} from '../../../../../shared/modules/MaterialImports/Card';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import ContactPhoneOutlinedIcon from '@mui/icons-material/ContactPhoneOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';

const ModalReport = () => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const reportTypesList = [
        {
            name: "Candidate",
            icon: <PersonOutlineOutlinedIcon />,
            title: "This report has all Candidate Info"
        },
        {
            name: "Company",
            icon: <BusinessOutlinedIcon />,
            title: "This report has all Company Info"
        },
        {
            name: "Job",
            icon: <WorkOutlineOutlinedIcon />,
            title: "This report has all Job Info"
        },
        {
            name: "Contact",
            icon: <ContactPhoneOutlinedIcon />,
            title: "This report has all Contact Info"
        },



    ];
    return (
        <div>
            <Button onClick={handleClickOpen}
                variant="contained" color="primary" size="small">Create Report</Button>
            <Dialog
                maxWidth={'lg'}
                // sx={{ maxWidth: '650px !important' }}
                fullWidth={true} open={open} className='AddCandidateModal customInputs'>
                <DialogTitle
                    className='py-2'
                >Select Report Type</DialogTitle>
                <Divider />
                <DialogContent>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'stretch', padding: '5px' }}>
                        <Tooltip title="">
                            <Card className='box'>
                                <CardHeader
                                    action={
                                        <IconButton>
                                            {reportTypesList[0].icon}
                                        </IconButton>
                                    }
                                    title="Candidate"
                                />
                                <CardContent>
                                    <div>
                                        {reportTypesList[0].icon}
                                    </div>
                                    <div>
                                        {reportTypesList[0].title}
                                    </div>

                                </CardContent>
                            </Card>
                        </Tooltip>
                        <Tooltip title="">
                            <Card className='box'>
                                <CardHeader
                                    action={
                                        <IconButton aria-label="settings">
                                            {reportTypesList[1].icon}
                                        </IconButton>
                                    }
                                    title="Company"
                                />
                                <CardContent>
                                    <div>
                                        {reportTypesList[1].icon}
                                    </div>
                                    <div>
                                        {reportTypesList[1].title}
                                    </div>

                                </CardContent>
                            </Card>
                        </Tooltip>
                        <Tooltip title="">
                            <Card className='box'>
                                <CardHeader
                                    action={
                                        <IconButton aria-label="settings">
                                            {reportTypesList[2].icon}
                                        </IconButton>
                                    }
                                    title="Job"
                                />
                                <CardContent>
                                    <div>
                                        {reportTypesList[2].icon}
                                    </div>
                                    <div>
                                        {reportTypesList[2].title}
                                    </div>

                                </CardContent>
                            </Card>
                        </Tooltip>
                        <Tooltip title="">
                            <Card className='box' >
                                <CardHeader
                                    action={
                                        <IconButton aria-label="settings">
                                            {reportTypesList[3].icon}
                                        </IconButton>
                                    }
                                    title="Contact"
                                />
                                <CardContent>
                                    <div>
                                        {reportTypesList[3].icon}
                                    </div>
                                    <div>
                                        {reportTypesList[3].title}
                                    </div>

                                </CardContent>
                            </Card>
                        </Tooltip>
                    </div>
                </DialogContent>
                <Divider />
                <DialogActions>
                    <Button onClick={handleClose}>
                        Cancel
                    </Button>
                </DialogActions>

            </Dialog>
        </div>
    )
}

export default ModalReport;

