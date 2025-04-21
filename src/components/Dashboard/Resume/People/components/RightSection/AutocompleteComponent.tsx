import  {React, useState, useEffect } from "../../../../../../shared/modules/React";

// import InputAdornment from '@mui/material/InputAdornment';
import Autocomplete from '@mui/material/Autocomplete';
import Paper from '@mui/material/Paper';
// import Box from '@mui/material/Box';
import {TextField} from '../../../../../../shared/modules/MaterialImports/TextField';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import apiService from "../../shared/api/apiService";


interface AutoProps {
    getFromOption: (value: any) => void
}

const AutocompleteComponent: React.FC<AutoProps> = ({ getFromOption }) => {
    const [fromValue, setFromValue] = useState("")
    const [fromOptions, setFromOptions] = useState([])
    const handleTextInputChange = async (e: any) => {
        if (e.target.value === "") {
            getFromOption({ id: '', label: '' })
        }
        try {
            let resp = await apiService.getFromList(e.target.value)
            if (resp?.data) {
                setFromOptions(resp.data)
            }
        }
        catch (e) {

        }
    }

    useEffect(() => {
        const getList = async () => {
            try {
                let resp = await apiService.getFromList("")
                if (resp?.data) {
                    setFromOptions(resp.data)
                    getFromOption(resp.data[0])
                    setFromValue(resp.data[0])
                }
            }
            catch (e) {

            }
        }
        getList()
    }, [])

    return (
        <Autocomplete
            size="small"
            freeSolo
            id="free-solo-2-demo"
            disableClearable
            options={fromOptions.map((option: any) => option)}
            clearIcon={false}
            PaperComponent={({ children }) => {
                return (
                    <Paper sx={{ width: "100%", position: "relative", borderRadius: "0px", fontSize: "13px", fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', }}>
                        {children}
                    </Paper>
                )
            }}
            sx={{
                '& .MuiAutocomplete-option': {
                    fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                }
            }}
            value={fromValue}
            onChange={(e, value) => {
                // changeHandler.handleChange(e)
                getFromOption(value)
                setFromValue(value)
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    hiddenLabel
                    InputProps={{
                        ...params.InputProps,
                        type: 'search',
                        sx: {
                            color: '#1A1A1A',
                            fontSize: '14px',
                            padding: "2px 10px",
                            fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                            fontWeight: 600,
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#146EF6",
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#146EF6",
                                borderWidth: "1px",
                            },

                        },
                    }}
                    onChange={handleTextInputChange}

                />
            )}
        />

    )
}


export default AutocompleteComponent