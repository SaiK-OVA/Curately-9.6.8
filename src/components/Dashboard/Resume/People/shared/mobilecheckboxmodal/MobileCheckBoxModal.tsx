import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { CloseIcon } from '../../../../../../shared/modules/MaterialImports/Dialog';
import { IconButton } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Autocomplete from "@mui/material/Autocomplete";
import Paper from "@mui/material/Paper";
import "./MobileCheckboxModal.scss";
import Popper from '@mui/material/Popper';
import { Store } from '../../components/DataLabs/DataLabs';
import { userLocalData } from '../../../../../../shared/services/userData';
import apiService from '../api/apiService';
import { fetchCheckedUserIds } from '../utills/helper';
import { ID_ATS_JOBDIVA } from '../../../../../../shared/services/Permissions/IDs';
import { showToaster } from '../../../../../shared/SnackBar/SnackBar';


const MobileCheckBoxModal = ({ dialogOpen, closePopup, title, checkedData, reloadFunc, saveType }: { dialogOpen: boolean; closePopup: any; title: string, checkedData: any, reloadFunc: (data: any) => void, saveType: string }) => {

    const [
        searchData,
        // setIsCompanySelected,
    ] = React.useContext(Store);
    const recrData = JSON.parse(localStorage.getItem('demoUserInfo') || '{}')
    const [isMobileChecked, setMobileChecked] = React.useState<any>(false)
    const [sequenceData, setModalSequenceData] = React.useState<any>([]);
    const [listOrPoolOptions, setListOrPoolOptions] = React.useState<any>([]);

    const [sequenceId, setSequenceId] = React.useState<any>(null)
    const [poolId, setPoolId] = React.useState<any>(null)
    const [listId, setListId] = React.useState<any>(null)
    const [listName, setListName] = React.useState<any>("")
    const [isDisabled, setDisabled] = React.useState<any>(false)

    const isContact = () => window.location.hash.includes('/contact/people');

    const onMobileCheckBoxChange = (e: any) => {
        setMobileChecked(e.target.checked)
    }



    const handleSequenceSave = (e: any, value: any, type: string) => {
        console.log(value, 'fff')
        setSequenceId(value.sequenceId)
    }

    const handleAddToListenTableClose = (e: any, value: any, data: any, type: string) => {
        console.log(value, 'vvvvggg')
        if (value.id) {
            setPoolId(value.id)
        }
        else if (value.listId) {
            setListId(value.listId)
            setListName(value.listName)
        }
    }


    const handlePoolChange = async (e: any) => {
        try {
            let poolResp = await apiService.getPoolList(e.target.value);

            if (poolResp?.data) {
                setListOrPoolOptions(poolResp.data?.list ? poolResp.data?.list : []);
            }
        } catch (e) {
            console.log(e, "error");
        }
    };

    const assignBulkCampaign = () => {
        showToaster("Candidates are being saved in the queue", 'warning');
        //  let sequenceId = value.sequenceId;
        // let userIds = fetchCheckedUserIds(checked, searchData.displayData);
        if (sequenceId) {

            let dataObj: any = fetchCheckedUserIds(checkedData, searchData.displayData);
            let postData: any = {
                clientId: recrData.clientId,
                recrId: recrData.recrId,
                requestInfo: [],
                sequenceId: sequenceId
            }

            if (dataObj && dataObj.userIdsData.length > 0) {
                postData.requestInfo.push({
                    isSaveWithEmail: true,
                    isSaveWithPhoneNumber: isMobileChecked,
                    userIds: dataObj.userIdsData.join(),
                    // contIds: dataObj.userIdsData.join(),
                })
            }
            if (dataObj && dataObj.personIds.length > 0) {

                postData.requestInfo.push({
                    isSaveWithEmail: true,
                    isSaveWithPhoneNumber: isMobileChecked,
                    personIds: dataObj.personIds.join(),
                })

            }
            if (!isContact()) {
                setDisabled(true)
                closePopup()
                apiService
                    .saveSequenceChromeExt(postData)
                    .then((response: any) => {
                        console.log("SendSequenceList:", response.data);

                        reloadFunc(response.data)

                        setDisabled(false)
                        if (response.data.Error) {
                            setDisabled(true)
                        } else {

                        }
                    })
                    .catch((error: any) => {
                        console.error("Error fetching data:", error);
                        // setShowSeqSuccess(false);
                        closePopup()
                        setDisabled(false)

                    });
            }

            else {
                let postContactData = {
                    clientId: recrData.clientId,
                    recrId: recrData.recrId,
                    sequenceId: sequenceId,
                    "userIds": "",
                    "contIds": dataObj.userIdsData.join(),
                    "isExtension": true,
                    "personIds": dataObj.personIds.join(),
                    "isSaveWithEmail": true,
                    "isSaveWithPhoneNumber": isMobileChecked
                }
                setDisabled(true)
                closePopup()
                apiService
                    .BulkContactSequenceSave(postContactData)
                    .then((response: any) => {
                        console.log("SendSequenceList:", response.data);

                        reloadFunc(response.data)

                        if (response.data.Error) {

                        } else {

                        }
                        setDisabled(false)
                    })
                    .catch((error: any) => {
                        console.error("Error fetching data:", error);
                        // setShowSeqSuccess(false);
                        setDisabled(false)
                        closePopup()

                    });
            }
        }
    }

    const handlePoolOrListSave = async () => {
        showToaster("Candidates are being saved in the queue", 'warning');
        let clientId: any = userLocalData.getvalue('clientId');
        let recrId = userLocalData.getvalue('recrId');
        let dataObj: any = fetchCheckedUserIds(checkedData, searchData.displayData);
        if (!isContact()) {

            let postData: any = {
                clientId: recrData.clientId,
                recrId: recrData.recrId,
                requestInfo: [],
                poolId: poolId
            }
            let checkedValues = checkedData.filter((item: any) => item === true)

            if (checkedValues.length > 0) {
                if (dataObj && dataObj.userIdsData.length > 0) {
                    postData.requestInfo.push({
                        isSaveWithEmail: true,
                        isSaveWithPhoneNumber: isMobileChecked,
                        userIds: dataObj.userIdsData.join(),
                        // contIds: dataObj.userIdsData.join(),
                    })
                }
                if (dataObj && dataObj.personIds.length > 0) {
                    postData.requestInfo.push({
                        isSaveWithEmail: true,
                        isSaveWithPhoneNumber: isMobileChecked,
                        personIds: dataObj.personIds.join(),
                    })
                }
            }
            try {
                setDisabled(true)
                closePopup();
                let resp = await apiService.saveTalentPoolChromExt(postData);

                setDisabled(false)
                reloadFunc(resp.data)
            } catch (e) {
                closePopup()
                setDisabled(false)
            }
        }
        else {
            let postData = {
                "listId": listId,
                "listName": listName,
                "contIds": dataObj.userIdsData.join(),
                recrId,
                clientId,
                "personIds": dataObj.personIds.join(),
                "isSaveWithEmail": true,
                "isSaveWithPhoneNumber": isMobileChecked
            }

            try {
                closePopup();
                let resp = await apiService.saveContactList(postData)

                reloadFunc(resp.data)
            }
            catch (e) {
                closePopup()

            }


        }
    }

    const handleBulkSave = () => {
        let dataObj: any = fetchCheckedUserIds(checkedData, searchData.displayData);

        if (!isContact()) {
            let dataToPass: any = {
                recrId: parseInt(searchData.userId),
                companyId: searchData.companyId,
                personIds: dataObj.personIds,
                userIds: dataObj.userIdsData,
                isSaveWithEmail: true,
                isSaveWithPhoneNumber: isMobileChecked
            }

            if (saveType && saveType === "jobDiva") {
                dataToPass.ats = ID_ATS_JOBDIVA
            }
            // setApiLoading(true);
            setDisabled(true)
            closePopup()
            showToaster("Candidates are being saved in the queue", 'warning');
            apiService.saveToAccuick(dataToPass).then((response: any) => {
                // setApiLoading(false);
                reloadFunc(response.data)

                setDisabled(false)
                // setParentCheckedRowIds([...data, response.data.userId]);
            });
        }
        else {
            showToaster("Candidates are being saved in the queue", 'warning');
            let dataToPass: any = {

                companyId: searchData.companyId,
                personIds: dataObj.personIds,
                contIds: dataObj.userIdsData,
                isSaveWithEmail: true,
                isSaveWithPhoneNumber: isMobileChecked,
                clientId: userLocalData.getvalue('clientId'),

                recrId: userLocalData.getvalue('recrId')
            }

            if (saveType && saveType === "jobDiva") {
                dataToPass.ats = ID_ATS_JOBDIVA
            }
            // setApiLoading(true);
            setDisabled(true)
            closePopup()
            apiService.saveContactData(dataToPass).then((response: any) => {
                // setApiLoading(false);
                reloadFunc(response.data)

                setDisabled(false)
                // setParentCheckedRowIds([...data, response.data.userId]);
            });
        }


    }

    const handleSave = () => {
        if (title == "Campaign") {
            assignBulkCampaign()
        }
        else if (title == "Pool") {
            handlePoolOrListSave()
        }
        else {
            handleBulkSave()
        }
    }

    React.useEffect(() => {
        const getSequenceData = async () => {
            try {
                let sendListData: any = {
                    clientId: userLocalData.getvalue('clientId'),
                    sequenceName: "",
                    recrId: userLocalData.getvalue('recrId')
                };
                let response = await apiService.searchSequence(sendListData);
                console.log(response.data, "herrr see");
                if (response.data) {
                    setModalSequenceData(response.data.list);
                }

                // console.log(response.data.Data, 'response.data.data', response)
            } catch (e) {
                console.log(e, "error");
            }
        }

        const getPoolData = async () => {
            apiService
                .getPoolList("")
                .then((response: any) => {
                    console.log("addtolistdata:", response.data);
                    setListOrPoolOptions(response.data?.list ? response.data?.list : []);
                })
                .catch((error: any) => {
                    console.error("Error fetching data:", error);
                });
        }


        getSequenceData()
        getPoolData()
    }, [])

    return (
        <React.Fragment>

            <Dialog
                open={dialogOpen}
                onClose={closePopup}
                maxWidth={'md'}
                fullWidth={true}
                id="MobileCheckboxModal"
            >
                <DialogTitle className="header">
                    <span>{title ? !isContact() ? title == "campaign" ? "Add to " + title : "Add to " + title : "Add to List" : !saveType ? "Save to Curately" : "Save to JobDiva"} </span>
                    <IconButton
                        aria-label="close"
                        onClick={closePopup}
                        className="closeBtn"
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Take note: Adding new contacts to a list requires <span style={{ fontWeight: 600 }}>1 email credit</span> per verified email. However, re-adding previously saved contacts won’t consume any credits.

                        <Box sx={{ mt: 1, mb: 1 }}>
                            <FormControlLabel sx={{ width: "20px", height: "20px" }} control={<Checkbox value={isMobileChecked} onChange={onMobileCheckBoxChange} />} label="" />
                            <span style={{ fontSize: "13px" }}>Each mobile number that is successfully enriched, you'll be <span style={{ fontWeight: "600" }}>charged 1 credit</span>, while saved contacts don't use any.</span>
                        </Box>
                    </DialogContentText>

                    {/* <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                    /> */}

                    <Box sx={{ width: "auto" }}>
                        {title ? title == "Campaign" ?
                            <Autocomplete
                                fullWidth
                                ListboxProps={{
                                    style: {
                                        maxHeight: "200px", // Adjust dropdown height dynamically
                                        overflowY: "auto",
                                        width: "100%",
                                    },
                                }}
                                disablePortal={false}
                                id="combo-box-demo"
                                options={sequenceData}
                                sx={{
                                    width: '100%',
                                    height: "50px",
                                    "& .MuiOutlinedInput-root": {
                                        p: "8px",
                                    },
                                    "& .MuiAutocomplete-popupIndicator": {
                                        transform: "unset",
                                        color: "#737373",
                                        "& .MuiTouchRipple-root": {
                                            display: "none",
                                        },
                                        "&:hover": {
                                            backgroundColor: "#ffffff",
                                        },
                                    },
                                    padding: "8px 10px 15px",
                                }}
                                onChange={(e, value) =>
                                    handleSequenceSave(e, value, "isFromAutosave")
                                }

                                getOptionLabel={(option: any) => option.sequenceName}
                                PaperComponent={({ children }) => (
                                    <Paper
                                        style={{
                                            minWidth: "274px",
                                            left: "50%",
                                            width: "100%",
                                            // transform: "translateX(-3.7%)",
                                            // paddingLeft: '10px',
                                            height: "auto",
                                            overflow: "hidden",
                                            paddingRight: "5px",
                                            zIndex: 9999
                                        }}
                                    >
                                        {children}
                                    </Paper>
                                )}

                                renderOption={(
                                    props,
                                    option: { sequenceName: string } | null
                                ) => {
                                    // console.log(option, "option");
                                    return (
                                        <li
                                            {...props}
                                            style={{
                                                color: "#1A1A1A",
                                                fontSize: "14px",
                                                fontWeight: 600,
                                                fontFamily:
                                                    'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                                marginLeft: "10px",
                                                marginRight: "10px",
                                            }}
                                            onMouseEnter={(e: any) => {
                                                e.target.style.backgroundColor = "#F7F7F7";
                                            }}
                                            onMouseLeave={(e: any) => {
                                                e.target.style.backgroundColor = "unset";
                                            }}
                                        >
                                            {option ? option.sequenceName : ""}
                                        </li>
                                    );
                                }}
                                renderInput={(params: any) => (
                                    <TextField
                                        {...params}
                                        placeholder="Select / Type to Campaign list"
                                        // onChange={handlePoolChange}
                                        sx={{
                                            "& .MuiInputBase-input.MuiOutlinedInput-input": {
                                                padding: "0px",
                                                color: "#1A1A1A",
                                                fontSize: "14px",
                                                fontWeight: 600,
                                                fontFamily:
                                                    'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                            },
                                            "& .MuiInputBase-input::placeholder": {
                                                color: "#919191",
                                                fontSize: "14px",
                                                fontWeight: 600,
                                                fontFamily:
                                                    'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                                opacity: 1,
                                            },
                                            "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                                            {
                                                borderColor: "#146EF6",
                                            },
                                            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                                            {
                                                borderColor: "#CACACC",
                                                borderWidth: "1px",
                                            },
                                        }}
                                    />
                                )}
                            /> :
                            <Autocomplete
                                disablePortal={false}
                                disableClearable
                                onChange={(e, value) =>
                                    handleAddToListenTableClose(
                                        e,
                                        value,
                                        null,
                                        "bulkListSave"
                                    )
                                }
                                id="combo-box-demo"
                                options={listOrPoolOptions}
                                ListboxProps={{
                                    style: {
                                        maxHeight: "200px", // Adjust dropdown height dynamically
                                        overflowY: "auto",
                                        width: "100%",
                                    },
                                }}
                                getOptionLabel={(option: any) => !isContact() ? option.label : option.listName}
                                sx={{
                                    width: '100%',
                                    height: "50px",
                                    "& .MuiOutlinedInput-root": {
                                        p: 0,
                                    },
                                    "& .MuiAutocomplete-popupIndicator": {
                                        transform: "unset",
                                        color: "#737373",
                                        "& .MuiTouchRipple-root": {
                                            display: "none",
                                        },
                                        "&:hover": {
                                            backgroundColor: "#ffffff",
                                        },
                                    },
                                    padding: "8px 10px 15px",
                                }}
                                PaperComponent={({ children }) => (
                                    <Paper
                                        style={{
                                            minWidth: "274px",
                                            left: "50%",
                                            // transform: "translateX(-3.7%)",
                                            // paddingLeft: '10px',
                                            height: "auto",
                                            overflow: "hidden",
                                            paddingRight: "5px",
                                        }}
                                    >
                                        {children}
                                    </Paper>
                                )}
                                renderOption={(
                                    props,
                                    option: { label: string, listName: string } | null
                                ) => (
                                    <li
                                        {...props}
                                        style={{
                                            color: "#1A1A1A",
                                            fontSize: "14px",
                                            fontWeight: 600,
                                            fontFamily:
                                                'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                            marginLeft: "10px",
                                            marginRight: "10px",
                                        }}
                                        onMouseEnter={(e: any) => {
                                            e.target.style.backgroundColor = "#F7F7F7";
                                        }}
                                        onMouseLeave={(e: any) => {
                                            e.target.style.backgroundColor = "unset";
                                        }}
                                    >
                                        {option ? !isContact() ? option.label : option.listName : ""}
                                    </li>
                                )}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        placeholder="Select / Type to pool list"
                                        onChange={handlePoolChange}
                                        sx={{
                                            width: "100%",
                                            "& .MuiInputBase-input.MuiOutlinedInput-input": {
                                                color: "#1A1A1A",
                                                fontSize: "14px",
                                                fontWeight: 600,
                                                fontFamily:
                                                    'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                            },
                                            "& .MuiInputBase-input::placeholder": {
                                                color: "#919191",
                                                fontSize: "14px",
                                                fontWeight: 600,
                                                fontFamily:
                                                    'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                                opacity: 1,
                                            },
                                            "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                                            {
                                                borderColor: "#146EF6",
                                            },
                                            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                                            {
                                                borderColor: "#CACACC",
                                                borderWidth: "1px",
                                            },
                                        }}
                                    />
                                )}
                            /> : null
                        }
                    </Box>
                </DialogContent>
                <DialogActions>

                    <Button variant='contained' type='button' color="primary" className='ml-2' disabled={(!sequenceId && !listId && !poolId && title != "") || isDisabled} onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

export default MobileCheckBoxModal;