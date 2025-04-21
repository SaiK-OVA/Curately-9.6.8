import {React} from '../../../../../../../shared/modules/React';
import {Box} from '../../../../../../../shared/modules/MaterialImports/Box';
import {TextField} from '../../../../../../../shared/modules/MaterialImports/TextField';
// import { styled } from '@mui/material/styles';

import {Popover} from '../../../../../../../shared/modules/MaterialImports/Popover';
import "./modal.scss"

interface PopperProps {
    anchorEl: any;
    handleClose: (value: any) => void,
    inputValue: string;
    handleBtnTextChange: (value: any) => any
    handlePageTextChange: (value: any) => any
    pageValue: string;
    valueType: any;
}

const PopperComponent: React.FC<PopperProps> = ({ anchorEl, handleClose, inputValue, handleBtnTextChange, handlePageTextChange, pageValue, valueType }) => {
    // console.log(valueType, 'valueType', inputValue)
    const open = Boolean(anchorEl);
    // const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const [textValue, setTextValue] = React.useState(inputValue)
    const [textPageValue, setTextPageValue] = React.useState(pageValue)

    const handlePopperClose = () => {
        handleClose(null);
        // setTextValue("")
    };
    const handleTextChange = (e: any) => {
        setTextValue(e.target.value);

        handleBtnTextChange(e.target.value)

    }

    const handlePageChange = (e: any) => {
        setTextPageValue(e.target.value);

        handlePageTextChange(e.target.value)

    }


    return (
        <Box>
            <Popover open={open} anchorEl={anchorEl} onClose={handlePopperClose} anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }} >
                <Box sx={{ padding: "10px 8px 5px 8px" }}>
                    {valueType === "button" ? <>
                        <Box className="box-label">Button Label</Box><TextField
                            value={textValue} onChange={handleTextChange}
                            className='text-cls' size="small"
                            sx={{
                                '& .MuiInputBase-input.MuiOutlinedInput-input': {
                                    color: '#1A1A1A',
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    fontFamily: 'Segoe UI',
                                },
                                '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'var(--c-primary-color)',
                                },
                                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'var(--c-primary-color)',
                                    borderWidth: '2px',
                                },
                            }}
                        />
                    </> : <TextField
                        value={textPageValue} onChange={handlePageChange}
                        className='text-cls' size="small"
                        sx={{
                            '& .MuiInputBase-input.MuiOutlinedInput-input': {
                                color: '#1A1A1A',
                                fontSize: '14px',
                                fontWeight: 600,
                                fontFamily: 'Segoe UI',
                            },
                            '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'var(--c-primary-color)',
                            },
                            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'var(--c-primary-color)',
                                borderWidth: '2px',
                            },
                        }}
                    />}

                </Box>
            </Popover>
        </Box>
    )
}

export default PopperComponent