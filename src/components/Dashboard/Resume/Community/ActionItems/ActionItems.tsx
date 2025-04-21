import { Grid } from '../../../../../shared/modules/MaterialImports/Grid';
import { Box } from '../../../../../shared/modules/MaterialImports/Box';
import { Button, IconButton } from '../../../../../shared/modules/MaterialImports/Button';
import { Stack } from '../../../../../shared/modules/MaterialImports/Stack';
import { Tooltip } from '../../../../../shared/modules/MaterialImports/ToolTip';
import { ButtonGroup } from "@mui/material";

import { FormControl } from '../../../../../shared/modules/MaterialImports/FormInputs';
import { Checkbox, Select } from '../../../../../shared/modules/MaterialImports/FormElements';
import { Popover } from '../../../../../shared/modules/MaterialImports/Popover';
import { Menu, MenuItem } from '../../../../../shared/modules/MaterialImports/Menu';
import SouthRoundedIcon from '@mui/icons-material/SouthRounded';
import MenuIcon from '@mui/icons-material/Menu';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

import RefreshIcon from '@mui/icons-material/Refresh';
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import CallOutlinedIcon from "@mui/icons-material/CallOutlined";

import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import PlaylistAddOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined";

import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';

import CommunitySearchName from '../SearchName/SearchName';
import { userLocalData } from '../../../../../shared/services/userData';
import { MUIAutoComplete } from '../../../../shared/MUIAutoComplete/MUIAutoComplete';
import ApiService from '../../../../../shared/api/api';
import { showToaster } from '../../../../shared/SnackBar/SnackBar';
import { MouseEvent, useState } from 'react';
// import { CommunitySessionStorage } from '../Community';
import { trackPromise } from 'react-promise-tracker';
import UpgradeButton from '../../../../shared/UpgradeButton/UpgradeButton';
import { DataToPassForCommunity } from '../Community';

import AddMatchToModal from '../../../Candidate/ViewCandidate/CandidateTopCard/Popups/AddMatchToModal/AddMatchToModal';
import { ID_ATS_AVIONTEAPI, ID_ATS_BULLHORN, ID_ATS_JOBDIVA, ID_ATS_VOICEAI, ID_ROLE_EMAIL_AND_SMS, ID_ROLE_EMAIL_AND_SMS_CAN_SEND_BULK_EMAIL, ID_SETTINGS_EVALUTE } from '../../../../../shared/services/Permissions/IDs';
import AddToListsDialog from '../../../../shared/AddToListsDialog/AddToListsDialog';


