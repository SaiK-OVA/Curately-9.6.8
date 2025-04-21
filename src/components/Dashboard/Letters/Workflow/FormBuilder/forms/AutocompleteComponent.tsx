import { React, useState, useEffect } from "../../../../../../shared/modules/React"
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import { InputAdornment, TextField } from '../../../../../../shared/modules/commonImports';
import Autocomplete from '@mui/material/Autocomplete';
import Paper from '@mui/material/Paper';
import { Box } from '../../../../../../shared/modules/MaterialImports/Box';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


import "./form.scss"

interface AutoProps {
    field?: any;
    changeHandlerFn?: any;
    name: any;
    getSelectedValue: (value: any, id: any) => void;
    dropdownValue: any
}

const AutocompleteComponent: React.FC<AutoProps> = ({ field, changeHandlerFn, name, getSelectedValue, dropdownValue }) => {
    const [openAutoComplete, setOpenAutoComplete] = useState(false);
    const closePopper = () => setOpenAutoComplete(false);
    const openPopper = () => setOpenAutoComplete(true);
    const [optionsData, setOptionsData] = useState(field.options);
    const [optionVal, setOptionValue] = useState("")

    const selectValue = (e: any, value: any) => {
        setOptionValue(value || "")
        getSelectedValue(value || "", field.id)
    }

    useEffect(() => {
        if (dropdownValue) {
            setOptionValue(dropdownValue)
        }
    }, [dropdownValue])

    return (
        <Autocomplete
            open={openAutoComplete}
            onOpen={openPopper}
            onClose={closePopper}
            slotProps={{
                paper: {
                    component: ({ children }) => {
                        return (
                            <Paper sx={{ width: "100%", position: "relative", borderRadius: "0px", fontSize: "13px" }}>
                                {children}
                            </Paper>
                        )
                    }
                }
            }}
            sx={{ overflowX: "hidden !important" }}
            id={name}
            onChange={(e: any, value) => {
                changeHandlerFn(field.id?.toString(), e.target.value);
                selectValue(e, value)
            }}
            value={optionVal}
            // freeSolo
            fullWidth
            options={optionsData?.map((option: any) => option)}
            renderOption={(props, option: any, { inputValue }) => {
                const matches = match(option, inputValue, { insideWords: true });
                const parts = parse(option, matches);
                return (
                    <>

                        <li {...props}>
                            <Box sx={{
                                width: "100%", textTransform: "capitalize"
                            }}>
                                {parts.map((part, index) => (
                                    <span
                                        key={index}
                                        style={{
                                            fontWeight: part.highlight ? 700 : 400,
                                        }}
                                    >
                                        {part.text}
                                    </span>
                                ))}
                            </Box>
                        </li>




                    </>
                );
            }}

            renderInput={(params) =>
                <TextField
                    {...params}

                    name={name}
                    variant="standard"
                    placeholder="Type or select an option"

                    sx={{
                        '& .MuiInputBase-input.MuiOutlinedInput-input': {
                            padding: '5px 10px',
                            height: "10px"

                        },

                        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#E6E6E6',

                        },
                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#E6E6E6',



                        },

                        borderBottom: "1px solid #08adff",
                    }}
                    slotProps={{
                        input: {
                            ...params.InputProps,
                            endAdornment: (
                                <InputAdornment position="end">
                                    <KeyboardArrowDownIcon sx={{ cursor: 'pointer', color: '#08adff', position: "absolute", right: 0 }} onClick={() => {

                                        setOpenAutoComplete(true)
                                    }} />
                                </InputAdornment>
                            )
                        }
                    }}
                />}
            clearOnBlur
            clearOnEscape

        />
    )
}


export default AutocompleteComponent