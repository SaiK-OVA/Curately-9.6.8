import { useEffect, useMemo, useState } from "../../../../shared/modules/React";
import { TextField, Paper, Button, Select, MenuItem, Typography, FormControl, Toolbar, IconButton, Box, InputAdornment, Tooltip, Stack } from "@mui/material";
import { MaterialReactTable, MRT_ColumnDef } from "../../../../shared/modules/MaterialReactTable";
import { Grid } from "../../../../shared/modules/MaterialImports/Grid";
import ApiService from "../../../../shared/api/api";
import { userLocalData } from "../../../../shared/services/userData";
import { trackPromise } from "react-promise-tracker";
import { showToaster } from "../../../shared/SnackBar/SnackBar";
import StatsandLogs from "./StatsandLogs";
import "./CreditLimit.scss";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import CloseRounded from "@mui/icons-material/CloseRounded";
import CustomPagination from "../../../shared/CustomPagination/CustomPagination";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";

const CreditAssignment: React.FC = () => {
    const [searchValue, setSearchValue] = useState("");
    const [creditLimitData, setCreditLimitData] = useState<any>([]);
    const [defaultCreditLimitData, setDefaultCreditLimitData] = useState<any>([]);
    const [emailCreditAssign, setEmailCreditAssign] = useState("Custom");
    const [phoneCreditAssign, setPhoneCreditAssign] = useState("Custom");
    const [rowSelection, setRowSelection] = useState({});
    const [emailEquallyCreditValue, setEmailEquallyCreditValue] = useState("");
    const [phoneEquallyCreditValue, setPhoneEquallyCreditValue] = useState("");

    const [globalFilter, setGlobalFilter] = useState('');
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 20, });
    const [rowCount, setRowCount] = useState(0);
    const [isAllSelected, setIsAllSelected] = useState(false);
    const [isShowStats, setIsShowStats] = useState(true);


    useEffect(() => {
        getCreditDetails();
    }, []);

    const getCreditDetails = () => {
        const saveData = {
            clientId: userLocalData.getvalue("clientId"),
        };
        trackPromise(
            ApiService.postWithData("admin", "recruiter/creditDetails", saveData).then(
                (response: any) => {
                    if (response.data.Success) {
                        setCreditLimitData(response.data.recruiterCreditDetails);
                        setDefaultCreditLimitData(response.data.recruiterCreditDetails);
                    } else {
                        showToaster(
                            response.data.Message
                                ? response.data.Message
                                : "An error occurred while fetching credit details",
                            "error"
                        );
                    }
                }
            )
        );
    }


    const handleCreditsUpdate = (e: any, id: any, field: any) => {
        let tempCreditLimitData = creditLimitData;
        const value = e.target.value;

        tempCreditLimitData = tempCreditLimitData.map((each: any) => ({
            ...each,
            [field]: each.recrId === id ? parseInt(value) || "" : each[field]
        }));
        setCreditLimitData([...tempCreditLimitData])
    };


    const getSlicedCell = (data: string) => {
        const displayTitle = data?.length > 20 ? data.slice(0, 20) : data;
        if (data?.length > 20) {
            return (
                <Tooltip title={data}>
                    <span>{displayTitle}...</span>
                </Tooltip>
            )
        } else return <span>{displayTitle}</span>
    }

    const columns = useMemo<MRT_ColumnDef<any>[]>(
        () => [
            {
                accessorKey: "name",
                header: "Name",
                Cell: ({ row }) => getSlicedCell(row.original.recrName),
                //size: 120,
            },
            {
                accessorKey: "email",
                header: "Email",
                Cell: ({ row }) => getSlicedCell(row.original.email),
                //    size: 120,
            },
            {
                accessorKey: "emailUsed",
                header: "Email Used",
                Cell: ({ row }) => (
                    <span>{row.original.usedCreditCount}</span>
                ),
                maxSize: 60,
                size: 50,
            },
            {
                accessorKey: "phoneUsed",
                header: "Phone Used",
                Cell: ({ row }) => (
                    <span>{row.original.usedSmsCount}</span>
                ),
                muiTableBodyCellProps: { sx: { width: "100px" } },
                size: 50,
            },
            {
                accessorKey: "emailAssigned",
                header: "Email Assigned",
                Cell: ({ row }) => {
                    const isRowSelected = row.getIsSelected();
                    return <span>
                        <TextField
                            fullWidth
                            id={`creditCount-${row.original.recrId}`}
                            name={`creditCount-${row.original.recrId}`}
                            size="small"
                            type="number"
                            value={row.original.creditCount}
                            slotProps={{
                                input: { readOnly: ["Unlimited", "Equally"].includes(emailCreditAssign) ? true : (emailCreditAssign === "Custom" ? !isRowSelected : true) }
                            }}
                            onChange={e =>
                                handleCreditsUpdate(e, row.original.recrId, "creditCount")
                            }
                            sx={{ width: "5em" }}
                        />
                    </span>
                },
                maxSize: 60,
                size: 50,
            },
            {
                accessorKey: "phoneAssigned",
                header: "Phone Assigned",
                Cell: ({ row }) => {
                    const isRowSelected = row.getIsSelected();
                    return <span>
                        <TextField
                            fullWidth
                            id={`smsCount-${row.original.recrId}`}
                            name={`smsCount-${row.original.recrId}`}
                            size="small"
                            type="number"
                            value={row.original.smsCount}
                            slotProps={{
                                input: { readOnly: ["Unlimited", "Equally"].includes(phoneCreditAssign) ? true : (phoneCreditAssign === "Custom" ? !isRowSelected : true) }
                            }}
                            onChange={e =>
                                handleCreditsUpdate(e, row.original.recrId, "smsCount")
                            }
                            sx={{ width: "5em" }}
                        />
                    </span>
                },
                maxSize: 60,
                size: 50,
            },
        ],
        [emailCreditAssign, phoneCreditAssign, creditLimitData]
    );

    // const handleSearchChange = (event: any) => {
    //     setSearchValue(event.target.value);
    // };

    // const handleSearchClick = async () => {
    //     const searchData = {
    //         clientId: userLocalData.getvalue("clientId"),
    //         search: searchValue ? searchValue : ""
    //     };

    //     try {
    //         const response = await ApiService.postWithData("admin", "recruiter/creditDetails", searchData);
    //         if (response.data.Success) {
    //             setcreditLimitData(response.data.recruiterCreditDetails);
    //         } else {
    //             showToaster(
    //                 response.data.Message ? response.data.Message : "An error occurred while fetching data",
    //                 "error"
    //             );
    //         }
    //     } catch (error) {
    //         console.error("Error fetching recruiter credit details:", error);
    //         showToaster("Something went wrong. Please try again.", "error");
    //     }
    // };

    const getDefaultCount = (type: "EMAIL" | "PHONE", recrId: number) => {
        let creditObj: any = defaultCreditLimitData.find((each: any) => each.recrId === recrId) || null;
        if (creditObj) return creditObj[type === "EMAIL" ? "creditCount" : "smsCount"] || 0;
        else return 0;
    }

    const handleEmailCreditsChange = (event: any) => {
        const value = event.target.value;
        setEmailCreditAssign(value);

        if (["Unlimited", "Equally"].includes(value)) {
            let tempCreditLimitData = creditLimitData;
            // const startIndex = (pagination.pageIndex * pagination.pageSize);
            // const endIndex = ((pagination.pageIndex + 1) * pagination.pageSize);
            // tempCreditLimitData = tempCreditLimitData.slice(startIndex, endIndex);

            if (!!Object.keys(rowSelection)?.length) {
                const recrIds = Object.entries(rowSelection).filter(([_, value]) => value).map(([key]) => parseInt(key));
                setCreditLimitData((prev: any) =>
                    prev.map((row: any) => ({
                        ...row,
                        creditCount: recrIds.includes(row.recrId) ?
                            (value === "Unlimited" ? -1 : value === "Equally" ? emailEquallyCreditValue || 0 : getDefaultCount("EMAIL", row.recrId)) :
                            getDefaultCount("EMAIL", row.recrId)
                    }))
                );
            } else {
                const newSelection = tempCreditLimitData.reduce((acc: any, row: any) => {
                    acc[row.recrId] = true;
                    return acc;
                }, {});

                setRowSelection((prev) => ({ ...prev, ...newSelection }));
                setCreditLimitData((prevData: any) =>
                    prevData.map((row: any, index: number) => ({
                        ...row,
                        creditCount: (
                            value === "Unlimited" ? -1 : value === "Equally" ? emailEquallyCreditValue || 0 : getDefaultCount("EMAIL", row.recrId)
                        )
                    }))
                );
            }
            setIsAllSelected(true);

        } else {
            if (!["Unlimited", "Equally"].includes(phoneCreditAssign)) {
                setRowSelection({});
                setIsAllSelected(false);
            }
            setCreditLimitData((prev: any) =>
                prev.map((row: any) => ({
                    ...row,
                    creditCount: getDefaultCount("EMAIL", row.recrId)
                }))
            );
        }
        // setCreditLimitData((prevData: any) =>
        //     prevData.map((row: any) => ({
        //         ...row,
        //         creditCount:
        //             value === "Unlimited" ? -1 :
        //                 value === "Custom" ? getDefaultCount("EMAIL", row.recrId) :
        //                     emailEquallyCreditValue || 0,
        //     }))
        // );
    };

    const handlePhoneCreditsChange = (event: any) => {
        const value = event.target.value;
        setPhoneCreditAssign(value);

        if (["Unlimited", "Equally"].includes(value)) {
            let tempCreditLimitData = creditLimitData;
            // const startIndex = (pagination.pageIndex * pagination.pageSize);
            // const endIndex = ((pagination.pageIndex + 1) * pagination.pageSize);
            // tempCreditLimitData = tempCreditLimitData.slice(startIndex, endIndex);

            if (!!Object.keys(rowSelection)?.length) {
                const recrIds = Object.entries(rowSelection).filter(([_, value]) => value).map(([key]) => parseInt(key));
                setCreditLimitData((prev: any) =>
                    prev.map((row: any) => ({
                        ...row,
                        smsCount: recrIds.includes(row.recrId) ?
                            (value === "Unlimited" ? -1 : value === "Equally" ? phoneEquallyCreditValue || 0 : getDefaultCount("PHONE", row.recrId)) :
                            getDefaultCount("PHONE", row.recrId)
                    }))
                );
            } else {
                const newSelection = tempCreditLimitData.reduce((acc: any, row: any) => {
                    acc[row.recrId] = true;
                    return acc;
                }, {});
                setRowSelection((prev) => ({ ...prev, ...newSelection }));
                setCreditLimitData((prevData: any) =>
                    prevData.map((row: any, index: number) => ({
                        ...row,
                        smsCount: (
                            value === "Unlimited" ? -1 : value === "Equally" ? phoneEquallyCreditValue || 0 : getDefaultCount("PHONE", row.recrId)
                        )
                    }))
                );
            }
            setIsAllSelected(true);

        } else {
            if (!["Unlimited", "Equally"].includes(emailCreditAssign)) {
                setRowSelection({});
                setIsAllSelected(false);
            }
            setCreditLimitData((prevData: any) => prevData.map((row: any) => ({
                ...row,
                smsCount: getDefaultCount("PHONE", row.recrId)
            })))
        }
        // setCreditLimitData((prevData: any) =>
        //     prevData.map((row: any) => ({
        //         ...row,
        //         smsCount:
        //             value === "Unlimited" ? -1 :
        //                 value === "Custom" ? getDefaultCount("PHONE", row.recrId) :
        //                     phoneEquallyCreditValue || 0,
        //     }))
        // );
    };

    const handleEmailEquallyCreditChange = (event: any) => {
        const value = event.target.value;
        setEmailEquallyCreditValue(value);
        const recrIds = Object.entries(rowSelection).filter(([_, value]) => value).map(([key]) => parseInt(key));

        if (emailCreditAssign === "Equally") {
            setCreditLimitData((prevData: any) =>
                prevData.map((row: any) => ({
                    ...row,
                    creditCount: recrIds.includes(row.recrId) ? parseInt(value) || 0 : row.creditCount,
                }))
            );
        }
    };

    const handlePhoneEquallyCreditChange = (event: any) => {
        const value = event.target.value;
        setPhoneEquallyCreditValue(value);
        const recrIds = Object.entries(rowSelection).filter(([_, value]) => value).map(([key]) => parseInt(key));

        if (phoneCreditAssign === "Equally") {
            setCreditLimitData((prevData: any) =>
                prevData.map((row: any) => ({
                    ...row,
                    smsCount: recrIds.includes(row.recrId) ? parseInt(value) || 0 : row.smsCount,
                }))
            );
        }
    };

    const handleSaveChanges = async () => {
        // const selectedEmails = Object.keys(rowSelection).filter((email) => rowSelection[email as keyof typeof rowSelection]);
        const selectedRecrIds = Object.entries(rowSelection).filter(([_key, value]) => value).map(([key]) => parseInt(key))

        if (emailCreditAssign === "Custom" && phoneCreditAssign === "Custom" && selectedRecrIds.length === 0) {
            showToaster("Select recruiters to assign credits", "error");
            return false
        }

        if (emailCreditAssign === "Equally" && !emailEquallyCreditValue) {
            showToaster("Enter email credit value", "error");
            return false
        }
        if (phoneCreditAssign === "Equally" && !phoneEquallyCreditValue) {
            showToaster("Enter phone credit value", "error");
            return false
        }

        const recruiterCreditDetails = creditLimitData
            .filter((row: any) => selectedRecrIds.includes(row.recrId))
            .map((row: any) => ({
                recrId: row.recrId,
                creditCount: row.creditCount,
                smsCount: row.smsCount,
            }));

        const requestBody = {
            clientId: userLocalData.getvalue("clientId"),
            recrId: userLocalData.getvalue("recrId"),
            emailCreditType: emailCreditAssign,
            phoneCreditType: phoneCreditAssign,
            recruiterCreditDetails,
        };

        try {
            trackPromise(
                ApiService.postWithData("admin", "recruiter/creditsUpdate", requestBody).then((response: any) => {
                    if (response.data.Success) {
                        showToaster("Credits updated successfully!", "success");
                        setRowSelection({});
                        setIsAllSelected(false);
                        setEmailCreditAssign("Custom");
                        setPhoneCreditAssign("Custom");
                        setEmailEquallyCreditValue("");
                        setPhoneEquallyCreditValue("");
                        setSearchValue("");
                        getCreditDetails(); // Refresh the data
                    } else {
                        showToaster(response.data.Message || "Failed to update credits", "error");
                    }
                })
            )
        } catch (error) {
            console.error("Error updating recruiter credits:", error);
            showToaster("Something went wrong. Please try again.", "error");
        }
    };


    const filteredData = useMemo(() => {

        let trimmedSearchValue = searchValue?.toLowerCase()?.trim() || "";
        const records = creditLimitData.filter((page: any) => {
            return page.recrName?.toLowerCase().includes(trimmedSearchValue?.toLowerCase() || "") || page.email?.toLowerCase().includes(trimmedSearchValue?.toLowerCase() || "");
        })
        setRowCount(records.length);
        return records;
        // if (trimmedSearchValue) {
        //     return records;
        // } else {
        //     return records.slice((pagination.pageIndex * pagination.pageSize), ((pagination.pageIndex + 1) * pagination.pageSize));
        // }
    },
        [searchValue, creditLimitData],
    );

    const handleClearChanges = () => {
        setCreditLimitData([...defaultCreditLimitData]);
        setRowSelection({});
        setEmailCreditAssign("Custom");
        setPhoneCreditAssign("Custom");
        setEmailEquallyCreditValue("");
        setPhoneEquallyCreditValue("");
        setSearchValue("");
        setIsAllSelected(false);
        setPagination({ ...pagination, pageIndex: 0 })
    }

    return (
        <div id="CreditLimit">
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                className="customCard pt-1 mb-2 mt-2"
                sx={{ minHeight: "auto !important" }}
            >
                <Typography variant="h6" className="headerName">
                    Credit Assignment
                </Typography>
            </Grid>
            <Grid container direction="row" spacing={1}>
                <Grid size={isShowStats ? 9 : 12}>
                    <Grid container spacing={0} className="customCard px-0 py-2 ">
                        <Grid sx={{ width: "calc(100%)" }}>
                            <div className="MRTableCustom pl-0 mt-1">
                                <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} spacing={1} className="headerFormContainer">
                                    <Stack direction={"row"} alignItems={"center"} spacing={0}>
                                        <TextField
                                            placeholder={`name or email`}
                                            size={"small"}
                                            id="Search"
                                            name={"Search"}
                                            className={"creditSearchName mr-1"}
                                            value={searchValue}
                                            onChange={(e: any) => { setSearchValue(e.target.value) }}
                                            slotProps={{
                                                input: {
                                                    startAdornment: <SearchOutlined fontSize='small' htmlColor='#757575' />,
                                                    endAdornment: <InputAdornment position="end" disablePointerEvents={searchValue ? false : true}>
                                                        <CloseRounded fontSize='small' htmlColor={searchValue ? "#757575" : "#ebebeb"} sx={{ cursor: "pointer" }} onClick={() => setSearchValue("")} />
                                                    </InputAdornment>
                                                }
                                            }}
                                        />
                                        <TextField
                                            sx={{ width: isShowStats ? "110px" : "150px" }}
                                            fullWidth
                                            label="Assign Email Credits"
                                            name="Assign-Email-Credits"
                                            id="Assign-Email-Credits"
                                            size="small"
                                            className="mr-1"
                                            select
                                            placeholder="Assign Email"
                                            value={emailCreditAssign}
                                            onChange={handleEmailCreditsChange}
                                        >
                                            <MenuItem value="Custom">Custom</MenuItem>
                                            <MenuItem value="Equally">Equally</MenuItem>
                                            <MenuItem value="Unlimited">Unlimited</MenuItem>
                                        </TextField>

                                        {emailCreditAssign === "Equally" && (
                                            <TextField
                                                size="small"
                                                placeholder="Email Credits"
                                                label="Email Credits"
                                                id="Email Credits"
                                                name="Email Credits"
                                                className="mr-1"
                                                value={emailEquallyCreditValue}
                                                onChange={handleEmailEquallyCreditChange}
                                                sx={{ width: isShowStats ? "100px" : "140px" }}
                                                type="number"
                                                fullWidth
                                            />
                                        )}
                                        <TextField
                                            sx={{ width: isShowStats ? "110px" : "150px" }}
                                            fullWidth
                                            className="selHeight mr-1"
                                            label="Assign Phone Credits "
                                            name="Assign-Phone-Credits"
                                            id="Assign-Phone-Credits"
                                            size="small"
                                            select
                                            placeholder="Assign Phone   "
                                            value={phoneCreditAssign}
                                            onChange={handlePhoneCreditsChange}
                                        >
                                            <MenuItem value="Custom">Custom</MenuItem>
                                            <MenuItem value="Equally">Equally</MenuItem>
                                            <MenuItem value="Unlimited">Unlimited</MenuItem>
                                        </TextField>

                                        {phoneCreditAssign === "Equally" && (
                                            <TextField
                                                size="small"
                                                placeholder="Phone Credit Value"
                                                id="Phone Credit Value"
                                                name="Phone Credit Value"
                                                label="Phone Credit"
                                                className="mr-1"
                                                value={phoneEquallyCreditValue}
                                                onChange={handlePhoneEquallyCreditChange}
                                                sx={{ width: isShowStats ? "100px" : "140px" }}
                                                type="number"
                                                fullWidth
                                            />
                                        )}
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            className="mr-1"
                                            onClick={handleSaveChanges}
                                        >
                                            Save
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            sx={{ textTransform: "none", height: "26px" }}
                                            onClick={handleClearChanges}
                                        >
                                            Clear
                                        </Button>
                                    </Stack>
                                    <Tooltip title="Toggle Stats">
                                        <IconButton size="small" onClick={() => setIsShowStats((prev) => !prev)}><KeyboardDoubleArrowRightOutlinedIcon className={`${!isShowStats ? "statsIconFlip" : ""}`} /></IconButton>
                                    </Tooltip>
                                </Stack>
                                <MaterialReactTable
                                    columns={columns}
                                    data={filteredData}
                                    enableTopToolbar={false}
                                    enableStickyHeader
                                    enableRowSelection
                                    initialState={{
                                        columnPinning: { left: ["mrt-row-select", 'name'] },
                                        density: "compact",
                                        showGlobalFilter: true
                                    }}
                                    enableDensityToggle={false}
                                    enableFullScreenToggle={false}
                                    enableGlobalFilterModes
                                    columnResizeMode="onChange"
                                    enablePagination={true}
                                    state={{
                                        pagination,
                                        globalFilter,
                                        rowSelection,
                                    }}
                                    muiTableProps={{
                                        sx: {
                                            '& td, & th': { padding: { xs: '4px', sm: '8px' } },
                                        },
                                    }}
                                    muiPaginationProps={{
                                        rowsPerPageOptions: [20],
                                        showLastButton: false,
                                        SelectProps: {
                                            style: { display: 'none' }, // Hide the rows per page dropdown
                                        },
                                    }}
                                    renderBottomToolbarCustomActions={() => (
                                        <CustomPagination
                                            page={pagination.pageIndex}
                                            rowsPerPage={pagination.pageSize}
                                            rowCount={rowCount}
                                            onChangePage={(page: any) =>
                                                setPagination({
                                                    ...pagination,
                                                    pageIndex: page,
                                                    pageSize: pagination.pageSize,
                                                })
                                            }
                                        />
                                    )}

                                    onGlobalFilterChange={setGlobalFilter}
                                    getRowId={(row) => row.recrId}
                                    onRowSelectionChange={(rowSelectionState: any) => {
                                        const updatedRowSelection = rowSelectionState(rowSelection);
                                        const recrIds = Object.entries(updatedRowSelection).filter(([_, value]) => value).map(([key]) => parseInt(key));
                                        setCreditLimitData((prev: any) =>
                                            prev.map((each: any) => ({
                                                ...each,
                                                creditCount: recrIds.includes(each.recrId) ?
                                                    (
                                                        emailCreditAssign === "Unlimited" ? -1 :
                                                            emailCreditAssign === "Equally" ? (emailEquallyCreditValue || 0) :
                                                                getDefaultCount("EMAIL", each.recrId)
                                                    ) : getDefaultCount("EMAIL", each.recrId),
                                                smsCount: recrIds.includes(each.recrId) ?
                                                    (
                                                        phoneCreditAssign === "Unlimited" ? -1 :
                                                            phoneCreditAssign === "Equally" ? (phoneEquallyCreditValue || 0) :
                                                                getDefaultCount("PHONE", each.recrId)
                                                    ) : getDefaultCount("PHONE", each.recrId)
                                            }))
                                        )
                                        setRowSelection({ ...updatedRowSelection })
                                    }}
                                    enableSelectAll
                                    muiSelectCheckboxProps={({ row }) => ({
                                        onChange: (e: any) => {
                                            let tempCreditLimitData = creditLimitData;
                                            if (row.id) {
                                                let tempRowSelection: any = { ...rowSelection };
                                                let creditLimitIndex = creditLimitData.findIndex((each: any) => each.recrId === row.id);
                                                if (e.target.checked) {
                                                    // "Unlimited", "Equally", "Custom"
                                                    tempCreditLimitData[creditLimitIndex].creditCount = emailCreditAssign === "Unlimited" ? -1 :
                                                        emailCreditAssign === "Custom" ? getDefaultCount("EMAIL", tempCreditLimitData[creditLimitIndex].recrId) :
                                                            (emailEquallyCreditValue || 0);
                                                    tempCreditLimitData[creditLimitIndex].smsCount = phoneCreditAssign === "Unlimited" ? -1 :
                                                        phoneCreditAssign === "Custom" ? getDefaultCount("PHONE", tempCreditLimitData[creditLimitIndex].recrId) :
                                                            (phoneEquallyCreditValue || 0);
                                                    tempRowSelection[row.id] = e.target.checked;
                                                } else {
                                                    if (tempRowSelection.hasOwnProperty(row.id)) {
                                                        delete tempRowSelection[row.id];
                                                    }
                                                    tempCreditLimitData[creditLimitIndex].creditCount = getDefaultCount("EMAIL", tempCreditLimitData[creditLimitIndex].recrId);
                                                    tempCreditLimitData[creditLimitIndex].smsCount = getDefaultCount("PHONE", tempCreditLimitData[creditLimitIndex].recrId);
                                                }
                                                setCreditLimitData([...tempCreditLimitData]);
                                                setRowSelection(tempRowSelection);
                                            }
                                        }
                                    })}
                                    muiSelectAllCheckboxProps={{
                                        onChange: (_: any, checked: boolean) => {
                                            if (checked) {
                                                const newSelection = creditLimitData.reduce((acc: any, row: any) => {
                                                    acc[row.recrId] = true;
                                                    return acc;
                                                }, {});
                                                setRowSelection(newSelection);
                                            } else setRowSelection({});
                                            setIsAllSelected(checked)
                                        },
                                        checked: isAllSelected,
                                    }}
                                />
                            </div>
                        </Grid>
                    </Grid>

                </Grid>

                <Grid size={isShowStats ? 3 : 0} className={`${!isShowStats ? "d-none" : ""}`}>
                    <StatsandLogs />
                </Grid>
            </Grid>
        </div>
    );
};

export default CreditAssignment;