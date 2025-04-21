import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button, Grid, IconButton, showToaster, TextField, } from "../../../../../shared/modules/commonImports";
import { Typography } from "../../../../../shared/modules/MaterialImports/Typography";
import { Stack } from "../../../../../shared/modules/MaterialImports/Stack";
import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";
import { userLocalData } from "../../../../../shared/services/userData";
import ApiService from "../../../../../shared/api/api";
import { trackPromise } from "../../../../../shared/modules/PromiseTrackter";
import { DateTime } from "luxon";
import CustomPagination from "../../../../shared/CustomPagination/CustomPagination";
import { TotalListDialog, totalListDialog } from './TotalList/TotalList';
import { CloseRounded, SearchOutlined } from '@mui/icons-material';
import './ListPage.scss'
import { Link } from "react-router-dom";
import EditOutlined from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlined from "@mui/icons-material/DeleteOutlineOutlined";
import { Dialog, DialogContent, DialogTitle } from "../../../../../shared/modules/MaterialImports/Dialog";
import { Divider } from "../../../../../shared/modules/MaterialImports/Divider";

const ListPage = () => {
    const [contactListData, setContactListData] = useState<any>([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [searchValue, setSearchValue] = useState("");
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const [rowCount, setRowCount] = useState(0);
    const [openAddList, setOpenAddList] = useState(false);
    const [listName, setListName] = useState({ value: "", error: false });
    const [listDescription, setListDescription] = useState({ value: "", error: false });
    const [editListId, setEditListId] = useState<number | null>(null);

    const initialRender = useRef(true);
    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
        } else {
            listData();
        }
    }, []);


    const filteredData = useMemo(() => {

        let trimmedSearchValue = searchValue?.toLowerCase()?.trim() || "";
        const records = contactListData.filter((page: any) => {
            return page.listName.toLowerCase().includes(searchValue.toLowerCase() || "");
        })
        setRowCount(records.length);
        if (trimmedSearchValue) {
            return records;
        } else {
            return records.slice((pagination.pageIndex * pagination.pageSize), ((pagination.pageIndex + 1) * pagination.pageSize));
        }
    },
        [searchValue, contactListData, pagination],
    );

    const listData = () => {
        const saveData = {
            clientId: userLocalData.getvalue("clientId"),
        };
        trackPromise(
            ApiService.postWithData("admin", "getContactsList", saveData).then(
                (response: any) => {
                    console.log(response.data.contactsList, "response..");
                    if (response.data.Success) {
                        setContactListData(response.data.contactsList);
                        // showToaster(response.Message, "success");
                    } else {
                        showToaster(
                            response.data.Message
                                ? response.data.Message
                                : "An error occured while adding Tag",
                            "error"
                        );
                    }
                }
            )
        );
    };

    const handleActionClick = (actionType: "EDIT" | "DELETE", listId: number) => {
        switch (actionType) {
            case "EDIT": trackPromise(
                ApiService.getCall("admin", `getListById/${listId}/${userLocalData.getvalue("clientId")}`).then((res: any) => {
                    if (res.data.Success) {
                        const tempData = res.data.list[0] || null;
                        if (tempData) {
                            setEditListId(listId);
                            setOpenAddList(true);
                            setListName({ error: false, value: tempData?.listName || "" });
                            setListDescription({ error: false, value: tempData?.description || "" });
                        }
                    } else showToaster("Something went wrong", "error");
                })
            ); break;
            case "DELETE": trackPromise(
                ApiService.deleteById("admin", `deleteLists`, `${listId}/${userLocalData.getvalue("clientId")}`).then((res: any) => {
                    if (res.data?.Success) {
                        listData();
                        showToaster(res?.data?.Message, "success")
                    } else showToaster("Something went wrong", "error");
                })
            ); break;
            default: break;
        }

    }


    const columns: MRT_ColumnDef<any>[] = useMemo(
        () => [
            {
                accessorKey: "listName",
                header: "list Name",
                size: 60,
                enableColumnPinning: true,
                Cell: ({ row }) => (
                    <span >{row.original.listName}</span>
                ),
            },

            {
                accessorKey: "count",
                header: "count",
                muiTableHeadCellProps: {
                    align: "center",
                },
                muiTableBodyCellProps: {
                    align: "center",
                },
                Cell: ({ row }) =>
                    row.original.count && row.original.count !== "0" ? (
                        <Link className="hightLightTd" to={{ pathname: `../list/${row.original.listId}` }} state={{ title: row.original.listName }}>
                            <span>
                                {row.original.count}
                            </span>
                        </Link>
                    ) : (
                        <span>{row.original.count}</span>
                    ),
            },

            {
                accessorKey: "createdDate",
                header: "Created Date",
                muiTableHeadCellProps: {
                    align: "center",
                    width: "100px",
                },
                muiTableBodyCellProps: {
                    align: "center",
                    width: "100px",
                },
                Cell: ({ row }) => (
                    <span>
                        {/* {row.original.created_date.substring(0, 10)} */}
                        {DateTime.fromSQL(
                            row.original.createdDate.substring(0, 10)
                        ).toFormat("MM/dd/yyyy")}
                    </span>
                ),
                size: 80,
                minSize: 80,
                maxSize: 80,
            },
            {
                accessorKey: "actions",
                header: "Quick Actions",
                Cell: ({ row }: any) => {
                    return (
                        <Stack direction={"row"} alignItems={"center"}>
                            <IconButton size="small" onClick={() => handleActionClick("EDIT", row.original.listId)}><EditOutlined color={"inherit"} /></IconButton>
                            <IconButton size="small" onClick={() => handleActionClick("DELETE", row.original.listId)}><DeleteOutlineOutlined color={"inherit"} /></IconButton>
                        </Stack>
                    )
                }
            }
        ],
        []
    );
    const handleFieldsChange = (e: { target: { name: string, value: string } }) => {
        const { name, value } = e.target;
        const getError = () => ["", null, undefined].includes(value.trim()) ? true : false;
        switch (name) {
            case "List Name": setListName({ ...listName, value, error: getError() }); break;
            case "List Description": setListDescription({ ...listDescription, value, error: false }); break;
            default: break;
        }
    }

    const handleListSave = () => {
        const fields = [{ ...listName, name: "List Name" }];
        fields.forEach((each) => handleFieldsChange({ target: { value: each.value, name: each.name } }));
        const isAllFieldsValid = fields.every((each) => !["", null, undefined].includes(each.value?.trim()) && !each.error);

        if (isAllFieldsValid) {
            const payLoad = {
                "listName": listName.value,
                "description": listDescription.value,
                "createdBy": userLocalData.getvalue("recrId"),
                listId: editListId ? editListId : undefined,
                "clientId": userLocalData.getvalue('clientId'),
            }
            trackPromise(
                ApiService.postWithData("admin", "saveList", payLoad).then((res: any) => {
                    if (res?.data?.Success) {
                        showToaster('Contact List has been added successfully.', 'success');
                        handleCloseAddList();
                        listData();
                    } else {
                        showToaster((res.data.Message) ? res.data.Message : "An error occured while getting Contact List.", 'error')
                    }
                })
            )
        } else {
            showToaster("Please fill all the fields", "error");
        }
    }

    const handleCloseAddList = () => {
        setOpenAddList(false);
        setEditListId(null);
        setListName({ value: "", error: false });
        setListDescription({ value: "", error: false });
    }



    return (
        <>
            <div className="mx-8 pt-2" id="contactList">
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    className="customCard px-4 py-2"
                    sx={{ minHeight: "auto !important" }}
                >
                    <Typography variant="h6" className="header, pt-1">
                        {" "}
                        Contact Lists
                    </Typography>

                    <Button variant="contained" color="primary" onClick={() => setOpenAddList(true)}>Add List</Button>

                </Grid>
                <Stack alignItems={"end"} justifyContent={"center"} bgcolor={'white'} p={1.75}>
                    <TextField
                        fullWidth={false}
                        placeholder='Search contact list here...'
                        size='small'
                        InputProps={{
                            startAdornment: <SearchOutlined fontSize='small' sx={{ mr: 0.75 }} color="inherit" />,
                            endAdornment: <IconButton size='small'
                                sx={{ ml: 0.75 }}
                                disabled={["", null, undefined].includes(searchValue)}
                                onClick={() => setSearchValue("")}
                            ><CloseRounded fontSize='small' /></IconButton>
                        }}
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                </Stack>
                <Grid container spacing={0} className="customCard p-0 ">
                    <Grid sx={{ width: "calc(100%)" }}>
                        <div className="MRTableCustom pl-0">
                            <MaterialReactTable
                                columns={columns}
                                data={filteredData}
                                enableTopToolbar={false}
                                initialState={{
                                    columnPinning: { left: ["mrt-row-select", 'listName'] },
                                    density: "compact",
                                    showGlobalFilter: false
                                }}
                                enableDensityToggle={false}
                                enableFullScreenToggle={false}
                                enableGlobalFilterModes
                                columnResizeMode="onChange"
                                enablePagination={false}
                                state={{
                                    pagination,
                                    globalFilter,
                                }}
                                muiPaginationProps={{
                                    rowsPerPageOptions: [10],
                                    showFirstButton: false,
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
                            />
                        </div>
                    </Grid>
                </Grid>
                <TotalListDialog />

                {openAddList && <Dialog open={true} maxWidth={"sm"} fullWidth onClose={handleCloseAddList}>
                    <DialogTitle>
                        <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                            <Typography variant="h6">{`${editListId ? "Update" : "Add"} Contact List`}</Typography>
                            <Stack direction={"row"} alignItems={"center"} spacing={2}>
                                <Button variant="outlined"
                                    type='button'
                                    color="secondary"
                                    onClick={handleCloseAddList}  >Cancel</Button>
                                <Button variant="contained" color="primary" onClick={handleListSave}>Save</Button>
                            </Stack>
                        </Stack>
                    </DialogTitle>
                    <Divider />
                    <DialogContent>
                        <Stack py={1} spacing={3}>
                            <TextField
                                fullWidth
                                label={<span>List Name<span style={{ color: "red" }}>*</span></span>}
                                placeholder="Enter contact list"
                                size="small"
                                name="List Name"
                                id="List Name"
                                value={listName.value}
                                error={listName.error}
                                onChange={handleFieldsChange}
                            />
                            <TextField
                                size="small"
                                multiline
                                label={<span>List Description </span>}
                                placeholder="Enter description"
                                rows={3}
                                name="List Description"
                                id="List Description"
                                value={listDescription.value}
                                error={listDescription.error}
                                onChange={handleFieldsChange}
                            />
                        </Stack>
                    </DialogContent>
                </Dialog>}


            </div>
        </>
    );
};

export default ListPage;
