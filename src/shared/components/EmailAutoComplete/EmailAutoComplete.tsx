import { useState } from "react";
import { AutoComplete } from "primereact/autocomplete";

import ApiService from '../../api/api';

import './EmailAutoComplete.scss';
import { showToaster } from "../../modules/commonImports";
import { userLocalData } from "../../services/userData";
import { Box } from "../../../shared/modules/MaterialImports/Box"


export const EmailAutoComplete = (
    { id, handleChange, emailValue, isMultiple, textToShow, variant = "outlined" }:
        {
            id: string, handleChange: any, emailValue: any, isMultiple: boolean, textToShow: string, variant?: "outlined" | "none"
        }
) => {

    // console.log(emailValue);
    let tempEmail = emailValue;

    const [selectedEmails, setSelectedEmails] = useState<any>((tempEmail) ? tempEmail : null);
    const [mulSelectedEmails, setMulSelectedEmails] = useState<any>((tempEmail) ? tempEmail : null);

    const [filteredFromEmails, setFilteredFromEmails] = useState<any>([]);

    const searchEmails = (event: { query: string }) => {
        // setFilteredFromEmails([]);
        // ApiService.getByParams(193, 'Curately/Common/recruiter_json_email_only.jsp', { search: event.query }).then((response: any) => {
        ApiService.postWithData("admin", 'getRecruiterJsonEmail', { fullName: event.query, clientId: userLocalData.getvalue('clientId') }).then((response: any) => {

            // console.log(response.data.list);
            setFilteredFromEmails([...response.data.list]);
        })
    }

    const validateEmail = (email: string) => {
        // return email.match(
        //     /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        // );
        // eslint-disable-next-line no-useless-escape
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(email)) {
            // showToaster('Enter Valid Email', 'warning');
            return false
        }
        // return re.test(email);
        return true;
    };


    return (
        <span className="p-fluid" id="EmailAutoComplete">
            <div className="p-inputgroup">
                <span className={variant === "outlined" ? "p-inputgroup-addon" : "pr-2"}>{textToShow}</span>
                <Box component={"span"} sx={{
                    width: "100%", maxWidth: "100%",
                    "& input": variant === "none" ? {
                        "&,&:hover&:focus,&:active": {
                            border: "none !important",
                            outline: "none !important",
                        }
                    } : {},
                    "& .p-inputwrapper-focus": variant === "none" ? {
                        "&,&:hover&:focus,&:active": {
                            border: "none !important",
                            outline: "none !important",
                        }
                    } : {},
                }}>
                    <AutoComplete
                        value={(isMultiple) ? mulSelectedEmails : selectedEmails}
                        suggestions={filteredFromEmails}
                        completeMethod={searchEmails}
                        field="id"
                        style={{
                            width: "100%", maxWidth: "100%",
                            border: "none", outline: "none",
                        }}
                        multiple={isMultiple}
                        // forceSelection={!isMultiple}
                        delay={300}
                        onBlur={(e) => {
                            if (e.target.value && validateEmail(e.target.value)) {
                                if (isMultiple) {
                                    if (mulSelectedEmails && mulSelectedEmails.length) {
                                        emailValue = [...mulSelectedEmails, e.target.value];
                                        handleChange([...mulSelectedEmails, e.target.value], 'add');
                                        setMulSelectedEmails([...mulSelectedEmails, e.target.value]);
                                    } else {
                                        setMulSelectedEmails([e.target.value]);
                                        emailValue = [e.target.value];
                                        handleChange([e.target.value], 'add');
                                    }
                                    e.target.value = '';
                                } else {
                                    setSelectedEmails(e.target.value);
                                    emailValue = e.target.value;
                                    handleChange(e.target.value, 'add');
                                }

                            }
                            // console.log('onSelect');
                            // console.log(e);
                            // console.log(selectedEmails);
                        }}
                        onKeyUp={(e) => {
                            let tempVal = (e.target as HTMLInputElement).value
                            if (e.key === "Enter") {
                                if (validateEmail(tempVal)) {
                                    if (isMultiple) {
                                        if (mulSelectedEmails && mulSelectedEmails.length) {
                                            emailValue = [...mulSelectedEmails, tempVal];
                                            handleChange([...mulSelectedEmails, tempVal], 'add');
                                            setMulSelectedEmails([...mulSelectedEmails, tempVal]);
                                        } else {
                                            setMulSelectedEmails([tempVal]);
                                            emailValue = [tempVal];
                                            handleChange([tempVal], 'add');
                                        }
                                        tempVal = '';
                                    } else {
                                        setSelectedEmails(tempVal);
                                        emailValue = tempVal;
                                        handleChange(tempVal, 'add');
                                    }

                                } else {
                                    showToaster('Enter Valid Email', 'warning');
                                }
                            }
                            // console.log(e.target);
                            // console.log(e);
                            // console.log(selectedEmails);
                        }}
                        onChange={(e) => {
                            // handleChange(e);
                            if (!isMultiple) {
                                setSelectedEmails((e.value) ? e.value : '');
                            }
                            // console.log('onChange');
                            // console.log(e.value);
                            // console.log(selectedEmails);
                        }}
                        onSelect={(e) => {
                            if (validateEmail(e.value)) {
                                if (isMultiple) {
                                    if (mulSelectedEmails && mulSelectedEmails.length) {
                                        emailValue = [...mulSelectedEmails, e.value];
                                        handleChange([...mulSelectedEmails, e.value], 'add');
                                        setMulSelectedEmails([...mulSelectedEmails, e.value]);
                                    } else {
                                        setMulSelectedEmails([e.value]);
                                        emailValue = [e.value];
                                        handleChange([e.value], 'add');
                                    }
                                } else {
                                    setSelectedEmails(e.value);
                                    emailValue = e.value;
                                    handleChange(e.value, 'add');
                                }
                            }
                            // console.log('onSelect');
                            // console.log(e.value);
                            // console.log(selectedEmails);
                        }}
                        onUnselect={(e) => {
                            if (isMultiple) {
                                let tempEmails = [...mulSelectedEmails];
                                var index = tempEmails.indexOf(e.value);
                                if (index !== -1) {
                                    tempEmails.splice(index, 1);
                                }
                                setMulSelectedEmails(tempEmails);
                                emailValue = tempEmails;
                                handleChange(tempEmails, 'remove');
                            }
                            // console.log('onUnselect');
                            // console.log(e.value);
                        }}
                        aria-label="Email"
                        dropdownAriaLabel="Select Email"
                    />
                </Box>
            </div>
        </span>
    );
};



export default EmailAutoComplete;