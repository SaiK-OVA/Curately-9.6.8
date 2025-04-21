import { useEffect, useState } from '../../../../../../shared/modules/React';
import { Filter, Option } from '../AddFilters'; // Import the shared type definitions
import {Select, RadioGroup, Radio} from '../../../../../../shared/modules/MaterialImports/FormElements';
import {MenuItem} from '../../../../../../shared/modules/MaterialImports/Menu';
import {TextField, FormControl, FormControlLabel} from '../../../../../../shared/modules/MaterialImports/FormInputs';
import {Button, Grid} from '../../../../../../shared/modules/commonImports';

import {Box} from "../../../../../../shared/modules/MaterialImports/Box";
import {Typography} from "../../../../../../shared/modules/MaterialImports/Typography";
import { SelectChangeEvent } from '@mui/material/Select';

import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import FilterRow from './FilterRow';

// import InputLabel from '@mui/material/InputLabel';

type FilterLogicProps = {
  filters: Filter[];
  setFilters: React.Dispatch<React.SetStateAction<Filter[]>>;
};

const FilterLogic: React.FC<FilterLogicProps> = ({ filters, setFilters }) => {
  const [filterValues, setFilterValues] = useState<{ [id: string]: string }>(() => {
    return filters.reduce<{ [id: string]: string }>((acc, filter) => {
      acc[filter.id] = filter.value || '';
      return acc;
    }, {});
  });
  const [conditions, setConditions] = useState(() => {
    return new Array(filters.length).fill('');
  });

  useEffect(() => {

    setFilterValues(currentFilterValues => {
      const newFilterValues = { ...currentFilterValues };
      filters.forEach(filter => {
        if (newFilterValues[filter.id] === undefined) {
          newFilterValues[filter.id] = filter.value || '';
        }
      });
      return newFilterValues;
    });
  }, [filters]);
  const handleSetCondition = (index: number, condition: string) => {
    const newConditions = [...conditions];
    newConditions[index] = condition;
    setConditions(newConditions);
  };


  const handleTextChange = (id: string, newValue: string) => {

    setFilterValues(prev => ({ ...prev, [id]: newValue }));

    setFilters(filters.map(filter => filter.id === id ? { ...filter, value: newValue } : filter));
  };

  const handleSelectChange = (index: number, event: SelectChangeEvent) => {
    const newCondition = event.target.value;
    setConditions(prevConditions => {
      const newConditions = [...prevConditions];
      newConditions[index] = newCondition;
      return newConditions;
    });
    setFilters(prevFilters => {
      return prevFilters.map((filter, idx) =>
        idx === index ? { ...filter, condition: newCondition } : filter
      );
    });
  };
  const handleDateChange = (id: string, newValue: any) => {

    setFilterValues(prevValues => ({
      ...prevValues,
      [id]: newValue ? newValue.toString() : ''
    }));

    setFilters(prevFilters => prevFilters.map(filter =>
      filter.id === id ? { ...filter, value: newValue ? newValue.toString() : '' } : filter
    ));
  };


  const renderFilter = (filter: Filter, index: number) => {
    switch (filter.type) {

      case 'Date':
        return (
          <>
            <FormControl>
              <Select
                value={conditions[index]}
                size="small"

                sx={{ width: "221px" }}

                onChange={(event) => handleSelectChange(index, event)}
              >
                <MenuItem value="equal">is on</MenuItem>
                <MenuItem value="not_equal">is not on</MenuItem>
                <MenuItem value="<">is before</MenuItem>
                <MenuItem value=">">is after</MenuItem>
                <MenuItem value="<=">is before or on</MenuItem>
                <MenuItem value=">=">is after or on</MenuItem>
              </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Select date"
                // Adjust the format as needed
                slotProps={{ textField: { size: 'small' } }}
                sx={{ width: "250px" }}
                value={filterValues[filter.id]}
                onChange={(newValue) => handleDateChange(filter.id, newValue)}

              />
            </LocalizationProvider>
          </>
        ); case 'Boolean':
        return (
          <>
            Equals
            <FormControl component="fieldset" sx={{ width: "221px" }}>
              <RadioGroup
                row
                value={filterValues[filter.id]}
                onChange={(event) => handleTextChange(filter.id, event.target.value)}
              >
                <FormControlLabel value="true" control={<Radio color="primary" />} label="Yes" />
                <FormControlLabel value="false" control={<Radio color="primary" />} label="No" />
              </RadioGroup>
            </FormControl>
          </>
        );




      case 'String':
        return (
          <>
            <FormControl>
              {/* <InputLabel id="demo-multiple-name-label" >Condition</InputLabel> */}
              <Select
                value={conditions[index]}
                size="small"

                sx={{ width: "221px" }}
                onChange={(event) => handleSelectChange(index, event)}
              //   sx={{ mr: 5, width: 100 }}
              >
                <MenuItem value="contains">contains</MenuItem>
                <MenuItem value="!contains">does not contain</MenuItem>
                <MenuItem value="starts_with">starts with</MenuItem>
                <MenuItem value="ends_with">ends with</MenuItem>
                <MenuItem value="equal">is exactly</MenuItem>
                <MenuItem value="not_equal">is not exactly</MenuItem>

              </Select>
            </FormControl>
            <TextField
              value={filter.value}
              onChange={(event) => handleTextChange(filter.id, event.target.value)}
              size="small"
              label="Enter value"
              type={filter.type === 'String' ? 'text' : ''}
              sx={{ width: "250px" }}
            />
          </>
        );
      case 'Number':
        return (
          <>
            <FormControl>
              {/* <InputLabel id="demo-multiple-name-label" >Condition</InputLabel> */}
              <Select
                value={filter.value as string}
                size="small"

                sx={{ width: "221px" }}
                onChange={(event) => handleSelectChange(index, event)}
              //   sx={{ mr: 5, width: 100 }}
              >
                <MenuItem value="equal">is equal to</MenuItem>
                <MenuItem value="not_equal">is not equal to</MenuItem>
                <MenuItem value="<">is lower than</MenuItem>
                <MenuItem value=">">is greater than</MenuItem>
                <MenuItem value="<=">is lower or equal to</MenuItem>
                <MenuItem value=">=">is greater or equal to</MenuItem>

              </Select>
            </FormControl>
            <TextField
              value={filter.value}
              onChange={(event) => handleTextChange(filter.id, event.target.value)}
              label="Enter value"
              size="small"
              sx={{ width: "250px" }}
              type={filter.type === 'Number' ? 'number' : 'text'}
            />
          </>

        );

      default:
        return null;
    }
  };

  return (
    <div>
      <Box>
        {/* <Typography variant="h6">Selected Filters</Typography> */}
        {/* Render the filter rows */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, }} >
          <Grid spacing={2} > <Typography>Filter Logic</Typography></Grid>
          {filters.map((filter, index) => (
            (index === 0) ? <Grid> <Button variant="outlined">{index + 1} </Button></Grid> : <Grid> <label>AND <Button variant="outlined">{index + 1} </Button></label></Grid>
          ))}
        </Box>
        <Grid className='routerHeight' sx={{ maxHeight: 280, overflow: 'scroll', marginTop: "5px" }}>
          {filters.map((filter, index) => (
            <FilterRow key={filter.id} number={index + 1}
              label={filter.label}
              condition={conditions[index]}
              setCondition={(condition) => handleSetCondition(index, condition)}

            >
              {renderFilter(filter, index)}
            </FilterRow>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default FilterLogic;
