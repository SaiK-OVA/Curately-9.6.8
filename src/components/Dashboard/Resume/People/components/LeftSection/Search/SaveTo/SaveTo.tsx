import  { useContext } from "react";
import  {React, useState, useEffect } from "../../../../../../../../shared/modules/React";
import Autocomplete from "@mui/material/Autocomplete";
import { Box } from "../../../../../../../../shared/modules/MaterialImports/Box";
import { Stack } from "../../../../../../../../shared/modules/MaterialImports/Stack";
import { Typography } from "../../../../../../../../shared/modules/MaterialImports/Typography";
import { TextField } from "../../../../../../../../shared/modules/MaterialImports/TextField";
import apiService from "../../../../shared/api/apiService";
import { Store } from "../../../DataLabs/DataLabs";

// const option = [
//     { label: 'The Shawshank Redemption', year: 1994 },
//     { label: 'The Godfather', year: 1972 },
//     { label: 'The Godfather: Part II', year: 1974 },
// ]

interface SaveTextfieldEmpty {
    isSaveTextfieldEmpty: () => void
    // DataToComapany: (data: any) => void
}

const SaveTo: React.FC<SaveTextfieldEmpty> = ({ isSaveTextfieldEmpty, }) => {
    const [searchData, setSearchData, , , isCompanySelected, setIsCompanySelected] = useContext(Store);
    const [searchText, setSearchText] = useState("");
    const [companyData, setCompanyData] = useState([])
    const handleCompanyChange = (e: any) => {
        setSearchText(e.target.value)
    }
    useEffect(() => {
        const getCompanyData = async () => {
            try {
                let response = await apiService.GetCompanyData(searchText)
                setCompanyData(response.data)
                // DataToComapany(response.data)
            }

            catch (e) {
                console.log(e, 'error')
            }
        }
        getCompanyData()
    }, [searchText]) //DataToComapany

    const sendCompanyValue = (e: any, value: any) => {
        console.log('value', value)
        if (value && value?.compid) {
            const newdata = searchData;
            newdata['companyId'] = value.compid
            // console.log(newdata);
            // setSearchData(newdata);
            localStorage.setItem("companyId", value.compid);
            setIsCompanySelected(true);
            setSearchData((prevSearchData: any) => ({
                ...prevSearchData,
                companyId: value.compid,
                company_names: [value.compname]
            }));

        } else {
            const newdata = searchData;
            setIsCompanySelected(false);
            newdata['companyId'] = ''
            localStorage.removeItem("companyId");
            // console.log(newdata);
            // setSearchData(newdata);
            setSearchData((prevSearchData: any) => ({
                ...prevSearchData,
                companyId: '',
            }));

        }
        // searchText.companyId
        if (value === null) {
            isSaveTextfieldEmpty()
        }
    }
    // const [searchData, setSearchData] = useContext(Store);

    React.useEffect(() => {
        if (searchData.companyId == "") {
            //   setDefName("");
        }
    }, [searchData.companyId]);

    return (
        <Stack sx={{ textAlign: 'left', width: '90%', pl: 2.5, mb: 1 }} >
            <Box>
                <Typography
                    sx={{
                        color: '#1A1A1A',
                        fontSize: '13px',
                        fontWeight: 500,
                        fontFamily: 'Segoe UI',
                    }}
                >
                    Save To
                </Typography>
            </Box>

            <Autocomplete
                className="auto-comp"
                freeSolo
                // multiple
                size="small"

                options={companyData}
                getOptionLabel={(option) => option.compname}
                onChange={(e, value) => sendCompanyValue(e, value)}
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
                renderInput={(params) => (
                    <TextField
                        sx={{
                            "& .MuiInputBase-input.MuiOutlinedInput-input": {
                                color: "#1A1A1A",
                                fontSize: "13px",
                                fontWeight: 600,
                                fontFamily: "Segoe UI",
                                maxHeight: "30px",
                            },
                            "& .MuiInputBase-input::placeholder": {
                                color: "#919191",
                                fontSize: "13px",
                                fontWeight: 600,
                                fontFamily: "Segoe UI",
                                opacity: 1,
                            },
                            "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                            {
                                borderColor: "#146EF6",
                            },
                            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                            {
                                borderColor: "#146EF6",
                                borderWidth: "1px",
                            },
                        }}
                        {...params}
                        placeholder="Save to"
                        onChange={handleCompanyChange}
                    />
                )}

                renderOption={(
                    props: object,
                    option: any,
                    state: object
                ) => (
                    <Stack
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            width: "100%",
                        }}
                        {...props}
                    // onClick={() => setSelectTitle(option.name)}
                    >
                        <Typography
                            sx={{
                                color: "#1A1A1A",
                                fontSize: "14px",
                                fontWeight: "600",
                                fontFamily: "Segoe UI",
                                width: "100%",

                                alignItems: "left",
                            }}
                        >
                            {option.compname}
                        </Typography>

                        <Typography
                            sx={{
                                color: "#1A1A1A",
                                fontSize: "12px",
                                fontWeight: "400",
                                fontFamily: "Segoe UI",
                                alignItems: "left",
                                width: "100%",
                            }}
                        >
                            {option.web}
                        </Typography>
                    </Stack>
                )
                }
                noOptionsText={null}
            />
        </Stack >
    )
}

export default SaveTo