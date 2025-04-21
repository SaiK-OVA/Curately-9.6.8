import TextField from '@mui/material/TextField';
import { PatternFormat } from 'react-number-format';
const NumberFormatCustom = (props: any) => {
  const { inputRef, onChange, ...other } = props;
  return (
    <PatternFormat
      {...other}
      getInputRef={inputRef}
      format="(###) ###-####"
      mask="_"
      onValueChange={(values: any) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      isNumericString
    />
  );
};

const PhoneInput = (props: any) => {
  return (
    <TextField
      {...props}
      size='small'
      slotProps={{
        input: {
          inputComponent: NumberFormatCustom,
        },
      }}
    />
  );
};
export default PhoneInput;
