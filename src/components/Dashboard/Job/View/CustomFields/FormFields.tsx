import {React} from '../../../../../shared/modules/React';
import {TextField, FormControlLabel} from '../../../../../shared/modules/MaterialImports/FormInputs';
import {Checkbox} from '../../../../../shared/modules/MaterialImports/FormElements';

import {Grid} from '../../../../../shared/modules/MaterialImports/Grid';
import { DatePicker, LocalizationProvider, AdapterLuxon } from '../../../../../shared/modules/MaterialImports/DatePicker';

interface Field {
    controlType: string;
    fieldNumber: string;
    caption: string;
}

const FormFields: React.FC<{ fields: Field[] }> = ({ fields }) => {
    const textFields = fields.filter((field) => field.controlType === 'T');
    const dateFields = fields.filter((field) => field.controlType === 'D');
    const numericFields = fields.filter((field) => field.controlType === 'N');
    const checkboxes = fields.filter((field) => field.controlType === 'L');

    return (
        <div className='customCard'>
            <Grid container spacing={2} sx={{ m: 0 }}>

                <Grid container direction="column" spacing={1} size={6} >
                    {textFields.map((field) => (
                        <Grid size={2} key={field.fieldNumber} sx={{

                            '.MuiGrid-item': {
                                padding: '1px',
                            },
                        }}>
                            <TextField
                                key={field.fieldNumber}
                                type="text"
                                label={field.caption}
                                fullWidth
                                size="small"

                            />

                        </Grid>
                    ))}
                </Grid>


                <Grid size={3} padding='5px'>
                    {numericFields.map((field) => (

                        <div key={field.fieldNumber}>
                            <TextField
                                key={field.fieldNumber}
                                type="text"
                                label={field.caption}
                                fullWidth
                                size="small"
                                sx={{ padding: '5px' }}
                            />
                        </div>
                    ))}
                </Grid>


                <Grid size={3} >

                    {dateFields.map((field) => (
                        <div key={field.caption}>
                            <LocalizationProvider dateAdapter={AdapterLuxon} >
                                <DatePicker label={field.caption} slotProps={{ textField: { size: 'small' } }} sx={{ padding: '5px' }} />
                            </LocalizationProvider>
                        </div>
                    ))}
                </Grid>


                <Grid container item size={12} justifyContent="center">
                    {checkboxes.map((field) => (
                        <Grid key={field.fieldNumber} item size={6} sm={4} md={3} lg={2}>
                            <FormControlLabel control={<Checkbox />} label={field.caption} />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </div>
    );
};

export default FormFields;
