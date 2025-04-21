import { useState } from '../../../../../../shared/modules/React';
import {Grid, Button} from '../../../../../../shared/modules/commonImports';
import {Dialog, DialogTitle, DialogContent} from '../../../../../../shared/modules/MaterialImports/Dialog';

import './AiSettings.scss'
import { Box } from '../../../../../../shared/modules/MaterialImports/Box';
import { Checkbox, Select } from '../../../../../../shared/modules/MaterialImports/FormElements';
import { Divider } from '../../../../../../shared/modules/MaterialImports/Divider';
import { FormControl, FormControlLabel } from '../../../../../../shared/modules/MaterialImports/FormInputs';
import { MenuItem } from '../../../../../../shared/modules/MaterialImports/Menu';



export interface SimpleDialogProps {
    open: boolean;
    closePopup: () => void;
}

const AiSettings = ({ open, closePopup }: SimpleDialogProps) => {
    //const [open, setOpen] = useState(false);
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const [holiday, setHoliday] = useState('US Holidays');
    const toggleDaySelection = (day: string) => {
        setSelectedDays((prev) =>
            prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
        );
    };
    const [selectedHolidays, setSelectedHolidays] = useState([]);

    const handleChange = (event: { target: { value: any; }; }) => {
        const value = event.target.value;
        setSelectedHolidays(typeof value === 'string' ? value.split(',') : value);
    };


    return (

        <Dialog
            aria-labelledby="customized-dialog-title"
            open={open}
            fullWidth={true}
            className='AiSettings'
            maxWidth={'md'}
        >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                Settings

                <Box
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        display: "flex",
                        gap: 1,
                    }}
                >
                    <Button
                        aria-label="close"
                        color="primary"
                        variant="contained"
                        size="small"
                        onClick={closePopup}
                    >
                        Save changes
                    </Button>
                    <Button
                        aria-label="close"
                        color="secondary"
                        variant="outlined"
                        size="small"
                        onClick={closePopup}
                    >
                        Close
                    </Button>
                </Box>
            </DialogTitle>

            <DialogContent dividers>
                <Grid container className='containerBorder' direction={'row'}>
                    <Grid size={12}>

                        <h3 className="section-title">Timing</h3>
                    </Grid>
                    <Grid size={6}>
                        <p>Only send these days of the week</p>
                        <div className="days-selection">
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                                <button
                                    key={day}
                                    className={selectedDays.includes(day) ? 'selected' : ''}
                                    onClick={() => toggleDaySelection(day)}
                                >
                                    {day}
                                </button>
                            ))}
                        </div>
                    </Grid>
                    <Grid size={5}>
                        <p>Do not send Messages on these holidays</p>
                        <FormControl fullWidth variant="outlined" size="small">
                            <Select
                                multiple
                                value={selectedHolidays}
                                onChange={handleChange}
                                renderValue={(selected) => selected.join(', ')}
                            >
                                <MenuItem value="US Holidays">
                                    <Checkbox checked={selectedHolidays.includes('US Holidays')} />
                                    US Holidays
                                </MenuItem>
                                <MenuItem value="India Holidays">
                                    <Checkbox checked={selectedHolidays.includes('India Holidays')} />
                                    India Holidays
                                </MenuItem>
                                <MenuItem value="Catoholic Cristamas And New Year">
                                    <Checkbox checked={selectedHolidays.includes('Catoholic Cristamas And New Year')} />
                                    Catoholic Cristamas And New Year
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>


                </Grid>
                <Divider />
                <Grid container className='containerBorder' direction={'row'}>
                    <Grid size={12}>

                        <h3 className="section-title">Messaging</h3>
                    </Grid>
                    <div className='messaging'>
                        <Grid size={6}>
                            <p>Send messages as</p>
                            <FormControl fullWidth variant="outlined" size="small">
                                <Select
                                    //labelId="holiday-select-label"
                                    multiple
                                    value={selectedHolidays}
                                    onChange={handleChange}
                                    defaultValue="Personal"
                                    renderValue={(selected) => selected.join(', ')}
                                >
                                    <MenuItem value="Me">
                                        <Checkbox checked={selectedHolidays.includes('Me')} />
                                        Me
                                    </MenuItem>
                                    <MenuItem value="Team">
                                        <Checkbox checked={selectedHolidays.includes('Team')} />
                                        Team
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid size={6}>
                            <p>Who should handle replies?</p>
                            <FormControl fullWidth variant="outlined" size="small">
                                <Select
                                    //labelId="holiday-select-label"
                                    multiple
                                    value={selectedHolidays}
                                    onChange={handleChange}
                                    renderValue={(selected) => selected.join(', ')}
                                >
                                    <MenuItem value="Me">
                                        <Checkbox checked={selectedHolidays.includes('Me')} />
                                        Me
                                    </MenuItem>
                                    <MenuItem value="Team">
                                        <Checkbox checked={selectedHolidays.includes('Team')} />
                                        Team
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </div>


                </Grid>
                <FormControlLabel
                    control={<Checkbox />}
                    label="Track if candidates have opened your email and clicked any links"
                />
                <Divider />
                <Grid container className='containerBorder' direction={'row'}>
                    <Grid size={12}>

                        <h3 className="section-title">Email Finding</h3>
                    </Grid>
                    <div className='messaging'>
                        <Grid size={6}>
                            <p><span style={{ visibility: 'hidden' }}>hello</span><br />Which candidate email type do you prefer?</p>
                            <FormControl fullWidth variant="outlined" size="small">
                                <Select
                                    //labelId="holiday-select-label"
                                    multiple
                                    value={selectedHolidays}
                                    onChange={handleChange}
                                    defaultValue="Personal"
                                    renderValue={(selected) => selected.join(', ')}
                                >
                                    <MenuItem value="Personal">
                                        <Checkbox checked={selectedHolidays.includes('Personal')} />
                                        Personal
                                    </MenuItem>
                                    <MenuItem value="Work">
                                        <Checkbox checked={selectedHolidays.includes('Work')} />
                                        Work
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid size={6}>
                            <p>
                                If the preferred email type for a candidate cannot
                                be found what should we choose?
                            </p>
                            <FormControl fullWidth variant="outlined" size="small">
                                <Select
                                    //labelId="holiday-select-label"
                                    multiple
                                    value={selectedHolidays}
                                    onChange={handleChange}
                                    renderValue={(selected) => selected.join(', ')}
                                >
                                    <MenuItem value="Best available email">
                                        <Checkbox checked={selectedHolidays.includes('Best available email')} />
                                        Best available email
                                    </MenuItem>
                                    <MenuItem value="Skip">
                                        <Checkbox checked={selectedHolidays.includes('Skip')} />
                                        Skip
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </div>
                </Grid>
            </DialogContent>
        </Dialog>
    );
};


export default AiSettings;



