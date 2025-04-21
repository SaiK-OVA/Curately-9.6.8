import  {React, useState, useEffect } from "../../../../../../shared/modules/React"
import {Box} from '../../../../../../shared/modules/MaterialImports/Box';
import {TextField} from '../../../../../../shared/modules/MaterialImports/TextField';
import {Typography} from '../../../../../../shared/modules/MaterialImports/Typography';
// import { usePlacesWidget } from "react-google-autocomplete";
import Autocomplete from "react-google-autocomplete";
import { API_KEYS } from "../shared/utills/Constants";


// import { Store, FormStore } from '../MainComponent/MainComponent';
import "./form.scss"

interface AddressProps {
    field: any;
    id: any;
    name: any;
    value?: any;
    getAddressValue: (address: any, formId: any) => void;
    errorObj: any;
    isFromPreview: boolean;
}


const AddressComponent: React.FC<AddressProps> = ({ field, id, name, value, getAddressValue, errorObj, isFromPreview }) => {

    const [country, setCountry] = useState("us");

    const [isLoaded, setIsLoaded] = useState(true)


    const [address, setAddress] = useState((value && value.full_address) ? value : {
        "full_address": "",
        "optional_address": "",
        "city": "",
        "state": "",
        "country": "",
        "zip": ""
    })

    const apikey: string = window.location.hostname === "localhost" ? API_KEYS.gmaps_dev_key : API_KEYS.gmaps_qa_key
    // useEffect(() => {
    //     console.log(field, 'df address')
    // }, [JSON.stringify(formData)])
    const { city, state, zip, optional_address, full_address } = address
    // const { ref: materialRef } = usePlacesWidget({
    //     apiKey: apikey,
    //     onPlaceSelected: (place) => {
    //         setAddress((prevState) => ({ ...prevState, full_address: place.formatted_address }))
    //         if (place.address_components && place.address_components.length) {
    //             place.address_components.forEach((address: any) => {
    //                 if (address.types[0] === "postal_code") {
    //                     setAddress((prevState) => ({ ...prevState, zip: address.long_name }))
    //                 }
    //                 else if (address.types[0] === "locality") {
    //                     setAddress((prevState) => ({ ...prevState, city: address.long_name }))
    //                 }
    //                 else if (address.types[0] === "administrative_area_level_1") {
    //                     setAddress((prevState) => ({ ...prevState, state: address.long_name }))
    //                 }
    //                 else if (address.types[0] === "country") {
    //                     setAddress((prevState) => ({ ...prevState, country: address.long_name }))
    //                 }
    //             })
    //         }

    //     },

    //     options: {
    //         types: ["geocode", "establishment"],
    //         radius: 500,
    //         componentRestrictions: { country },

    //     },
    // });


    useEffect(() => {

        if (value) {
            setAddress(value)
            // materialRef.current = value.full_address
        }
    }, [JSON.stringify(value)])

    const handleAddressChange = (e: any) => {
        // if (!isFromPreview) {
        setAddress((prevAddress) => ({
            ...prevAddress,
            [e.target.name]: e.target.value
        }));
        // }
    }

    useEffect(() => {
        console.log(address, 'fffggg')
        getAddressValue(address, field.id)
    }, [address.full_address, address.optional_address, address.city, address.state, address.country, address.zip])
    // }, [JSON.stringify(address)])



    const showError = (type: any) => {

        let error = ""
        if (typeof errorObj === "object") {
            switch (type) {
                case "full_address":
                    if (errorObj[type]) {
                        error = "Street Address is required"
                    }
                    break;
                case "city":
                    if (errorObj[type]) {
                        error = "City is required"
                    }
                    break;
                case "state":
                    if (errorObj[type]) {
                        error = "State is required"
                    }
                    break;
            }
        }

        return error
    }
    let tempAddr = ""
    const formatAddress = (addr: any) => {
        tempAddr += addr + ", "
        return tempAddr.replace(/,\s*$/, "");
    }

    useEffect(() => {
        setIsLoaded(true)
    }, [address.full_address])

    return (
        <Box className="address-container">
            <Box className="address-row address-row-one">
                <Typography className="address-label">Street Address</Typography>
                <Box>
                    {field.enableAutocomplete && isFromPreview && isLoaded ? <Autocomplete
                        apiKey={apikey}
                        style={{ width: "92%", padding: "8.5px 14px", borderRadius: "4px", borderColor: "rgb(187, 186, 184)", borderStyle: "solid", borderWidth: "1px" }}
                        onPlaceSelected={(place) => {
                            setIsLoaded(false)
                            let tempTypes: string[] = []
                            if (place.address_components && place.address_components.length) {
                                place.address_components.forEach((address: any) => {
                                    tempTypes.push(address.types[0])
                                    if (address.types[0] === "street_number" || address.types[0] === "route") {
                                        let fullAddress = formatAddress(address.long_name)
                                        setAddress((prevState) => ({ ...prevState, full_address: fullAddress }))
                                    }

                                    else if (address.types[0] === "postal_code") {
                                        setAddress((prevState) => ({ ...prevState, zip: address.long_name }))
                                    }
                                    else if (address.types[0] === "locality") {
                                        setAddress((prevState) => ({ ...prevState, city: address.long_name }))
                                    }
                                    else if (address.types[0] === "administrative_area_level_1") {
                                        setAddress((prevState) => ({ ...prevState, state: address.long_name }))
                                    }
                                    else if (address.types[0] === "country") {
                                        setAddress((prevState) => ({ ...prevState, country: address.long_name }))
                                    }
                                    else {
                                        if (tempTypes.indexOf("street_number") === -1 && tempTypes.indexOf("route") === -1) {
                                            setAddress((prevState) => ({ ...prevState, full_address: place.formatted_address }))
                                        }

                                    }
                                })
                            }

                            const ele = document.getElementById("optionalRef")
                            if (ele) {
                                ele.focus()
                            }
                        }}
                        options={{
                            types: ["geocode", "establishment"],
                            radius: 500,
                            componentRestrictions: { country }
                        }}
                        defaultValue={full_address}
                        className="address-auto"
                        id="mainRef"
                    /> : <TextField fullWidth size="small"
                        sx={{
                            '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'rgb(187, 186, 184)',
                            },
                            fontSize: "13px",
                            '& .MuiInputBase-input.MuiOutlinedInput-input': {
                                color: '#1A1A1A',
                                fontSize: '14px',
                                fontWeight: 600,
                                fontFamily: 'Segoe UI',
                            }, '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'var(--c-primary-color)',
                            },
                            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'var(--c-primary-color)',
                                borderWidth: '2px',
                            },
                        }}
                        onChange={handleAddressChange}
                        className="address-font"
                        value={full_address}

                        name="full_address"

                    />}
                    {/* <TextField fullWidth size="small"
                        sx={{
                            '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'rgb(187, 186, 184)',
                            },
                            fontSize: "13px"
                        }}
                        inputRef={materialRef}
                        draggable={false}
                        className="address-font fr"
                    /> */}

                    <Box sx={{
                        fontFamily: "segoe UI",
                        fontSize: "14px",
                        fontWeight: "400",
                        color: 'red',
                        mb: 2
                    }}>
                        {showError("full_address")}
                    </Box>

                    {/* <Autocomplete
                        apiKey={"AIzaSyBPvFpashJv6w5SFk_7HVO3Y_STF3NN3BQ"}
                        onPlaceSelected={(place) => {
                            // console.log(place)
                        }}
                    />; */}
                    {/* <input type="text" ref={ref} /> */}
                </Box>

            </Box>
            <Box className="address-row address-row-two">
                <Typography className="address-label">
                    Address line2 (Optional)
                </Typography>
                <Box>
                    <TextField fullWidth size="small"
                        sx={{
                            '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'rgb(187, 186, 184)',
                            },
                            fontSize: "13px",
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
                        className="address-font"
                        onChange={handleAddressChange}
                        value={address.optional_address}
                        name="optional_address"
                        id="optionalRef"
                    />
                </Box>
            </Box>

            <Box className="address-row address-row-three">
                <Box className="address-row-item">
                    <Typography className="address-label">City</Typography>
                    <TextField size="small" className="address-city address-font " sx={{
                        '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgb(187, 186, 184)',
                        },
                        fontSize: "13px",
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
                        onChange={handleAddressChange}
                        value={city}
                        name="city" />
                    <Box sx={{
                        fontFamily: "segoe UI",
                        fontSize: "14px",
                        fontWeight: "400",
                        color: 'red',
                        mb: 2
                    }}>
                        {showError("city")}
                    </Box>
                </Box>
                <Box className="address-row-item">
                    <Typography className="address-label">State</Typography>
                    <TextField size="small" className="address-state address-font" sx={{
                        '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgb(187, 186, 184)',
                        },
                        fontSize: "13px",
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
                        value={state}
                        name="state"
                        onChange={handleAddressChange}
                    />
                    <Box sx={{
                        fontFamily: "segoe UI",
                        fontSize: "14px",
                        fontWeight: "400",
                        color: 'red',
                        mb: 2
                    }}>
                        {showError("state")}
                    </Box>
                </Box>
                <Box className="address-row-item">
                    <Typography className="address-label">Zip</Typography>
                    <TextField size="small" className="address-zip address-font" sx={{
                        '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgb(187, 186, 184)',
                        },
                        fontSize: "13px",
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
                        value={zip}
                        onChange={handleAddressChange}
                        name="zip"

                    />
                </Box>
            </Box>
        </Box>
    )
}

export default React.memo(AddressComponent)