import {React} from "../../../../../../shared/modules/React";
import { Accordion, AccordionDetails, AccordionSummary } from "../../../../../../shared/modules/MaterialImports/Accordion";
import {Box } from "../../../../../../shared/modules/MaterialImports/Box";
import { Button } from "../../../../../../shared/modules/MaterialImports/Button";
import { Stack } from "../../../../../../shared/modules/MaterialImports/Stack";
import { Typography } from "../../../../../../shared/modules/MaterialImports/Typography";
import { TextField } from "../../../../../../shared/modules/MaterialImports/TextField";
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import Autocomplete from '@mui/material/Autocomplete';
import {MenuItem} from "../../../../../../shared/modules/MaterialImports/Menu";
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import {Select} from '../../../../../../shared/modules/MaterialImports/FormElements';
import { SelectChangeEvent } from '@mui/material/Select';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import DragHandleRoundedIcon from '@mui/icons-material/DragHandleRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
// import { ReactSortable } from "react-sortablejs";

const option = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
]

interface EditModalProps {
    handleTableEditClose: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ handleTableEditClose }) => {
    const [accountPhoneStatus, setAccountPhoneStatus] = React.useState('40');
    const [contactPhoneStatus, setContactPhoneStatus] = React.useState('40');
    const [contactPhoneType, setContactPhoneType] = React.useState('50');
    const [field, setField] = React.useState<any[] | never[]>([1]);
    const [idcount, setIdCount] = React.useState(0)
    const [basicExpanded, setBasicExpanded] = React.useState<string | false>('panel1');
    const [additionExpanded, setAdditionExpanded] = React.useState<string | false>('panel2');

    const handleBasicExpand =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setBasicExpanded(newExpanded ? panel : false);
        };

    const handleAdditionExpand =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setAdditionExpanded(newExpanded ? panel : false)
        };

    // const [dataList, setDataList] = React.useState(field);

    // const handleSort = (DataItems: any) => {
    //     setDataList(DataItems);
    // };

    const handleAddField = () => {
        const newField = {
            id: idcount,
            value: ""
        }
        setField([...field, newField])
        setIdCount(idcount + 1)
    }

    const handleFieldChange = (id: any, value: any) => {
        const updatedFields = field.map((field: any) => {
            if (field.id === id) {
                return {
                    ...field,
                    value: value
                }
            }
            return field
        })
        setField(updatedFields)
    }

    const handleDeleteField = (id: any) => {
        const updatedFields = field.filter((field: any) => field.id !== id)
        setField(updatedFields)
    }

    const handleAccountPhoneStatus = (event: SelectChangeEvent) => {
        setAccountPhoneStatus(event.target.value as string);
    };

    const handleContactPhoneStatus = (event: SelectChangeEvent) => {
        setContactPhoneStatus(event.target.value as string);
    };

    const handleContactPhoneType = (event: SelectChangeEvent) => {
        setContactPhoneType(event.target.value as string);
    };
    return (
        <>
            <Stack sx={{ p: 1.5, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography
                    sx={{
                        fontFamily: "Segoe UI",
                        fontWeight: "600",
                        fontSize: "16px",
                    }}
                >
                    Edit Contact
                </Typography>

                <Stack component='div' direction='row' spacing={2}>
                    <Button
                        disableRipple
                        onClick={handleTableEditClose}
                        sx={{
                            textTransform: 'capitalize',
                            fontFamily: "Segoe UI",
                            fontWeight: "600",
                            fontSize: "16px",
                            color: '#146EF6',
                            p: '0px 16px 0px 16px',
                            boxShadow: 0,
                            '&:hover': {
                                backgroundColor: '#f0f0f0',
                                boxShadow: 0,
                            }
                        }}
                    >
                        Cancel
                    </Button>

                    <Button
                        disableRipple
                        variant="contained"
                        sx={{
                            textTransform: 'capitalize',
                            p: '1px 16px 1px 16px',
                            fontFamily: "Segoe UI",
                            fontWeight: "600",
                            fontSize: "16px",
                            backgroundColor: '#919191',
                            boxShadow: 0,
                            '&:hover': {
                                backgroundColor: '#146EF6',
                                boxShadow: 0,
                            }

                        }}
                    >
                        Save Contact
                    </Button>
                </Stack>
            </Stack>

            <Stack sx={{ borderTop: '1px solid #F0F0F0' }}>
                <Accordion sx={{ boxShadow: 0, borderBottom: 0 }} onChange={handleBasicExpand('panel1')} expanded={basicExpanded === 'panel1'}>

                    <Stack sx={{ backgroundColor: '#F7F7F7' }}>
                        <AccordionSummary
                            expandIcon={<ArrowDropDownRoundedIcon sx={{ fontSize: '35px', color: '#146EF6' }} />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography
                                sx={{
                                    fontFamily: "Segoe UI",
                                    fontWeight: "400",
                                    fontSize: "16px",
                                }}
                            >
                                Basic Information
                            </Typography>
                        </AccordionSummary>
                    </Stack>

                    <AccordionDetails>
                        <Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', mb: 1 }}>
                            <Box component='div' sx={{ width: '45%' }}>
                                <Typography
                                    sx={{
                                        fontFamily: "Segoe UI",
                                        fontWeight: "700",
                                        fontSize: "12px",
                                    }}
                                >
                                    First Name
                                </Typography>
                                <TextField
                                    spellCheck='false'
                                    sx={{
                                        width: '100%',
                                        '& .MuiInputBase-input.MuiOutlinedInput-input': {
                                            color: '#1A1A1A',
                                            fontSize: '14px',
                                            fontWeight: 600,
                                            fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                            p: '5px 25px 5px 10px'
                                        },
                                        '& .MuiInputBase-input::placeholder': {
                                            color: '#919191',
                                            fontSize: '14px',
                                            fontWeight: 600,
                                            fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                            opacity: 1,
                                        },
                                        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#146EF6',
                                        },
                                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#146EF6',
                                            borderWidth: '1px',
                                        },
                                    }}
                                />
                            </Box>

                            <Box component='div' sx={{ width: '45%' }}>
                                <Typography
                                    sx={{
                                        fontFamily: "Segoe UI",
                                        fontWeight: "700",
                                        fontSize: "12px",
                                    }}
                                >
                                    Last Name
                                </Typography>
                                <TextField
                                    spellCheck='false'
                                    sx={{
                                        width: '100%',
                                        '& .MuiInputBase-input.MuiOutlinedInput-input': {
                                            color: '#1A1A1A',
                                            fontSize: '14px',
                                            fontWeight: 600,
                                            fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                            p: '5px 25px 5px 10px'
                                        },
                                        '& .MuiInputBase-input::placeholder': {
                                            color: '#919191',
                                            fontSize: '14px',
                                            fontWeight: 600,
                                            fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                            opacity: 1,
                                        },
                                        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#146EF6',
                                        },
                                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#146EF6',
                                            borderWidth: '1px',
                                        },
                                    }}
                                />
                            </Box>
                        </Stack>

                        <Stack sx={{ mb: 1 }}>
                            <Typography
                                sx={{
                                    fontFamily: "Segoe UI",
                                    fontWeight: "700",
                                    fontSize: "12px",
                                }}
                            >
                                Email
                            </Typography>
                            <TextField
                                spellCheck='false'
                                sx={{
                                    '& .MuiInputBase-input.MuiOutlinedInput-input': {
                                        color: '#1A1A1A',
                                        fontSize: '14px',
                                        fontWeight: 600,
                                        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                        p: '5px 25px 5px 10px'
                                    },
                                    '& .MuiInputBase-input::placeholder': {
                                        color: '#919191',
                                        fontSize: '14px',
                                        fontWeight: 600,
                                        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                        opacity: 1,
                                    },
                                    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#146EF6',
                                    },
                                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#146EF6',
                                        borderWidth: '1px',
                                    },
                                }}
                            />

                        </Stack>

                        <Stack sx={{ mb: 1 }}>
                            <Typography
                                sx={{
                                    fontFamily: "Segoe UI",
                                    fontWeight: "700",
                                    fontSize: "12px",
                                }}
                            >
                                Job Title
                            </Typography>
                            <TextField
                                spellCheck='false'
                                sx={{
                                    '& .MuiInputBase-input.MuiOutlinedInput-input': {
                                        color: '#1A1A1A',
                                        fontSize: '14px',
                                        fontWeight: 600,
                                        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                        p: '5px 25px 5px 10px'
                                    },
                                    '& .MuiInputBase-input::placeholder': {
                                        color: '#919191',
                                        fontSize: '14px',
                                        fontWeight: 600,
                                        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                        opacity: 1,
                                    },
                                    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#146EF6',
                                    },
                                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#146EF6',
                                        borderWidth: '1px',
                                    },
                                }}
                            />

                        </Stack>

                        <Stack sx={{ width: '45%', mb: 1, }}>

                            <Typography
                                sx={{
                                    fontFamily: "Segoe UI",
                                    fontWeight: "700",
                                    fontSize: "12px",
                                }}
                            >
                                Account
                            </Typography>

                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        p: 0
                                    },
                                    '& .MuiAutocomplete-popupIndicator': {
                                        transform: "unset",
                                        color: "#737373",
                                        '& .MuiTouchRipple-root': {
                                            display: 'none',
                                        },
                                        '&:hover': {
                                            backgroundColor: '#ffffff'
                                        }
                                    },
                                    '& .MuiAutocomplete-clearIndicator': {
                                        visibility: 'visible',
                                        '&:hover': {
                                            backgroundColor: '#ffffff'
                                        }
                                    }


                                }}
                                options={option}
                                renderInput={(params) => <TextField {...params}
                                    sx={{

                                        '& .MuiInputBase-input.MuiOutlinedInput-input': {
                                            color: '#1A1A1A',
                                            fontSize: '14px',
                                            fontWeight: 600,
                                            fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                            p: '7px'
                                        },
                                        '& .MuiInputBase-input::placeholder': {
                                            color: '#919191',
                                            fontSize: '14px',
                                            fontWeight: 600,
                                            fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                            opacity: 1,
                                        },
                                        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#146EF6',
                                        },
                                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#146EF6',
                                            borderWidth: '1px'
                                        },
                                    }}
                                />}
                            />
                        </Stack>

                        <Stack sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>

                            <Box sx={{ width: '45%' }}>
                                <Typography
                                    sx={{
                                        fontFamily: "Segoe UI",
                                        fontWeight: "700",
                                        fontSize: "12px",
                                    }}
                                >
                                    Contact Stage
                                </Typography>

                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            p: 0
                                        },
                                        '& .MuiAutocomplete-popupIndicator': {
                                            transform: "unset",
                                            color: "#737373",
                                            '& .MuiTouchRipple-root': {
                                                display: 'none',
                                            },
                                            '&:hover': {
                                                backgroundColor: '#ffffff'
                                            }
                                        },
                                        '& .MuiAutocomplete-clearIndicator': {
                                            visibility: 'visible',
                                            '&:hover': {
                                                backgroundColor: '#ffffff'
                                            }
                                        }


                                    }}
                                    options={option}
                                    renderInput={(params) => <TextField {...params}
                                        sx={{

                                            '& .MuiInputBase-input.MuiOutlinedInput-input': {
                                                color: '#1A1A1A',
                                                fontSize: '14px',
                                                fontWeight: 600,
                                                fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                                p: '7px'
                                            },
                                            '& .MuiInputBase-input::placeholder': {
                                                color: '#919191',
                                                fontSize: '14px',
                                                fontWeight: 600,
                                                fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                                opacity: 1,
                                            },
                                            '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#146EF6',
                                            },
                                            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#146EF6',
                                                borderWidth: '1px'
                                            },
                                        }}
                                    />}
                                />
                            </Box>

                            <Box sx={{ width: '45%' }}>
                                <Typography
                                    sx={{
                                        fontFamily: "Segoe UI",
                                        fontWeight: "700",
                                        fontSize: "12px",
                                    }}
                                >
                                    Contact Owner
                                </Typography>

                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            p: 0
                                        },
                                        '& .MuiAutocomplete-popupIndicator': {
                                            transform: "unset",
                                            color: "#737373",
                                            '& .MuiTouchRipple-root': {
                                                display: 'none',
                                            },
                                            '&:hover': {
                                                backgroundColor: '#ffffff'
                                            }
                                        },
                                        '& .MuiAutocomplete-clearIndicator': {
                                            visibility: 'visible',
                                            '&:hover': {
                                                backgroundColor: '#ffffff'
                                            }
                                        }


                                    }}
                                    options={option}
                                    renderInput={(params) => <TextField {...params}
                                        sx={{

                                            '& .MuiInputBase-input.MuiOutlinedInput-input': {
                                                color: '#1A1A1A',
                                                fontSize: '14px',
                                                fontWeight: 600,
                                                fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                                p: '7px'
                                            },
                                            '& .MuiInputBase-input::placeholder': {
                                                color: '#919191',
                                                fontSize: '14px',
                                                fontWeight: 600,
                                                fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                                opacity: 1,
                                            },
                                            '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#146EF6',
                                            },
                                            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#146EF6',
                                                borderWidth: '1px'
                                            },
                                        }}
                                    />}
                                />
                            </Box>
                        </Stack>
                    </AccordionDetails>
                </Accordion>
            </Stack>

            <Stack sx={{ borderTop: '1px solid #F0F0F0', }}>
                <Accordion sx={{ boxShadow: 0 }}
                    onChange={handleAdditionExpand('panel2')}
                    expanded={additionExpanded === 'panel2'}
                >

                    <Stack sx={{ backgroundColor: '#F7F7F7' }}>
                        <AccordionSummary
                            expandIcon={<ArrowDropDownRoundedIcon sx={{ fontSize: '35px', color: '#146EF6' }} />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography
                                sx={{
                                    fontFamily: "Segoe UI",
                                    fontWeight: "400",
                                    fontSize: "16px",
                                }}
                            >
                                Additional Information
                            </Typography>
                        </AccordionSummary>
                    </Stack>

                    <AccordionDetails>
                        <Stack sx={{ width: '100%', mb: 2 }}>
                            <Typography
                                sx={{
                                    fontFamily: "Segoe UI",
                                    fontWeight: "700",
                                    fontSize: "12px",
                                }}
                            >
                                Account Phone <Box component='span'
                                    sx={{
                                        fontFamily: "Segoe UI",
                                        fontWeight: "400",
                                        fontSize: "12px",
                                    }}>
                                    (When saved, this number will also update at the Account level.)
                                </Box>
                            </Typography>
                            <Box component='div'
                                sx={{
                                    width: '97%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #CACACC',
                                    p: 1, borderRadius: '3px', boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.09)'
                                }}>
                                <TextField
                                    spellCheck='false'
                                    sx={{
                                        width: '60%',
                                        '& .MuiInputBase-input.MuiOutlinedInput-input': {
                                            color: '#1A1A1A',
                                            fontSize: '14px',
                                            fontWeight: 600,
                                            fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                            p: '5px 25px 5px 10px'
                                        },
                                        '& .MuiInputBase-input::placeholder': {
                                            color: '#919191',
                                            fontSize: '14px',
                                            fontWeight: 600,
                                            fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                            opacity: 1,
                                        },


                                    }}
                                    placeholder="Type phone number"

                                />

                                <Box sx={{
                                    width: '35%',

                                }}>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={accountPhoneStatus}
                                        onChange={handleAccountPhoneStatus}
                                        sx={{
                                            width: '100%',
                                            '& .MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input': {
                                                p: '5px 1px 5px 5px',
                                                display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '5px'
                                            },
                                        }}
                                    >


                                        <MenuItem
                                            disableRipple
                                            sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '5px' }} value={10}>

                                            <CheckCircleRoundedIcon
                                                sx={{
                                                    color: '#1DB268',
                                                    fontSize: '20px'
                                                }}
                                            />
                                            <Typography
                                                sx={{
                                                    fontFamily: "Segoe UI",
                                                    fontWeight: "600",
                                                    fontSize: "16px",
                                                }}
                                            >
                                                Verified
                                            </Typography>
                                        </MenuItem>

                                        <MenuItem
                                            disableRipple
                                            sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '5px' }} value={20}>

                                            <HelpRoundedIcon
                                                sx={{
                                                    color: '#EB7A2F',
                                                    fontSize: '20px'
                                                }}
                                            />
                                            <Typography
                                                sx={{
                                                    fontFamily: "Segoe UI",
                                                    fontWeight: "600",
                                                    fontSize: "16px",
                                                }}
                                            >
                                                Questionable
                                            </Typography>
                                        </MenuItem>

                                        <MenuItem
                                            disableRipple
                                            sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '5px' }} value={30}>

                                            <InfoRoundedIcon
                                                sx={{
                                                    color: 'red',
                                                    fontSize: '20px'
                                                }}
                                            />
                                            <Typography
                                                sx={{
                                                    fontFamily: "Segoe UI",
                                                    fontWeight: "600",
                                                    fontSize: "16px",
                                                }}
                                            >
                                                Invalid
                                            </Typography>
                                        </MenuItem>

                                        <MenuItem
                                            disableRipple
                                            sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '5px' }} value={40}>

                                            <HelpRoundedIcon
                                                sx={{
                                                    color: '#CACACC',
                                                    fontSize: '20px'
                                                }}
                                            />
                                            <Typography
                                                sx={{
                                                    fontFamily: "Segoe UI",
                                                    fontWeight: "600",
                                                    fontSize: "16px",
                                                }}
                                            >
                                                No Status
                                            </Typography>
                                        </MenuItem>

                                    </Select>
                                </Box>
                            </Box>
                        </Stack>




                        <Stack sx={{ width: '100%', mb: 2 }}>
                            <Typography
                                sx={{
                                    fontFamily: "Segoe UI",
                                    fontWeight: "700",
                                    fontSize: "12px",
                                }}
                            >
                                Contact Phones
                            </Typography>



                            {field.map((field) => (

                                <Box component='div'
                                    key={field}
                                    sx={{
                                        width: '97%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', border: '1px solid #CACACC',
                                        p: 1, borderRadius: '3px', boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.09)', mb: 1
                                    }}>

                                    <Box sx={{ width: '5%' }}>
                                        <DragHandleRoundedIcon />
                                    </Box>

                                    <TextField
                                        onChange={(e: any) => handleFieldChange(field.id, e.target.value)}
                                        spellCheck='false'
                                        sx={{
                                            width: '25%',
                                            '& .MuiInputBase-input.MuiOutlinedInput-input': {
                                                color: '#1A1A1A',
                                                fontSize: '14px',
                                                fontWeight: 600,
                                                fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                                p: '5px 25px 5px 10px'
                                            },
                                            '& .MuiInputBase-input::placeholder': {
                                                color: '#919191',
                                                fontSize: '14px',
                                                fontWeight: 600,
                                                fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                                opacity: 1,
                                            },
                                            '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#146EF6',
                                            },
                                            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#146EF6',
                                                borderWidth: '1px'
                                            },
                                        }}
                                        placeholder="Type phone number"
                                    />

                                    <Box sx={{
                                        width: '30%',

                                    }}>
                                        <Select

                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={contactPhoneType}
                                            onChange={handleContactPhoneType}
                                            sx={{
                                                width: '100%',
                                                '& .MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input': {
                                                    p: '5px 1px 5px 5px',
                                                    display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '5px'
                                                },

                                            }}
                                        >


                                            <MenuItem
                                                disableRipple
                                                value={10}>
                                                <Typography
                                                    sx={{
                                                        fontFamily: "Segoe UI",
                                                        fontWeight: "600",
                                                        fontSize: "16px",
                                                    }}
                                                >
                                                    Mobile
                                                </Typography>
                                            </MenuItem>

                                            <MenuItem
                                                disableRipple
                                                value={20}>

                                                <Typography
                                                    sx={{
                                                        fontFamily: "Segoe UI",
                                                        fontWeight: "600",
                                                        fontSize: "16px",
                                                    }}
                                                >
                                                    Work - Direct
                                                </Typography>
                                            </MenuItem>

                                            <MenuItem
                                                disableRipple
                                                value={30}>
                                                <Typography
                                                    sx={{
                                                        fontFamily: "Segoe UI",
                                                        fontWeight: "600",
                                                        fontSize: "16px",
                                                    }}
                                                >
                                                    Corporate Phone
                                                </Typography>
                                            </MenuItem>

                                            <MenuItem
                                                disableRipple
                                                value={40}>
                                                <Typography
                                                    sx={{
                                                        fontFamily: "Segoe UI",
                                                        fontWeight: "600",
                                                        fontSize: "16px",
                                                    }}
                                                >
                                                    Home
                                                </Typography>
                                            </MenuItem>

                                            <MenuItem
                                                disableRipple
                                                value={50}>
                                                <Typography
                                                    sx={{
                                                        fontFamily: "Segoe UI",
                                                        fontWeight: "600",
                                                        fontSize: "16px",
                                                    }}
                                                >
                                                    Other
                                                </Typography>
                                            </MenuItem>
                                        </Select>
                                    </Box>


                                    <Box sx={{
                                        width: '30%',

                                    }}>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={contactPhoneStatus}
                                            onChange={handleContactPhoneStatus}
                                            sx={{
                                                width: '100%',
                                                '& .MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input': {
                                                    p: '5px 1px 5px 5px',
                                                    display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '5px'
                                                },
                                                '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: '#146EF6',
                                                },
                                                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: '#146EF6',
                                                    borderWidth: '1px'
                                                },


                                            }}
                                        >


                                            <MenuItem
                                                disableRipple
                                                sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '5px' }} value={10}>

                                                <CheckCircleRoundedIcon
                                                    sx={{
                                                        color: '#1DB268',
                                                        fontSize: '20px'
                                                    }}
                                                />
                                                <Typography
                                                    sx={{
                                                        fontFamily: "Segoe UI",
                                                        fontWeight: "600",
                                                        fontSize: "16px",
                                                    }}
                                                >
                                                    Verified
                                                </Typography>
                                            </MenuItem>

                                            <MenuItem
                                                disableRipple
                                                sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '5px' }} value={20}>

                                                <HelpRoundedIcon
                                                    sx={{
                                                        color: '#EB7A2F',
                                                        fontSize: '20px'
                                                    }}
                                                />
                                                <Typography
                                                    sx={{
                                                        fontFamily: "Segoe UI",
                                                        fontWeight: "600",
                                                        fontSize: "16px",
                                                    }}
                                                >
                                                    Questionable
                                                </Typography>
                                            </MenuItem>

                                            <MenuItem
                                                disableRipple
                                                sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '5px' }} value={30}>

                                                <InfoRoundedIcon
                                                    sx={{
                                                        color: 'red',
                                                        fontSize: '20px'
                                                    }}
                                                />
                                                <Typography
                                                    sx={{
                                                        fontFamily: "Segoe UI",
                                                        fontWeight: "600",
                                                        fontSize: "16px",
                                                    }}
                                                >
                                                    Invalid
                                                </Typography>
                                            </MenuItem>

                                            <MenuItem
                                                disableRipple
                                                sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '5px' }} value={40}>

                                                <HelpRoundedIcon
                                                    sx={{
                                                        color: '#CACACC',
                                                        fontSize: '20px'
                                                    }}
                                                />
                                                <Typography
                                                    sx={{
                                                        fontFamily: "Segoe UI",
                                                        fontWeight: "600",
                                                        fontSize: "16px",
                                                    }}
                                                >
                                                    No Status
                                                </Typography>
                                            </MenuItem>

                                        </Select>
                                    </Box>

                                    <Box sx={{ width: '5%' }}>
                                        <DeleteOutlineRoundedIcon sx={{ color: '#146EF6', fontSize: '25px', cursor: 'pointer' }}
                                            onClick={() => handleDeleteField(field.id)}
                                        />
                                    </Box>
                                </Box>

                            ))}
                        </Stack>

                        <Stack sx={{ width: '100%', mb: 2 }}>
                            <Button
                                onClick={handleAddField}
                                disableRipple
                                variant="outlined"
                                startIcon={<AddRoundedIcon sx={{ color: '#146EF6' }} />}
                                sx={{
                                    fontFamily: "Segoe UI",
                                    fontWeight: "600",
                                    fontSize: "14px",
                                    textTransform: 'capitalize',
                                    borderColor: '#CACACC',
                                    color: '#1A1A1A',
                                    '&:hover': {
                                        color: '#146EF6',
                                        borderColor: '#146EF6',
                                        backgroundColor: '#ffffff'
                                    }
                                }}
                            >
                                Add a Phone Number
                            </Button>
                        </Stack>

                        <Stack sx={{
                            mb: 2,
                            '& .MuiInputBase-root.MuiOutlinedInput-root': {
                                p: '5px 10px 5px 10px'
                            }
                        }}>
                            <Typography
                                sx={{
                                    fontFamily: "Segoe UI",
                                    fontWeight: "700",
                                    fontSize: "12px",
                                }}
                            >
                                Phone Notes
                            </Typography>
                            <TextField
                                multiline
                                spellCheck='false'
                                maxRows={2}
                                sx={{
                                    '& .MuiInputBase-input.MuiOutlinedInput-input': {
                                        p: '5px 10px 5px 10px',
                                        color: '#1A1A1A',
                                        fontSize: '14px',
                                        fontWeight: 600,
                                        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                    },
                                    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#146EF6',
                                    },
                                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#146EF6',
                                        borderWidth: '1px',
                                    },
                                    '& .MuiInputBase-input::placeholder': {
                                        color: '#919191',
                                        fontSize: '14px',
                                        fontWeight: 600,
                                        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                        opacity: 1,
                                    },

                                }}
                                placeholder="Use this box to enter instructions on how to enter through the phone tree. (E.g. Dial 123# to reach the Contact's direct line."
                            />

                        </Stack>

                        <Stack sx={{
                            mb: 2,
                            '& .MuiInputBase-root.MuiOutlinedInput-root': {
                                p: '5px 10px 5px 10px'
                            }
                        }}>
                            <Typography
                                sx={{
                                    fontFamily: "Segoe UI",
                                    fontWeight: "700",
                                    fontSize: "12px",
                                }}
                            >
                                Phone Notes
                            </Typography>
                            <TextField
                                multiline
                                maxRows={2}
                                spellCheck='false'
                                sx={{
                                    '& .MuiInputBase-input.MuiOutlinedInput-input': {
                                        p: '5px 10px 5px 10px',
                                        color: '#1A1A1A',
                                        fontSize: '14px',
                                        fontWeight: 600,
                                        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                    },
                                    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#146EF6',
                                    },
                                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#146EF6',
                                        borderWidth: '1px',
                                    },
                                    '& .MuiInputBase-input::placeholder': {
                                        color: '#919191',
                                        fontSize: '14px',
                                        fontWeight: 600,
                                        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                        opacity: 1,
                                    },

                                }}
                                placeholder="Copy & Paste their LinkedIn URL (e.g. linkedin.com/contactname)"
                            />

                        </Stack>

                        <Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', mb: 1 }}>
                            <Box component='div' sx={{ width: '45%' }}>
                                <Typography
                                    sx={{
                                        fontFamily: "Segoe UI",
                                        fontWeight: "700",
                                        fontSize: "12px",
                                    }}
                                >
                                    Location
                                </Typography>
                                <TextField
                                    spellCheck='false'
                                    sx={{
                                        width: '100%',
                                        '& .MuiInputBase-input.MuiOutlinedInput-input': {
                                            color: '#1A1A1A',
                                            fontSize: '14px',
                                            fontWeight: 600,
                                            fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                            p: '5px 25px 5px 10px'
                                        },
                                        '& .MuiInputBase-input::placeholder': {
                                            color: '#919191',
                                            fontSize: '14px',
                                            fontWeight: 600,
                                            fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                            opacity: 1,
                                        },
                                        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#146EF6',
                                        },
                                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#146EF6',
                                            borderWidth: '1px',
                                        },
                                    }}
                                    placeholder="Location / Country"
                                />
                            </Box>

                            <Box component='div' sx={{ width: '45%' }}>
                                <Typography
                                    sx={{
                                        fontFamily: "Segoe UI",
                                        fontWeight: "700",
                                        fontSize: "12px",
                                    }}
                                >
                                    Time Zone
                                </Typography>
                                <TextField
                                    spellCheck='false'
                                    sx={{
                                        width: '100%',
                                        '& .MuiInputBase-input.MuiOutlinedInput-input': {
                                            color: '#1A1A1A',
                                            fontSize: '14px',
                                            fontWeight: 600,
                                            fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                            p: '5px 25px 5px 10px'
                                        },
                                        '& .MuiInputBase-input::placeholder': {
                                            color: '#919191',
                                            fontSize: '14px',
                                            fontWeight: 600,
                                            fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                            opacity: 1,
                                        },
                                        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#146EF6',
                                        },
                                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#146EF6',
                                            borderWidth: '1px',
                                        },
                                    }}
                                    placeholder="America/New_York"
                                />
                            </Box>
                        </Stack>

                    </AccordionDetails>
                </Accordion>
            </Stack>

            <Stack sx={{ borderTop: '1px solid #F0F0F0' }}>
                <Accordion sx={{ boxShadow: 0 }}>

                    <Stack sx={{ backgroundColor: '#F7F7F7' }}>
                        <AccordionSummary
                            expandIcon={<ArrowDropDownRoundedIcon sx={{ fontSize: '35px', color: '#146EF6' }} />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography
                                sx={{
                                    fontFamily: "Segoe UI",
                                    fontWeight: "400",
                                    fontSize: "16px",
                                    height: '25px'
                                }}
                            >
                                Contact Custom Fields
                            </Typography>
                        </AccordionSummary>
                    </Stack>

                    <AccordionDetails>
                        <Stack sx={{ mb: 1 }}>
                            <Typography
                                sx={{
                                    fontFamily: "Segoe UI",
                                    fontWeight: "700",
                                    fontSize: "12px",
                                }}
                            >
                                End Client
                            </Typography>
                            <TextField
                                spellCheck='false'
                                sx={{
                                    '& .MuiInputBase-input.MuiOutlinedInput-input': {
                                        color: '#1A1A1A',
                                        fontSize: '14px',
                                        fontWeight: 600,
                                        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                        p: '5px 25px 5px 10px'
                                    },
                                    '& .MuiInputBase-input::placeholder': {
                                        color: '#919191',
                                        fontSize: '14px',
                                        fontWeight: 600,
                                        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                        opacity: 1,
                                    },
                                    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#146EF6',
                                    },
                                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#146EF6',
                                        borderWidth: '1px',
                                    },
                                }}
                            />

                        </Stack>

                        <Stack sx={{ mb: 1 }}>
                            <Typography
                                sx={{
                                    fontFamily: "Segoe UI",
                                    fontWeight: "700",
                                    fontSize: "12px",
                                }}
                            >
                                End Client Contact
                            </Typography>
                            <TextField
                                spellCheck='false'
                                sx={{
                                    '& .MuiInputBase-input.MuiOutlinedInput-input': {
                                        color: '#1A1A1A',
                                        fontSize: '14px',
                                        fontWeight: 600,
                                        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                        p: '5px 25px 5px 10px'
                                    },
                                    '& .MuiInputBase-input::placeholder': {
                                        color: '#919191',
                                        fontSize: '14px',
                                        fontWeight: 600,
                                        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                        opacity: 1,
                                    },
                                    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#146EF6',
                                    },
                                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#146EF6',
                                        borderWidth: '1px',
                                    },
                                }}
                            />

                        </Stack>

                        <Stack>
                            <Button
                                variant="contained"
                                disableRipple
                                sx={{
                                    textTransform: 'capitalize',
                                    fontFamily: "Segoe UI",
                                    fontWeight: "600",
                                    fontSize: "16px",
                                    color: '#ffffff',
                                    height: '30px',
                                    backgroundColor: '#146EF6',
                                    boxShadow: 0,
                                    '&:hover': {
                                        backgroundColor: '#0852C2',
                                        color: '#ffffff',
                                        boxShadow: 0
                                    }

                                }}
                            >
                                Add/Remove Custom Contact Fields
                            </Button>
                        </Stack>
                    </AccordionDetails>
                </Accordion>
            </Stack>

        </>
    )
}

export default EditModal