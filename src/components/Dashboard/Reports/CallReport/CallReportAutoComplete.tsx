import  {React,useEffect, useState} from '../../../../shared/modules/React';
import {Grid, TextField} from '../../../../shared/modules/commonImports';
import Autocomplete from '@mui/material/Autocomplete';
import {CircularProgress} from '../../../../shared/modules/MaterialImports/CircularProgress';

import ApiService from "../../../../shared/api/api";

import './CallReportAutoComplete.scss';
// import InputAdornment from '@mui/material/InputAdornment';
import masterStatesList from '../../../../shared/data/States';
import { userLocalData } from '../../../../shared/services/userData';

// import Chip from '@mui/material/Chip';

interface ValueObj {
    label: string;
    id: string;
}

// function sleep(delay = 0) {
//     return new Promise((resolve) => {
//         setTimeout(resolve, delay);
//     });
// }

const CallReportMUIAutoComplete = (
    {
        id,
        handleChange,
        valuePassed,
        isMultiple,
        isDisabled,
        textToShow,
        width,
        height,
        type,
        companyId,
        placeholder,
        error = false
    }:
        {
            id: string,
            handleChange: any,
            valuePassed: any,
            isMultiple: boolean,
            isDisabled?: boolean,
            textToShow?: string,
            width?: string,
            height?: string,
            companyId?: string,
            placeholder: any,
            type: 'email' | 'phone' | 'id' | 'states' | 'recordedVideo' | 'associatedJob' | 'companyName' | 'userName',
            error?: boolean
        }
) => {

    // let tempEmail = valuePassed;

    // const [selectedValue, setSelectedValue] = useState<string>((tempEmail) ? tempEmail : '');
    // const [mulSelectedValues, setMulSelectedValues] = useState<string[]>((tempEmail) ? tempEmail : []);

    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState(false);
    const [filteredOptions, setFilteredFromOptions] = useState<readonly ValueObj[]>(
        isMultiple ?
            (valuePassed && valuePassed.id) ? valuePassed.id.split(',').map(function (a: ValueObj) { return { label: a, id: a } }) : [null]
            :
            [(valuePassed && valuePassed.id) ? valuePassed : null]
    );
    console.log(valuePassed)
    if (valuePassed && valuePassed.id) {
        // console.log(valuePassed.id.split(',').map(function (a: ValueObj) { return { label: a, id: a } }));
    }
    // [(valuePassed && valuePassed.id) ? valuePassed : null]
    // { label: messageFormik.values.bcc, id: messageFormik.values.bcc }
    const loading = open && filteredOptions.length === 0 && inputValue;


    const searchFromApi = (event: any) => {
        // setFilteredFromOptions([]);
        setInputValue((event.target.value) ? event.target.value : '');
        // console.log(event);
        if (event.target.value) {
            if (type === "phone") {
                ApiService.getByParams(193, 'Common/recruiter_json_phone.jsp', { search: event.target.value }).then((response: any) => {
                    setFilteredFromOptions([...response.data]);
                })
            } else if (type === "userName") {
                ApiService.getByParams(193, 'Common/recruiter_json_userName.jsp', { search: event.target.value }).then((response: any) => {
                    setFilteredFromOptions([...response.data]);
                })
            } else if (type === "email") {
                ApiService.getByParams(193, 'Common/recruiter_json_email.jsp', { search: event.target.value, clientId: userLocalData.getvalue('clientId') }).then((response: any) => {
                    setFilteredFromOptions([...response.data]);
                })
            } else if (type === "id") {
                ApiService.getByParams(193, 'Common/recruiter_json_id.jsp', { search: event.target.value }).then((response: any) => {
                    setFilteredFromOptions([...response.data]);
                })
            } else if (type === "recordedVideo") {
                ApiService.getByParams(171, 'workflow_addpipe_action.jsp', { title: event.target.value, action: "GET", recrId: userLocalData.getvalue('recrId') }).then((response: any) => {
                    if (response.data.message === "success") {
                        setFilteredFromOptions([...response.data.array]);
                    }
                })
            } else if (type === "associatedJob") {
                ApiService.getByParams(193, 'Contacts/associatedJobs.jsp', { compId: companyId, title: event.target.value }).then((response: any) => {
                    setFilteredFromOptions([...response.data]);
                })
            } else if (type === "states") {
                setFilteredFromOptions([...masterStatesList]);
            } else if (type === "companyName") {
                ApiService.getByParams(193, 'Company/getCompanies_JSON.jsp', { search: event.target.value }).then((response: any) => {
                    setFilteredFromOptions([...response.data]);
                })
            }
        } else {
            setFilteredFromOptions([]);
        }
    }
    const getStateById = (id: string) => {
        let tempObj = masterStatesList.find((obj) => {
            return obj.id === id
        });
        return (tempObj && tempObj.label) ? tempObj.label : ""
    }

    useEffect(() => {
        if (!open) {
            setFilteredFromOptions([]);
        }
    }, [open]);

    return (
        (<Grid
            sx={{ width: width, height: height }}
        >
            <Autocomplete
                key={(isMultiple) ? null : (valuePassed && valuePassed.id) ? valuePassed.id : null}
                disabled={isDisabled}
                multiple={isMultiple}
                id={`${id}AutoComplete`}
                options={filteredOptions}
                open={open}
                onOpen={() => {
                    setOpen(true);
                }}
                onClose={() => {
                    setOpen(false);
                }}
                getOptionLabel={(option) => option.label}
                fullWidth
                filterSelectedOptions={true}
                clearOnBlur={true}
                onInputChange={(e) => {
                    if (e) {
                        searchFromApi(e);
                        // console.log(filteredOptions)
                    }
                }}
                value={
                    (isMultiple) ?
                        (valuePassed && valuePassed.id) ?
                            (type === "states") ?
                                valuePassed.id.split(',').map(
                                    function (a: string) {
                                        // console.log(a);
                                        return {
                                            id: a, label: getStateById(a)
                                        }
                                    }
                                )
                                : valuePassed.id.split(',').map(
                                    function (a: ValueObj, i: number) {
                                        return {
                                            id: a, label: valuePassed.label.split(',')[i]
                                        }
                                    }
                                )
                            :
                            []
                        :
                        (valuePassed && valuePassed.id)
                            ?
                            valuePassed :
                            null
                }
                // (isMultiple) ? valuePassed ? [valuePassed] : [] : (valuePassed.id) ? valuePassed : null
                onChange={(e, val) => {
                    // console.log('Change');
                    // console.log(val);
                    if (isMultiple) {
                        if (val.length) {
                            let idToPass = val.map((a: ValueObj) => a.id);
                            let labelToPass = val.map((a: ValueObj) => a.label);
                            handleChange(idToPass.join(','), labelToPass.join(','));
                        } else {
                            handleChange('', '');
                        }
                    } else {
                        if (val?.id && val?.label) {
                            // setSelectedValue(val.id);
                            // valuePassed = val.id;
                            handleChange(val.id, val.label);
                        } else {
                            handleChange('', '');
                        }
                    }
                }}
                // onSelect={(e) => {
                //     console.log('Select');
                //     console.log(e);
                // let value = (e.target as HTMLInputElement).value;
                // valuePassed = value;
                // if (filteredOptions.length) {
                //     let tempObj = filteredOptions.find(obj => {
                //         return obj.id === value
                //     });
                //     if (tempObj?.id && tempObj?.label) {
                //         handleChange(tempObj?.id, tempObj?.label);
                //     }
                // }
                // }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={placeholder}
                        size='small'
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <React.Fragment>
                                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                            ),
                            // startAdornment: <InputAdornment position="start">{textToShow}</InputAdornment>,
                        }}
                        error={error}
                    />
                )}
                renderOption={(props, option) => (
                    (<li {...props}
                        style={{
                            color: '#1A1A1A',
                            fontSize: '14px',
                            fontWeight: 600
                        }}
                        onMouseEnter={(e: any) => {
                            e.target.style.backgroundColor = 'var(--c-primary-color)';
                            e.target.style.color = '#ffffff';
                        }}
                        onMouseLeave={(e: any) => {
                            e.target.style.backgroundColor = 'unset';
                            e.target.style.color = 'unset';
                        }}
                    >{option.label}</li>) // Customize the font color here
                )}
                className='customMUIAutoComplete'
            />
        </Grid>)
    );
}
export default CallReportMUIAutoComplete
// Top films as rated by IMDb users. http://www.imdb.com/chart/top
