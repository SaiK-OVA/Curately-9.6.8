
import  {React} from '../../../../../../shared/modules/React';
import {Box} from "../../../../../../shared/modules/MaterialImports/Box";

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

import { DateTime } from '../../../../../../shared/modules/Luxon';
import { DatePicker, AdapterLuxon, LocalizationProvider } from '../../../../../../shared/modules/MaterialImports/DatePicker';
import {  } from '@mui/x-date-pickers/AdapterLuxon';
import {  } from '@mui/x-date-pickers/LocalizationProvider';
// import FormOptions from '../../../../../../shared/settings/FormOptions';

interface DateProps {
    name: string;
    value?: any;
    label: any;
    width: string;
    isFromPreview: boolean;
    dateItem: any;
    id: any;
    isReadonly: boolean;
    getDateValue: (value: any, id: any) => void
}
const DateComponent: React.FC<DateProps> = ({ name, value, label, width, isFromPreview, dateItem, getDateValue, id, isReadonly }) => {

    const [dateVal, setDateVal] = React.useState(null)
    const dateFormat: any = sessionStorage.getItem("dateformat") ? sessionStorage.getItem("dateformat") : "MM/dd/yyyy";
    // console.log(dateFormat);
    React.useLayoutEffect(() => {
        if (value) {
            // let newDate: any = new Date(value);
            // let day: any = DateTime.fromISO(newDate);
            let day: any = DateTime.fromFormat(value, 'MM/dd/yyyy');
            setDateVal(day);


        }
    }, [value])

    const handleDateChange = (newValue: any) => {
        getDateValue(newValue, dateItem.id)
    }


    return (
        <>
            {isFromPreview ? <LocalizationProvider dateAdapter={AdapterLuxon} >
                <DemoContainer components={['DatePicker']}>
                    <Box sx={{ width: width }}>
                        <DatePicker label={label} sx={{ width: width, background: "#fff", borderColor: 'blue' }} value={dateVal} slotProps={{ textField: { fullWidth: true, name: name.toString(), id: id.toString(), disabled: isReadonly } }} onChange={handleDateChange} readOnly={isReadonly} format={dateFormat} views={dateFormat === "MM/yyyy" ? ['month', 'year'] : ['year', 'month', 'day']} />
                    </Box>
                </DemoContainer>
            </LocalizationProvider> :
                <LocalizationProvider dateAdapter={AdapterLuxon} >
                    <DemoContainer components={['DatePicker']}>
                        <Box sx={{ width: width }}>
                            <DatePicker label={label} sx={{ width: width, background: "#fff", borderColor: 'blue' }} slotProps={{ textField: { fullWidth: true, name: name.toString(), id: id.toString(), disabled: isReadonly } }} disabled={true} readOnly={isReadonly} format={dateFormat} views={dateFormat === "MM/yyyy" ? ['month', 'year'] : ['year', 'month', 'day']} />
                        </Box>
                    </DemoContainer>
                </LocalizationProvider>}
        </>
    )
}

export default DateComponent;