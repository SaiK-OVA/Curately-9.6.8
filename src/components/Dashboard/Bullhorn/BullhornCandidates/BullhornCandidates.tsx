import { React, useEffect, useMemo, useState } from "../../../../shared/modules/React";
import { Button } from "../../../../shared/modules/MaterialImports/Button";
import { Grid } from "../../../../shared/modules/MaterialImports/Grid";
import { Stack } from "../../../../shared/modules/MaterialImports/Stack";
import { Typography } from "../../../../shared/modules/MaterialImports/Typography";
import { MaterialReactTable, MRT_ColumnDef } from "../../../../shared/modules/MaterialReactTable";
import CustomPagination from "../../../shared/CustomPagination/CustomPagination";
import SwitchLeftIcon from "@mui/icons-material/SwitchLeft";
import { TextField } from "../../../../shared/modules/MaterialImports/TextField";
import { Checkbox } from "../../../../shared/modules/MaterialImports/FormElements";
import { InputAdornment } from '../../../../shared/modules/commonImports';
import { DateTime } from '../../../../shared/modules/Luxon';
import { DatePicker,  LocalizationProvider, AdapterLuxon } from '../../../../shared/modules/MaterialImports/DatePicker';
import { Box } from "../../../../shared/modules/MaterialImports/Box";
import { trackPromise } from '../../../../shared/modules/PromiseTrackter';
import { showToaster } from '../../../../shared/modules/commonImports';
import { userLocalData } from '../../../../shared/services/userData';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { Tooltip } from '../../../../shared/modules/MaterialImports/ToolTip';
import {
    type MRT_ColumnFiltersState,
    //type MRT_Virtualizer,
} from 'material-react-table';
import { CloseRounded, SearchOutlined } from '@mui/icons-material';
import ApiService from '../../../../shared/api/api';
import { FormatMillisecondsToCustomDate } from '../../../../shared/utils/FormatMillisecondsToCustomDate';
import "./BullhornCandidates.scss";