const ActionItems = (
    {
        // searchDataInSession,
        rowSelection, applicantsData, onSearchChange, addToTalentPool,
        addtopoollistanchorEl, setAddToPoolListAnchorEl, addtosequencelistanchorEl, setAddToSequenceListAnchorEl, refreshData,
        isInJob, searchName, searchNameRef, applyFilters, mainJsonDataRef, isFiltersApplied, isAIMatchSelected, customHeadingsList,
        jobIdFromJobPage, selectedJob, isSelectAllChecked, setSelectedTalentPool, handleProfileMenuClose, buildJson,
        pagination, selectedRowCount, rowCount, setSelectedSequence, selectedSequence, menuData, selectedTalentPool, tabValue,
        setSorting,
        currentSelectedTabCount,
        setRowSelection,
        currentSelectCount,
        setIsSelectAllChecked,
        currentSelectedTabValue,
        jsonToPassRef,
        firstLoad,
        talentPoolId,
        setSelectedRowCount,
        addToSequenceList,
        setSelectedSMS,
        setSelectedName,
        setIsBulkSMS,
        setAddSMS,
        setSelectCandidList,
        setSelectedEmail,
        setIsBulkEmail,
        setAddEmail,
        sortType,
        sortColumn,
        setSortColumn,
        setSortType,
        mainDataToPassForAPI,
        setOpenNewLayoutModal,
        tableLayoutRef
    }
        :
        {
            // searchDataInSession: CommunitySessionStorage; 
            rowSelection: any; applicantsData: any; onSearchChange: any; addToTalentPool: any;
            addtopoollistanchorEl: any; setAddToPoolListAnchorEl: any; addtosequencelistanchorEl: any;
            setAddToSequenceListAnchorEl: any; refreshData: () => void; isInJob: boolean; searchName: any; searchNameRef: any;
            applyFilters: any; mainJsonDataRef: any; isFiltersApplied: any; isAIMatchSelected: any; customHeadingsList: any;
            jobIdFromJobPage: string; selectedJob: any; isSelectAllChecked: any; setSelectedTalentPool: any; handleProfileMenuClose: any;
            buildJson: any; pagination: any; selectedRowCount: any; rowCount: any; setSelectedSequence: any; selectedSequence: any;
            menuData: any; selectedTalentPool: any; tabValue: any;
            setSorting: any;
            currentSelectedTabCount: any;
            setRowSelection: any;
            currentSelectCount: any;
            setIsSelectAllChecked: any;
            currentSelectedTabValue: any;
            jsonToPassRef: any;
            firstLoad: any;
            talentPoolId: any;
            setSelectedRowCount: any;
            addToSequenceList: any;
            setSelectedSMS: any;
            setSelectedName: any;
            setIsBulkSMS: any;
            setAddSMS: any;
            setSelectCandidList: any;
            setSelectedEmail: any;
            setIsBulkEmail: any;
            setAddEmail: any;
            sortType: any;
            sortColumn: any;
            setSortColumn: any;
            setSortType: any;
            mainDataToPassForAPI: DataToPassForCommunity
            setOpenNewLayoutModal: any;
            tableLayoutRef: any
        }
) => {


    //const isEmailSMSSettingEnabled = userLocalData.checkIntegration(40005);

    const [openAddToListsModal, setOpenAddToListsModal] = useState(false);
    const isBulkEmailSettingEnabled = userLocalData.checkIntegration(ID_ROLE_EMAIL_AND_SMS) && userLocalData.checkIntegration(ID_ROLE_EMAIL_AND_SMS_CAN_SEND_BULK_EMAIL);

    const isChromeExtensionEnabled = userLocalData.isChromeExtensionEnabled();
    //const isBullHornSettingEnabled = userLocalData.adminSettings(20043);
    //const isVoiceAISettingEnabled = userLocalData.adminSettings(20044);
    // const isEvaluteSettingEnabled = userLocalData.adminSettings(20046);
    // const isAvionteAPISettingEnabled = userLocalData.adminSettings(20045);
    //const isJobDivaAPISettingEnabled = userLocalData.adminSettings(20047);


    const [selectAllElement, setSelectAllElement] = useState<null | HTMLElement>(null);


    const [addMatchToModal, setAddMatchToModal] = useState(false);

    const [sortAnchorEl, setSortAnchorEl] = useState<HTMLButtonElement | null>(null);
    // console.log(sortType);
    const handleSortClick = (event: MouseEvent<HTMLButtonElement>) => {
        setSortAnchorEl(event.currentTarget);
    };

    const handleSortClose = () => {
        setSortAnchorEl(null);
    };

    const sortOpen = Boolean(sortAnchorEl);
    const sortId = sortOpen ? 'simple-popover' : undefined;



    const openSelectAllMenu = Boolean(selectAllElement);
    const openSelectAll = (event: MouseEvent<HTMLButtonElement>) => {
        setSelectAllElement(event.currentTarget);
    };
    const checkedCount = Object.keys(rowSelection).filter((id) => Boolean(rowSelection[id])).length; //Object.keys(rowSelection).length; //
    const someAreChecked = !isSelectAllChecked && checkedCount ? true : false;
    const openAddToPoolListenBtn = Boolean(addtopoollistanchorEl);
    const openAddToSequenceListenBtn = Boolean(addtosequencelistanchorEl);




    function removeEmptyValues(obj: any) {
        const newObj: any = {};

        for (const key in obj) {
            const value = obj[key];
            // if (value !== null && value !== undefined && value !== "") {
            //     newObj[key] = value;
            // }
            if ((value === "" || value) && value !== null) {
                newObj[key] = value;
            }
        }
        return newObj;
    }


    const addToTopTalentPool = (id: string, name: string) => {

        //   console.log(Object.keys(rowSelection));
        if (Object.keys(rowSelection).length > 0) {
            if (name && name.trim()) {
                setSelectedTalentPool({ id: id, name: name });
                handleProfileMenuClose();
                addToTalentPool(id, name, Object.keys(rowSelection).join(','));
            }
        } else {
            showToaster('Select atleast one Candidate', 'error');
        }
    }

    const handleClickAddToPoolListen = (
        event: MouseEvent<HTMLButtonElement>
    ) => {
        saveAuditLog(3941);
        setAddToPoolListAnchorEl(event.currentTarget);
        // loadDistributionList();
        // setSelectedRowId(callId);
    };

    const handleClickInvite = (reInvite: boolean) => {

        const idsList = Object.keys(rowSelection);
        let userList: any = [];

        const userListData = applicantsData.filter((item: any) => idsList.includes(item.candId))
        for (let i = 0; i < userListData.length; i++) {
            userList.push({
                name: userListData[i].first + " " + userListData[i].last,
                email: userListData[i].email
            })
        }

        const payload = {
            clientId: userLocalData.getvalue('clientId'),
            userIds: idsList.toString(),
            userList: userList,
            reInvite: reInvite ? reInvite : false,
            recrId: userLocalData.getvalue('recrId'),
        };

        ApiService.postWithData('admin', 'inviteCommunity', payload)
            .then((response: any) => {
                if (response.status === 200) {
                    console.log(response)
                    showToaster('Invitation sent!', 'success');
                } else {
                    showToaster('Error sending team invite!', 'error');
                }
            }).catch((error) => {
                console.error("Error:", error);
                showToaster('Error occurred.', 'error');
            });
    }



    const saveAuditLog = (id: number) => {
        ApiService.saveAuditLog(id);
    }



    const handleBlastSMS = () => {
        const selectedIds = Object.keys(rowSelection);
        if (selectedIds.length === 1) {
            const selectedRowKey = selectedIds[0];
            const selectedRow = applicantsData.find((candidate: any) => candidate.candId === selectedRowKey);
            // console.log(selectedRow);
            if (selectedRow) {
                setSelectedSMS(selectedRow.phone);
                setSelectedName(selectedRow.first);
                setIsBulkSMS(false);
                setAddSMS(true);
                setSelectCandidList(selectedIds);
            }
        } else if (selectedIds.length > 1) {
            setSelectedSMS('');
            setSelectedName('');
            setIsBulkSMS(true);
            setAddSMS(true);
            setSelectCandidList(selectedIds);
        }
    }

    const handleBlastEmail = () => {
        const selectedIds = Object.keys(rowSelection);
        if (selectedIds.length === 1) {
            const selectedRowKey = selectedIds[0];
            const selectedRow = applicantsData.find((candidate: any) => candidate.candId === selectedRowKey);
            // console.log(selectedRow);
            if (selectedRow) {
                setSelectedEmail(selectedRow.email);
                setSelectedName(selectedRow.first);
                setIsBulkEmail(false);
                setAddEmail(true);
                setSelectCandidList(selectedIds);
            }
        } else if (selectedIds.length > 1) {
            setSelectedEmail('');
            setSelectedName('');
            setIsBulkEmail(true);
            setAddEmail(true);
            setSelectCandidList(selectedIds);
        }
    };


    const selectAllMenuItemClicked = (menuType: any) => {
        if (menuType === "page" || ((menuType === "all") && (currentSelectedTabCount <= 50))) {
            // const startIndex = pagination.pageIndex * pagination.pageSize;
            // const endIndex = Math.min(
            //     (pagination.pageIndex + 1) * pagination.pageSize,
            //     applicantsData.length
            // );
            //   console.log(applicantsData.length)
            //   console.log(applicantsData)
            let checkedCheckboxesData: any = {};
            for (let index = 0; index < applicantsData.length; index++) {
                //   console.log(index + " -- "+ applicantsData[index].candId);
                checkedCheckboxesData[applicantsData[index].candId] = true;
            }
            // setRowPageIndex(0);
            //   console.log(checkedCheckboxesData);
            setRowSelection(checkedCheckboxesData);
            currentSelectCount = Object.keys(rowSelection).length;
            setIsSelectAllChecked(false);
        } else if (menuType === "all") {
            currentSelectCount = (rowCount > 1000) ? 1000 : rowCount;

            // let pIndex = Math.ceil((currentSelectCount) / pagination.pageSize);
            // setRowPageIndex(pIndex);

            // const params = new URLSearchParams({
            //     jobid: isInJob ? jobIdFromJobPage : selectedJob.id,
            //     json: JSON.stringify(jsonToPassRef),
            //     client_subs: "0",
            //     csninja: "0",
            //     type: "" + currentSelectedTabValue,
            //     clientId: "" + userLocalData.getvalue('clientId'),
            // });
            const params = new URLSearchParams(JSON.parse(JSON.stringify(removeEmptyValues(mainDataToPassForAPI))));

            // https://app.curately.ai/Accuick_API/Curately/Sovren/sovren_results_community_all.jsp

            let urlToCheck = jsonToPassRef.userIds ? "Community/community_data_all.jsp" :
                jsonToPassRef.ParsedDocument && jsonToPassRef.ParsedDocument.trim()
                    ? "Sovren/sovren_results_community_all.jsp"
                    : ((!firstLoad || !isFiltersApplied) && !talentPoolId) ?
                        "Community/community_data_all.jsp" :
                        "Sovren/sovren_results_community_all.jsp";
            trackPromise(
                ApiService.postWithData(193, 'Curately/' + urlToCheck, params).then(
                    (result: any) => {
                        console.log(result.data);
                        let rowData: any = {};

                        let tempData: any = (result.data?.data) ? result.data.data : [];
                        for (let index = 0; index < tempData.length; index++) {
                            if (tempData[index]?.trim()) {
                                rowData[tempData[index].trim()] = true;
                            }
                        }
                        setRowSelection(rowData);
                        setSelectedRowCount(tempData.length);
                        // setSelectedRowCount((currentSelectedTabCount > 1000) ? 1000 : currentSelectedTabCount);
                    }
                )
            )
            setIsSelectAllChecked(true);
        } else if (menuType === "clear") {
            setIsSelectAllChecked(false);
            setRowSelection({});
            // setRowPageIndex(0);
            currentSelectCount = 0;
        }
        setSelectAllElement(null);
    };




    const addToTopSequenceList = (id: string, name: string) => {

        //  console.log(Object.keys(rowSelection));
        if (Object.keys(rowSelection).length > 0) {
            if (name && name.trim()) {
                setSelectedSequence({ id: id, name: name });
                handleProfileMenuClose();
                addToSequenceList(id, name, Object.keys(rowSelection).join(','));
            }
        } else {
            showToaster('Select atleast one Candidate', 'error');
        }
    }
    const handleClickAddToSequenceListen = (
        event: MouseEvent<HTMLButtonElement>
    ) => {
        saveAuditLog(3940);
        setAddToSequenceListAnchorEl(event.currentTarget);
        // loadDistributionList();
        // setSelectedRowId(callId);
    };

    const EnrollNow = () => {
        let bodyRequest = {
            "clientId": userLocalData.getvalue('clientId'),
            "userIds": Object.entries(rowSelection).filter(([key, value]) => value).map(([key]) => parseInt(key)),
            "recrId": userLocalData.getvalue('recrId')
        }

        ApiService.postWithData('admin', `candidateEnroll`, bodyRequest).then((response) => {
            if (response.data.Success) {
                showToaster(`Candidates enroll success.`, 'success');
                setRowSelection({});
            } else {
                showToaster((response.data.Message) ? response.data.Message : "Unable to Enroll", 'error');
            }
        }).catch(error => {
            showToaster(error.message ? error.message : "Unable to Enroll", 'error');
        });

    }
    const publishCandidateToAvionte = () => {


        let bodyRequest = {
            "atsName": "Avionte",
            "clientId": userLocalData.getvalue('clientId'),
            "recruiterId": userLocalData.getvalue('recrId'),
            "moduleName": "Candidate",
            "curatelyIds": Object.entries(rowSelection).filter(([key, value]) => value).map(([key]) => key),
        }
        // https://adminapi.cxninja.com/bullhorn-service-dev/job/%7BclientId%7D/%7BjobId%7D
        // if (Object.keys(rowSelection).length === 1) {
        ApiService.postWithData('ats', `ats/post`, bodyRequest).then((response) => {
            if (response.data.Success) {
                showToaster(`Candidate is Publshed successfully`, 'success');
                setRowSelection({});
            } else {
                showToaster((response.data.Message) ? response.data.Message : "Unable to Publish Candidate to Avionte", 'error');
            }
        }).catch(error => {
            showToaster(error.message ? error.message : "Unable to Publish Candidate to Avionte", 'error');
        });
        // } else {
        //     showToaster("Please select Only Candidate to Publish to Avionte", 'error');
        // }

    }


    // VOice AI publish Candidate
    const publishCandidateToVoiceAI = () => {

        let canidateIdToPass = "";
        Object.entries(rowSelection).forEach(([key, value]) => {
            if (!canidateIdToPass && value) {
                canidateIdToPass = key;
            }
        });
        if (canidateIdToPass) {

            let data = {
                "jobId": isInJob ? jobIdFromJobPage : selectedJob.id,
                "type": "shortList",
                "recrId": userLocalData.getvalue('recrId'),
                "userIds": canidateIdToPass,
                "clientId": userLocalData.getvalue('clientId')
            }

            //  https://adminapi.cxninja.com/voice-ai-prod/candidates/submitCandidates
            trackPromise(
                ApiService.postWithData('voiceai', 'candidates/submitCandidates', data).then((response: any) => {
                    if (response.data?.length) {
                        let calculatedData = response.data;
                        let errorResponse = ""; let successResponse = "";
                        for (let si = 0; si < calculatedData.length; si++) {

                            if (calculatedData[si]?.error) {
                                errorResponse += calculatedData[si].failureUserId + " - " + calculatedData[si].errorResponse + "\n";

                                setRowSelection({});
                            } else {
                                successResponse += calculatedData[si]?.first_name + " " + calculatedData[si]?.last_name + " - User Voice AI Created Successfully.\n";
                                //     showToaster(calculatedData[si]?.first_name + " " + calculatedData[si]?.last_name + " - User Voice AI Created Successfully.", 'success');
                                setRowSelection({});
                            }
                        }

                        (errorResponse) ? showToaster(errorResponse, 'error') : null;
                        (successResponse) ? showToaster(successResponse, 'success') : null;

                    }

                })
                    .catch((error) => {
                        console.error('Error fetching Voice AI:', error);
                    })
            )
        }

    }
    // publishCandidateToJobdiva
    const publishCandidateToJobdiva = () => {


        let bodyRequest = {
            "atsName": "JobDiva",
            "clientId": userLocalData.getvalue('clientId'),
            "recruiterId": userLocalData.getvalue('recrId'),
            "moduleName": "Candidate",
            "curatelyIds": Object.entries(rowSelection).filter(([key, value]) => Number(value)).map(([key]) => Number(key)),
        }

        ApiService.postWithData('ats', `ats/post`, bodyRequest).then((response) => {
            if (response.data.Success) {
                showToaster(`Jobdiva - Candidate is Publshed successfully`, 'success');
                setRowSelection({});
            } else {
                showToaster((response.data.Message) ? response.data.Message : "Unable to Publish Candidate to Jobdiva", 'error');
            }
        }).catch(error => {
            showToaster(error.message ? error.message : "Unable to Publish Candidate to Jobdiva", 'error');
        });


    }


    // Bullhorn publish Candidate
    const publishCandidateToBullhorn = () => {


        let bodyRequest = {
            "atsName": "Bullhorn",
            "clientId": userLocalData.getvalue('clientId'),
            "recruiterId": userLocalData.getvalue('recrId'),
            "moduleName": "Candidate",
            "curatelyIds": Object.entries(rowSelection).filter(([key, value]) => value).map(([key]) => key),
        }

        ApiService.postWithData('ats', `ats/post`, bodyRequest).then((response) => {
            if (response.data.Success) {
                showToaster(`Candidate is Publshed successfully`, 'success');
                setRowSelection({});
            } else {
                showToaster((response.data.Message) ? response.data.Message : "Unable to Publish Candidate to BullHorn", 'error');
            }
        }).catch(error => {
            showToaster(error.message ? error.message : "Unable to Publish Candidate to BullHorn", 'error');
        });

    }

    const assignCriteria = () => {

        let userIds = Object.entries(rowSelection)
            .filter(([key, value]) => value === true)
            .map(([key, value]) => parseInt(key));

        // let canidateIdToPass = "";
        // Object.entries(rowSelection).forEach(([key, value]) => {
        //     if (!canidateIdToPass && value) {
        //         canidateIdToPass = key;
        //     }
        // });
        if (!!userIds?.length) {
            let data = {
                "jobId": isInJob ? jobIdFromJobPage : selectedJob.id,
                "recrId": userLocalData.getvalue('recrId'),
                "userIds": userIds,
                "clientId": userLocalData.getvalue('clientId')
            }
            trackPromise(
                ApiService.postWithData('admin', 'saveOrUpdateCriteriaEvaluationUser', data).then(async (response: any) => {
                    if (response.data.Success) {
                        showToaster('User Criteria Created Successfully', 'success');
                        buildJson(pagination.pageIndex, pagination.pageSize, false, false, false);
                    } else {
                        showToaster((response.data.Message) ? response.data.Message : "Error creating User Criteria.", 'error');
                    }
                })
                    .catch((error) => {
                        console.error('Error fetching Sourced Count:', error);
                    })
            )
        }
    }



    return <span>
        <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            className="actionItems"
            sx={{ width: "90% !important" }}
            columnSpacing={1}
        >
            <Button
                disableRipple
                id="select-all-button"
                className="select-all-button mr-2"
                aria-controls={
                    openSelectAllMenu ? "select-all-menu" : undefined
                }
                aria-haspopup="true"
                aria-expanded={openSelectAllMenu ? "true" : undefined}
                onClick={openSelectAll}
            >
                <div>
                    <Checkbox
                        className="select-all-checkbox"
                        disableRipple
                        color="default"
                        checked={isSelectAllChecked}
                        // onClick={handleSelectAllClick}
                        indeterminate={someAreChecked}
                    />
                </div>
                <span
                    className={`selectedCountText ${checkedCount === 0 ? "d-none" : "d-block"
                        }`}
                >
                    {/* Object.keys(rowSelection).length */}
                    {(isSelectAllChecked) ? ((selectedRowCount > 1000) ? 1000 : selectedRowCount) : checkedCount} Selected

                </span>

                <ArrowDropDownIcon className="arrowDownIcon" />
            </Button>
            <Menu
                id="select-all-menu"
                className="select-all-menu"
                anchorEl={selectAllElement}
                open={openSelectAllMenu}
                onClose={() => setSelectAllElement(null)}
                MenuListProps={{
                    "aria-labelledby": "select-all-checkbox",
                }}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
                PaperProps={{
                    style: { overflow: "visible" },
                }}
            >
                <MenuItem
                    disableRipple
                    onClick={() => { saveAuditLog(3937); selectAllMenuItemClicked("page") }}
                    className="menuItem"
                >
                    Select this page (<Box component="span">{applicantsData.length}</Box>)
                </MenuItem>
                <MenuItem
                    disableRipple
                    onClick={() => selectAllMenuItemClicked("all")}
                >
                    Select all people (<Box component="span">{(rowCount > 1000) ? 1000 : rowCount}</Box>)

                </MenuItem>
                <MenuItem
                    disableRipple
                    onClick={() => selectAllMenuItemClicked("clear")}
                >
                    Clear Selection
                </MenuItem>
            </Menu>
            <ButtonGroup variant="outlined" className='quickActionButtonGroup'>
                {
                    isBulkEmailSettingEnabled && !userLocalData.isChromeExtensionEnabled() ?
                        <Tooltip title="Email">
                            <span>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    //  className="mr-2"
                                    disabled={Object.keys(rowSelection).length === 0 ||
                                        (Object.keys(rowSelection).length === 1 && !applicantsData.find((candidate: { candId: string; }) => candidate.candId === Object.keys(rowSelection)[0])?.email)}
                                    onClick={() => { saveAuditLog(3938); handleBlastEmail() }}
                                    startIcon={<MailOutlineOutlinedIcon />}
                                />
                            </span>
                        </Tooltip>
                        :
                        null
                }

                {
                    userLocalData.checkIntegration(ID_ROLE_EMAIL_AND_SMS) && !isChromeExtensionEnabled ?
                        <Tooltip title="SMS">
                            <span>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    //  className="mr-2"
                                    disabled={Object.keys(rowSelection).length === 0 ||
                                        (Object.keys(rowSelection).length === 1 && !applicantsData.find((candidate: { candId: string; }) => candidate.candId === Object.keys(rowSelection)[0])?.phone)}
                                    onClick={() => { saveAuditLog(3939); handleBlastSMS() }}
                                    startIcon={<CallOutlinedIcon />}
                                />
                            </span>
                        </Tooltip>
                        :
                        null
                }
                <Tooltip title="Campaign">
                    <span>
                        <Button
                            variant="outlined"
                            color="secondary"
                            // className="mr-2"
                            //  onClick={(e) => handleTableSequence(e, '')}
                            disabled={Object.keys(rowSelection).length > 0 ? false : true}
                            startIcon={<SendOutlinedIcon />}
                            id="add-sequencelist-btn"
                            disableRipple
                            aria-controls={openAddToSequenceListenBtn ? "addsequencelistmenu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={openAddToSequenceListenBtn ? "true" : undefined}
                            onClick={handleClickAddToSequenceListen}
                        // endIcon={<ArrowDropDownIcon />}
                        />
                    </span>

                </Tooltip>
                <Tooltip title="Pool">
                    <span>
                        <Button
                            id="add-poollist-btn"
                            aria-controls={openAddToPoolListenBtn ? "addpoollistmenu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={openAddToPoolListenBtn ? "true" : undefined}
                            onClick={handleClickAddToPoolListen}
                            startIcon={<PlaylistAddOutlinedIcon />}
                            disableRipple
                            variant="outlined"
                            color="secondary"
                            //className="mr-2"
                            disabled={Object.keys(rowSelection).length > 0 ? false : true}
                        // endIcon={<ArrowDropDownIcon />}
                        />
                    </span>
                </Tooltip>

                {
                    userLocalData.adminSettings(ID_SETTINGS_EVALUTE) && customHeadingsList.length ?
                        <Tooltip title="Evaluate">
                            <Button
                                variant="outlined"
                                color="secondary"
                                disabled={Object.keys(rowSelection).length > 0 ? false : true}
                                onClick={assignCriteria}
                                startIcon={<FactCheckOutlinedIcon />}
                            />
                        </Tooltip>
                        : null
                }

            </ButtonGroup>
            <Menu
                id='addsequencelistmenu'
                anchorEl={addtosequencelistanchorEl}
                open={openAddToSequenceListenBtn}
                onClose={handleProfileMenuClose}
                MenuListProps={{
                    "aria-labelledby": 'add-sequencelist-btn',
                }}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
                PaperProps={{
                    style: { overflow: "visible" },
                }}
                sx={{
                    boxShadow: "0px",
                    "& .MuiList-root.MuiMenu-list": {
                        pt: "8px",
                        pb: "15px",
                        pr: "10px",
                        pl: "10px",
                    },
                }}
            >
                {
                    (userLocalData.getvalue('paymentType') !== 1) ?
                        <MUIAutoComplete
                            id='sequenceId1'
                            handleChange={(id: any, name: string) => {
                                setSelectedSequence({ id, name });
                                addToTopSequenceList(id, name);
                            }}
                            valuePassed={
                                (selectedSequence.id) ? { label: selectedSequence.name, id: selectedSequence.id } :
                                    {}
                            }
                            existingSequenceIds={menuData?.sequenceIds}
                            isMultiple={false}
                            textToShow="Select Campaign"
                            width="250px"
                            type='sequence'
                            placeholder="Select Campaign"
                        />
                        :
                        <UpgradeButton validationCheck='UPGRADE' callViewAPI={() => { }} />
                }


            </Menu>

            <Menu
                id='addpoollistmenu'
                anchorEl={addtopoollistanchorEl}
                open={openAddToPoolListenBtn}
                onClose={handleProfileMenuClose}
                MenuListProps={{
                    "aria-labelledby": 'add-poollist-btn',
                }}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
                PaperProps={{
                    style: { overflow: "visible" },
                }}
                sx={{
                    boxShadow: "0px",
                    "& .MuiList-root.MuiMenu-list": {
                        pt: "8px",
                        pb: "15px",
                        pr: "10px",
                        pl: "10px",
                    },
                }}
            >
                <MUIAutoComplete
                    id='talentPoolId1'
                    handleChange={(id: any, name: string) => {
                        setSelectedTalentPool({ id, name });
                        addToTopTalentPool(id, name);
                    }}
                    valuePassed={
                        (selectedTalentPool.id) ? { label: selectedTalentPool.name, id: selectedTalentPool.id } :
                            {}
                    }
                    isMultiple={false}
                    textToShow="Talent Pool"
                    width="250px"
                    type='talentPool'
                    placeholder="Select Pool"
                />
            </Menu>
            {(tabValue === "Pending") && <Button
                variant="outlined"
                color="secondary"
                disabled={Object.keys(rowSelection).length > 0 ? false : true}
                startIcon={<PersonAddAltIcon />}
                id="add-pendinglist-btn"
                disableRipple
                onClick={() => handleClickInvite(true)}
            >
                Re-Invite
            </Button>
            }
            {(tabValue === "Not Invited") && <Button
                variant="outlined"
                color="secondary"
                disabled={Object.keys(rowSelection).length > 0 ? false : true}
                startIcon={<PersonAddAltIcon />}
                id="add-invitelist-btn"
                disableRipple
                onClick={() => handleClickInvite(false)}
            >
                Invite
            </Button>
            }
            {/* {
                userLocalData.adminSettings(ID_SETTINGS_EVALUTE) && customHeadingsList.length ?
                    <Button
                        variant="outlined"
                        color="secondary"
                        disabled={Object.keys(rowSelection).length > 0 ? false : true}
                        onClick={assignCriteria}
                    >
                        Evaluate
                    </Button>
                    :
                    null
            } */}
            {
                userLocalData.adminSettings(ID_ATS_VOICEAI) ?
                    <Button
                        variant="outlined"
                        color="secondary"
                        disabled={Object.keys(rowSelection).length > 0 ? false : true}
                        onClick={() => setAddMatchToModal(true)}
                    >
                        Voice AI
                    </Button>
                    :
                    null
            }

            {userLocalData.adminSettings(ID_ATS_BULLHORN) ?
                <Button variant="outlined" color="secondary" id="bullhorn-btn"
                    disabled={Object.keys(rowSelection).length > 0 ? false : true}
                    disableRipple aria-haspopup="true"
                    onClick={() => { publishCandidateToBullhorn() }}
                >
                    Bullhorn
                </Button>
                :
                null
            }

            {userLocalData.adminSettings(ID_ATS_JOBDIVA) ?
                <Button variant="outlined" color="secondary" id="jobdiva-btn"
                    disabled={Object.keys(rowSelection).length > 0 ? false : true}
                    disableRipple aria-haspopup="true"
                    onClick={() => { publishCandidateToJobdiva() }}
                >
                    Job Diva
                </Button>
                :
                null
            }
            {userLocalData.adminSettings(ID_ATS_AVIONTEAPI) ?
                <Button variant="outlined" color="secondary" id="Avionte-btn"
                    disabled={Object.keys(rowSelection).length > 0 ? false : true}
                    disableRipple aria-haspopup="true"
                    onClick={() => { publishCandidateToAvionte() }}
                >
                    Avionte
                </Button>
                :
                null
            }
            {((tabValue === "Pending") || (tabValue === 'Not Invited')) &&
                <Button variant="outlined" color="secondary" id="Avionte-btn"
                    disabled={Object.keys(rowSelection).length > 0 ? false : true}
                    disableRipple aria-haspopup="true"
                    onClick={() => { EnrollNow() }}
                >
                    Enroll
                </Button>

            }
            {/*
            <Button variant="outlined" color="secondary" className="mr-2" id="addToLists"
                disabled={Object.keys(rowSelection).length > 0 ? false : true}
                disableRipple aria-haspopup="true"
                onClick={() => { setOpenAddToListsModal(true) }}
            >
                Add to Lists
            </Button> */}

        </Grid>
        <Stack className="customSorting">
            <Button
                variant="outlined"
                startIcon={
                    <>
                        <SouthRoundedIcon className={sortType === "asc" ? 'flip' : ''} />
                        <MenuIcon />
                    </>
                }
                endIcon={<ArrowDropDownIcon />}
                onClick={handleSortClick}
                sx={{ width: '155px', mr: 2, ml: 'auto' }}
                className="d-none"
            >
                {sortColumn === "" ? 'Sort By' : sortColumn}
            </Button>
            <Popover
                id={sortId}
                open={sortOpen}
                anchorEl={sortAnchorEl}
                onClose={handleSortClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Box sx={{ p: 2, width: '200px' }}>
                    <FormControl fullWidth className="mb-2">
                        <label>Sort by...</label>
                        <Select
                            id="sortColumn"
                            size="small"
                            value={sortColumn}
                            onChange={(e) => setSortColumn(e.target.value)}
                            className="sortingPopoverSelect"
                        >
                            <MenuItem value={'Name'}>Name</MenuItem>
                            <MenuItem value={'State'}>State</MenuItem>
                            <MenuItem value={'Company'}>Company</MenuItem>
                            <MenuItem value={'JobTitle'}>JobTitle</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth className="mb-2">
                        <Select
                            id="sortType"
                            size="small"
                            value={sortType}
                            onChange={(e) => setSortType(e.target.value)}
                            className="sortingPopoverSelect"
                        >
                            <MenuItem value={'asc'}>Ascending</MenuItem>
                            <MenuItem value={'des'}>Descending</MenuItem>
                        </Select>
                    </FormControl>
                    <Button
                        color="primary"
                        sx={{ width: '100% !important', height: '32px !important' }}
                        onClick={() => {
                            setSorting([{
                                desc: sortType === "des" ? true : false,
                                id: sortColumn.toLowerCase()
                            }]);
                            handleSortClose();
                        }
                        }
                    >
                        Apply
                    </Button>
                </Box>
            </Popover>
        </Stack>
        <Stack direction="row" spacing={2} alignItems={"center"} className="actionRightItems">
            {/* {!isInJob && <Button variant="outlined" ref={tableLayoutRef} sx={{ minWidth: "120px" }} color="secondary" onClick={() => setOpenNewLayoutModal(true)} endIcon={<ArrowDropDownIcon />}>
                Table Layout
            </Button>} */}
            <Button variant="outlined" ref={tableLayoutRef} sx={{ minWidth: "120px" }} color="secondary" onClick={() => setOpenNewLayoutModal(true)} endIcon={<ArrowDropDownIcon />}>
                Table Layout
            </Button>
            {/* <FormControl fullWidth>
            <MUIAutoComplete
                id='communityId'
                handleChange={(id: any, name: string) => {
                    setSelectedCommunity({ id, name });
                    if (id) {
                        buildJson(0, 50, true, id);
                        saveAuditLog(3942);
                    }
                }}
                valuePassed={
                    (selectedCommunity.id) ? { label: selectedCommunity.name, id: selectedCommunity.id } :
                        {}
                }
                isMultiple={false}
                //textToShow="Select Name"
                width="200px"
                type='communityUser'
                placeholder="Search Name"
            />
        </FormControl> */}
            {
                !isInJob ?
                    <CommunitySearchName searchNameInParent={searchName} searchNameRefInParent={searchNameRef} onSearchName={onSearchChange} clearData={() => applyFilters(mainJsonDataRef, isFiltersApplied, isAIMatchSelected)} />
                    :
                    null
            }

            {/* <TextField fullWidth size="small"
            placeholder="Search Name"
            value={searchName}
            onKeyUp={(e) => {
                if (e.key === "Enter") {
                    if ((e.target as HTMLInputElement).value) {
                        onSearchKey((e.target as HTMLInputElement).value);
                    }
                }
            }}
            onChange={onSearchChange}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <SearchIcon className='searchIcon' onClick={() => {
                            if (searchName) {
                                onSearchKey(searchName);
                            }
                        }} />
                    </InputAdornment>
                ),

            }}
        /> */}



            {
                isInJob ?
                    <Tooltip title='Refresh'>
                        <IconButton className='ml-4' color="primary" onClick={async () => {
                            refreshData()
                        }}><RefreshIcon /></IconButton>
                    </Tooltip>
                    :
                    null
            }


        </Stack>

        {
            addMatchToModal ?
                <AddMatchToModal
                    dialogOpen={addMatchToModal}
                    closePopup={() => setAddMatchToModal(false)}
                    candidateId={Object.keys(rowSelection).map(n => Number(n))}
                    moveToVoiceAI={true}
                />
                :
                null
        }
        {
            openAddToListsModal ?
                <AddToListsDialog
                    open={openAddToListsModal}
                    onClose={() => setOpenAddToListsModal(false)}
                    selectedRowIds={Object.keys(rowSelection)}
                    moduleType={'candidate'}
                />
                : null
        }

    </span>
}

export default ActionItems;