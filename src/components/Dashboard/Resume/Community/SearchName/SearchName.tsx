
import { TextField } from '../../../../../shared/modules/MaterialImports/FormInputs';

import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, showToaster } from '../../../../../shared/modules/commonImports';
import { useEffect, useRef, useState } from '../../../../../shared/modules/React';
import ClearIcon from '@mui/icons-material/Clear';

const CommunitySearchName = ({ searchNameInParent, searchNameRefInParent, onSearchName, clearData }: {
    searchNameInParent: string, searchNameRefInParent: any; onSearchName: (val: string, refValue: { email: string; firstName: string; lastName: string; }) => void; clearData: any
}) => {

    const [searchName, setSearchName] = useState(searchNameInParent);
    const searchNameRef = useRef(searchNameRefInParent ? searchNameRefInParent : {
        firstName: "",
        lastName: "",
        email: ""
    });

    const [showClear, setShowClear] = useState(searchNameInParent ? true : false);


    const onSearchKey = (val: string) => {
        const stringToValidate = val ? val.trim() : "";
        if (stringToValidate) {
            searchNameRef.current = {
                email: "",
                firstName: "",
                lastName: "",
            }
            if (!stringToValidate.includes(' ') && stringToValidate.includes('@')) {
                searchNameRef.current = {
                    email: stringToValidate,
                    firstName: "",
                    lastName: "",
                }
                // console.log("email : " + stringToValidate);
                // Email validation
                if (stringToValidate.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                    searchNameRef.current = {
                        email: stringToValidate,
                        firstName: "",
                        lastName: "",
                    }
                    // console.log("email : " + stringToValidate);
                }
                else {
                    showToaster("Please enter valid Email", 'error');
                    return;
                }
            } else if (stringToValidate.includes(' ') || stringToValidate.includes(',')) {
                console.log("name : " + stringToValidate);
                if (stringToValidate.includes(',')) {
                    let nameSplit = stringToValidate.split(/[\s,]+/);
                    if (nameSplit.length === 1) {
                        searchNameRef.current = {
                            email: "",
                            firstName: "",
                            lastName: nameSplit[0]
                        }
                        // console.log('lastname : ', nameSplit[0]);
                    } else if (nameSplit.length === 2) {
                        searchNameRef.current = {
                            email: "",
                            firstName: nameSplit[1],
                            lastName: nameSplit[0]
                        }
                        // console.log('lastname : ', nameSplit[0]);
                        // console.log('firstname : ', nameSplit[1]);
                    } else {
                        searchNameRef.current = {
                            email: "",
                            firstName: nameSplit[1],
                            lastName: nameSplit[0]
                        }
                        // console.log('lastname : ', nameSplit[0]);
                        // console.log('middlename : ', nameSplit[1]);
                        // console.log('firstname : ', nameSplit[2]);
                    }
                } else {
                    let nameSplit = stringToValidate.split(' ');
                    if (nameSplit.length === 1) {
                        searchNameRef.current = {
                            email: "",
                            firstName: nameSplit[0],
                            lastName: "",
                        }
                        // console.log('firstname : ', nameSplit[0]);
                    } else if (nameSplit.length === 2) {
                        searchNameRef.current = {
                            email: "",
                            firstName: nameSplit[0],
                            lastName: nameSplit[1]
                        }
                        // console.log('firstname : ', nameSplit[0]);
                        // console.log('lastname : ', nameSplit[1]);
                    } else {
                        searchNameRef.current = {
                            email: "",
                            firstName: nameSplit[0],
                            lastName: nameSplit[2]
                        }
                        // console.log('firstname : ', nameSplit[0]);
                        // console.log('middlename : ', nameSplit[1]);
                        // console.log('lastname : ', nameSplit[2]);
                    }
                }
                // fn ln
                // fn mn ln
            }
            else {
                searchNameRef.current = {
                    email: "",
                    firstName: stringToValidate,
                    lastName: ""
                }
                // console.log('firstname : ', stringToValidate);
            }
        }
        if (searchNameRef.current.email || searchNameRef.current.firstName || searchNameRef.current.lastName) {
            onSearchName(val, searchNameRef.current);
            setShowClear(true);
        }
        else {
            showToaster("Please Enter Name", 'error');
            return;
        }
    }

    const onSearchChange = (e: any) => {
        setSearchName(e.target.value);
        if (!e.target.value) {
            searchNameRef.current = {
                email: "",
                firstName: "",
                lastName: "",
            }
        }
    }

    useEffect(() => {
        setSearchName(searchNameInParent);
        if (!searchNameInParent) {
            setShowClear(false);
        }
    }, [searchNameInParent]);

    useEffect(() => {
        searchNameRef.current = searchNameRefInParent;
    }, [searchNameRefInParent]);






    return <TextField fullWidth size="small"
        className='communitySearchContainer'
        placeholder="Search Name/Email"
        value={searchName}
        onKeyUp={(e) => {
            if (e.key === "Enter") {
                if ((e.target as HTMLInputElement).value) {
                    onSearchKey((e.target as HTMLInputElement).value);
                }
            }
        }}
        onChange={onSearchChange}
        slotProps={{
            input: {
                endAdornment: (
                    <InputAdornment position="end">
                        {
                            showClear ?
                                <ClearIcon className={`searchIcon ${searchName ? '' : 'v-hidden'}`} onClick={() => {
                                    clearData();
                                    // setShowClear(false);
                                }} />
                                :
                                <SearchIcon className={`searchIcon ${searchName ? '' : 'v-hidden'}`} onClick={() => {
                                    if (searchName) {
                                        onSearchKey(searchName);
                                    }
                                }} />

                        }
                    </InputAdornment>
                )
            }
        }}
    />
}

export default CommunitySearchName;