const BullhornCandidates = () => {
    const [startDate, setStartDate] = useState<any>();
    const [endDate, setEndDate] = useState<any>();
    const [searched, setSearched] = useState<boolean>(false);

    const [searchCandidateName, setSearcheCandidateName] = useState<any>('');
    const [searchCandidateEmail, setSearcheCandidateEmail] = useState<any>('');
    const [bullhornCandidatesList, setBullhornCandidatesList] = useState<any[] | never[]>([]);

    const [searchValue, setSearchValue] = useState("");
    const [isSelectAllChecked, setIsSelectAllChecked] = useState(false);
    const [rowSelection, setRowSelection] = useState({});
    const [rowCount, setRowCount] = useState(0);
    const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
        [],
    );

    const [globalFilter, setGlobalFilter] = useState<string>();

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });


    const columns: MRT_ColumnDef<any>[] = [
        // {
        //     accessorKey: "id",
        //     header: "ID",
        //     size: 60, 
        // },
        {
            accessorKey: "name",
            header: "Candidate Name",

        },
        {
            accessorKey: "email",
            header: "Email",
            Cell: ({ row }: any) => (row.original.email.toLowerCase())
        },
        {
            accessorKey: "dateLastModified",
            header: "Date",
            Cell: ({ row }: any) => (
                FormatMillisecondsToCustomDate.formatMillisecondsToCustomDate(+row.original.dateLastModified)
            ),
        },
        {
            accessorKey: "curatelyId",
            header: "Curately", 
            Cell: ({ row }: any) => (
                (row.original.curatelyId) ? <Tooltip title="Curately Id" >
                    <span className="ml-4">
                        {(row.original.curatelyId) ? <CheckOutlinedIcon /> : ""}
                    </span>
                </Tooltip> : ""

            ),
            size: 80, 
        },
    ];


    const CandidatePushBullhorntoCurately = () => {

        const selectedIds = Object.keys(rowSelection);
        // console.log(selectedIds);
        let data = {
            "atsName": "Bullhorn",
            "clientId": userLocalData.getvalue('clientId'),
            "recruiterId": userLocalData.getvalue('recrId'),
            "moduleName": "Candidate",
            "atsValues": selectedIds
        }

        trackPromise(
            ApiService.postWithData('ats', 'ats/consume', data).then((response: any) => {

                // setSearched(true);
                //  console.log(response.data);
                if (response.data?.Success && response.data?.Status === 200) {
                    // setBullhornJobsList(response.data.data.data);
                    showToaster(response.data.Message, 'success')
                    setRowSelection({});
                    setIsSelectAllChecked(false);
                    //     console.log(response.data)
                    getBullhornCandidatesList();
                } else {
                    showToaster((response.data.Message) ? response.data.Message : "An error occured while getting this Push to Curately.", 'error')
                }
            })
        );
    }



    const flatData = useMemo(
        () => {
            return bullhornCandidatesList?.filter((page) => {
                return page.name.toLowerCase().includes(searchValue.toLowerCase() || "");
            }) ?? [];
        },
        [searchValue, bullhornCandidatesList],
    );

    const getBullhornCandidatesList = () => {
        if (searchCandidateName || searchCandidateEmail || (startDate && endDate && (startDate.startOf("day") <= endDate.startOf("day")))) {

            let data = {
                "entityName": "Candidate",
                "clientId": userLocalData.getvalue('clientId'),
                "candidate":
                {
                    "name": searchCandidateName,
                    "email": searchCandidateEmail,
                    "dateAdded": startDate ? startDate.toFormat('yyyyMMdd') : '',
                    "dateLastModified": endDate ? endDate.toFormat('yyyyMMdd') : '',
                },

                "count": pagination.pageSize,
                "sort": "-dateLastModified",
                "start": pagination.pageIndex * pagination.pageSize,
                "fields": "id,name,email,dateLastModified"
            }

            trackPromise(
                ApiService.postWithData('ats', 'bullhorn/search', data).then((response: any) => {

                    setSearched(true);
                     console.log(response.data);
                      console.log(response.data?.data?.total);
                    if (response.data?.Success && response.data?.Status === 200) {

                        setRowCount(Number(response.data?.data?.total ? response.data?.data?.total : 0));
                        setBullhornCandidatesList([...response.data.data.data]);
                        //console.log(response.data.data)
                    } else {
                        showToaster((response.data.Message) ? response.data.Message : "An error occured while getting this Candidate Name.", 'error')
                    }
                })
            );
        } else if ((!searchCandidateName) && (!searchCandidateEmail)) {
            showToaster('Enter Valid Candidate Name or Email.', 'error');
        }
        else if (!startDate) {
            showToaster('Enter Valid Start Date.', 'error');
        } else if (!endDate) {
            showToaster('Enter Valid End Date.', 'error');
        } else if (startDate.startOf("day") > endDate.startOf("day")) {
            showToaster('Start Date should be less than End Date.', 'error');
        }

    }

    useEffect(() => {
        if (searchCandidateName || searchCandidateEmail || (startDate && endDate && (startDate.startOf("day") <= endDate.startOf("day")))) {
            getBullhornCandidatesList();
        }
    }, [pagination.pageIndex, pagination.pageSize])

    const handleSelectAll = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsSelectAllChecked(event.target.checked);
        if (event.target.checked) {
            let rowData: any = {};
            let tempData: any = bullhornCandidatesList;
            for (let index = 0; index < bullhornCandidatesList.length; index++) {
                rowData[tempData[index].id] = true;
            }
            setRowSelection(rowData);
        } else {
            setRowSelection({});
        }
    }


    const onSearchKey = (val: string) => {
        const stringToValidate = val ? val.trim() : "";
        if (stringToValidate) {
            setSearcheCandidateEmail(stringToValidate);
        }
        if (!stringToValidate.includes(' ') && stringToValidate.includes('@')) {
            //  setSearcheCandidateEmail(stringToValidate); 
            // console.log("email : " + stringToValidate);
            // Email validation
            if (stringToValidate.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                setSearcheCandidateEmail(stringToValidate);
                // console.log("email : " + stringToValidate);
            }
            else {
                showToaster("Please enter valid Email", 'error');
                return;
            }
        }

    }


    return (
        <div className="" id="BullhornCandidates">
            <div className="">
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    className="customCard px-4 py-2 mb-2"
                    sx={{ minHeight: "auto !important" }}
                >
                    <Stack direction="row" spacing={3}>
                        <Typography variant="h6" className="header, pt-1">
                            Bullhorn Candidates
                        </Typography>
                    </Stack>
                </Grid>

                <Grid
                    className="my-3 customCard "
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                >
                    <Stack direction="row" spacing={3} style={{ paddingRight: '22px' }}>
                        <TextField
                            fullWidth
                            label="Candidate Name"
                            size="small"
                            placeholder="Search by Candidate Name"
                            value={searchCandidateName}
                            onChange={(e) => setSearcheCandidateName(e.target.value)}
                        />
                    </Stack>
                    <Stack direction="row" spacing={3} style={{ paddingRight: '22px' }}>
                        <TextField
                            fullWidth
                            label="Candidate Email"
                            size="small"
                            onKeyUp={(e) => {
                                if (e.key === "Enter") {
                                    if ((e.target as HTMLInputElement).value) {
                                        onSearchKey((e.target as HTMLInputElement).value);
                                    }
                                }
                            }}
                            placeholder="Search by Candidate Email"
                            value={searchCandidateEmail}
                            onChange={(e) => setSearcheCandidateEmail(e.target.value)}
                        />
                    </Stack>
                    <Stack direction="row" spacing={3} >
                        <LocalizationProvider dateAdapter={AdapterLuxon}>
                            <Grid
                                container
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="center"
                            >
                                <DatePicker
                                    label='Start Date'
                                    value={startDate}
                                    onChange={(newValue) => {
                                        if (newValue) {
                                            setStartDate(newValue);
                                        } else {
                                            setStartDate('');
                                        }
                                    }}
                                    slotProps={{
                                        textField: {
                                            size: 'small',
                                            fullWidth: false,
                                            InputProps: {
                                                style: {
                                                    textAlign: 'center',
                                                },
                                            },

                                        },
                                    }}
                                    maxDate={endDate}
                                />
                                <Box sx={{ mx: 2 }}> to </Box>
                                <DatePicker
                                    label='End Date'
                                    value={endDate}
                                    onChange={(newValue) => {
                                        if (newValue) {
                                            setEndDate(newValue);
                                        } else {
                                            setEndDate('');
                                        }
                                    }}
                                    slotProps={{
                                        textField: {
                                            size: 'small',
                                            fullWidth: false,
                                            InputProps: {
                                                style: {
                                                    textAlign: 'center',
                                                },
                                            },
                                        },
                                    }}
                                    maxDate={DateTime.now()}
                                />
                            </Grid>
                        </LocalizationProvider>

                    </Stack>
                    <Button
                        variant="contained"
                        color="primary"
                        className="ml-4"
                        fullWidth
                        onClick={() => {
                            setPagination({
                                pageIndex: 0,
                                pageSize: 10,
                            })
                            getBullhornCandidatesList();
                        }}
                    >
                        Search
                    </Button>
                </Grid>

                <div className="p-4 customCard CardView">

                    {searched ? <div className="MRTableCustom pl-0 ">

                        <Grid container className="actionItems" width={"auto"}>
                            <Checkbox
                                className="select-all-checkbox"
                                disableRipple
                                color="default"
                                checked={isSelectAllChecked}
                                onChange={handleSelectAll}
                            />

                            <Button
                                variant="outlined"
                                color="secondary"
                                className='mr-2 ml-2'
                                disabled={Object.keys(rowSelection).length > 0 ? false : true}
                                onClick={() => CandidatePushBullhorntoCurately()}
                            >
                                Push to Curately
                            </Button>

                        </Grid>
                        <MaterialReactTable
                            columns={columns}
                            enableRowSelection
                            data={flatData}
                            enablePinning
                            muiSearchTextFieldProps={{
                                placeholder: `Search`,
                                sx: { width: '205px', right: "50px", padding: "-10px", height: "20px", marginTop: "-10px", marginRight: "-40px" },
                                value: searchValue,
                                onChange: (e: any) => { setSearchValue(e.target.value) },
                                InputProps: {
                                    startAdornment: <InputAdornment position="start"><SearchOutlined fontSize='small' htmlColor='#757575' /></InputAdornment>,
                                    endAdornment: <InputAdornment position="end" disablePointerEvents={searchValue ? false : true}>
                                        <CloseRounded fontSize='small' htmlColor={searchValue ? "#757575" : "#ebebeb"} sx={{ cursor: "pointer" }} onClick={() => setSearchValue("")} />
                                    </InputAdornment>
                                }
                            }}
                            initialState={{
                                density: 'compact',
                                showGlobalFilter: true,
                            }}
                            //  onColumnFiltersChange={setColumnFilters}
                            onGlobalFilterChange={setGlobalFilter}
                            // onSortingChange={setSorting}
                            enableDensityToggle={false}
                            enableFullScreenToggle={false}
                            // manualPagination
                            // manualSorting
                            // enableGlobalFilterModes
                            columnResizeMode="onChange"
                            getRowId={(row) => row.id}
                            onPaginationChange={setPagination}
                            state={{
                                columnFilters,
                                globalFilter,
                                //isLoading,
                                //   showAlertBanner: isError,
                                //   showProgressBars: isFetching,
                                //sorting,
                                rowSelection,
                            }}
                            onRowSelectionChange={setRowSelection}
                            enableStickyHeader
                            enablePagination={false}
                            muiSelectCheckboxProps={(prop) => ({
                                onChange: (e) => {
                                    if (prop.row.id) {
                                        let tempRowSelection: any = { ...rowSelection };
                                        if (e.target.checked) {
                                            tempRowSelection[prop.row.id] = e.target.checked;
                                        } else {
                                            if (tempRowSelection.hasOwnProperty(prop.row.id)) {
                                                delete tempRowSelection[prop.row.id];
                                            }
                                        }
                                        setRowSelection(tempRowSelection);
                                        //   setRowSelection({ ...rowSelection, [prop.row.id]: e.target.checked });
                                        //   console.log(e.target.checked);
                                    }
                                }
                            })}
                            renderBottomToolbarCustomActions={() => (
                                <CustomPagination
                                    page={pagination.pageIndex}
                                    rowsPerPage={10}
                                    rowCount={rowCount}
                                    onChangePage={(page: any) => {
                                        setPagination({ ...pagination, pageIndex: page, pageSize: 10 });

                                    }}
                                // showCount={false}
                                />


                            )}
                            //rowCount={rowCount}
                            icons={{
                                ArrowDownwardIcon: (props: any) => (
                                    <SwitchLeftIcon {...props} />
                                ),
                            }}
                        />
                    </div>
                        : null
                    }

                </div>
            </div>
        </div>
    );
};

export default BullhornCandidates;
