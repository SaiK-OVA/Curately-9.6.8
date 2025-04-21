import { MaterialReactTable, type MRT_ColumnDef } from "../../../../../shared/modules/MaterialReactTable";
import { useEffect, useMemo, useState } from "../../../../../shared/modules/React";
// import { Box } from '@mui/material';
// import CampaignIcon from '@mui/icons-material/Campaign';
// import LinkedInIcon from '@mui/icons-material/LinkedIn';
// import AttachFileIcon from '@mui/icons-material/AttachFile';
// import TwitterIcon from '@mui/icons-material/Twitter';
// import FacebookIcon from '@mui/icons-material/Facebook';
// import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
// import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
// import GridViewIcon from '@mui/icons-material/GridView';
// import Button from '@mui/material/Button';
// import { styled } from '@mui/material/styles';
// import Paper from '@mui/material/Paper';
// import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import { trackPromise } from '../../../../../shared/modules/PromiseTrackter';
import { useParams } from 'react-router-dom';

import { Box } from "../../../../../shared/modules/MaterialImports/Box";
import { Button } from "../../../../../shared/modules/MaterialImports/Button";
import { Checkbox } from "../../../../../shared/modules/MaterialImports/FormElements";
import { Menu, MenuItem } from "../../../../../shared/modules/MaterialImports/Menu";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

// import Typography from "@mui/material/Typography";

import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';

import './Contacts.scss';
import ApiService from "../../../../../shared/api/api";
import { globalData } from "../../../../../shared/services/globalData";


const Contacts = () => {

    const { companyId } = useParams();

    const [rowSelection, setRowSelection] = useState({});
    const [data, setData] = useState<any>([]);

    useEffect(() => {
        //do something when the row selection changes...
        console.info({ rowSelection });
        setIsSelectAllChecked(data.length && (checkedCount === data.length));
    }, [rowSelection]);

    useEffect(() => {
        trackPromise(
            ApiService.getByParams(193, 'Company/contacts_json_db.jsp', { compId: companyId, contType: 2 }).then(
                (response: any) => {
                    setData(response.data);
                    // debugger;
                }
            ))
    }, []);

    // candid: "7664319"
    // contid: "1088592"
    // fname: "Aditya kumar"
    // lname: "Togaru"
    // title: "Deveeloper"
    // dept: "IT"
    // phone1: "(425) 383-7391"
    // phone2: "(206) 794-4232"
    // loc: "Bellevue , Washington"
    // notes: "07/04/2023"
    // supervisor: ""
    // dlist: " list2, Test Candidate"
    // nle: "0"
    // web: ""

    const openView = (id: string) => {
        window.open(globalData.getWindowLocation() + "contact/view/" + id + (companyId ? '/' + companyId : ''));
    }


    const columns: MRT_ColumnDef<(typeof data)[0]>[] = useMemo(
        () => [
            {

                accessorKey: 'name',
                header: 'Name',
                enableColumnPinning: true,
                Cell: ({ renderedCellValue, row }) => (
                    <span className="hightLightTd" onClick={() => openView(row.original.contId)}>{row.original.fName.toLowerCase() + " " + row.original.lName.toLowerCase()}</span>
                ),
            },
            {
                accessorKey: 'title',
                header: 'Title',
            },
            {
                accessorKey: 'dept',
                header: 'Department',
            },
            {
                accessorKey: 'phone1',
                header: 'Direct Phone',
            },
            {
                accessorKey: 'phone2',
                header: 'Mobile',
            },
            {
                accessorKey: 'loc',
                header: 'Location',
            },
            {
                accessorKey: 'notes',
                header: 'Last Activity',
            },
            {
                accessorKey: 'supervisor',
                header: 'Supervisor',
            },
            {
                accessorKey: 'dlist',
                header: 'Distribution List',
            }
        ],

        []
    );

    // const columnChanged = (e: any) => {
    //     console.log(e());
    // }
    // const columnInfo = (e: any) => {
    //     console.log(e());
    // }


    const [selectAllElement, setSelectAllElement] = useState<null | HTMLElement>(
        null
    );
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10, //customize the default page size
    });

    const openSelectAllMenu = Boolean(selectAllElement);

    const openSelectAll = (event: React.MouseEvent<HTMLButtonElement>) => {
        setSelectAllElement(event.currentTarget);
    };
    const checkedCount = Object.keys(rowSelection).length;

    const [isSelectAllChecked, setIsSelectAllChecked] = useState(false);

    const someAreChecked = (!isSelectAllChecked && checkedCount) ? true : false;

    const selectAllMenuItemClicked = (menuType: any) => {
        if (menuType === "page") {

            // const startIndex = pagination.pageIndex * pagination.pageSize;
            // const endIndex = Math.min((pagination.pageIndex + 1) * pagination.pageSize, data.length);

            let checkedCheckboxesData: any = {};
            for (let index = 0; index < data.length; index++) {
                checkedCheckboxesData[data[index].contId] = true;
            }
            // console.log(checkedCheckboxesData);
            setRowSelection(checkedCheckboxesData);
            setIsSelectAllChecked(false);
        } else if (menuType === "advance") {
        } else if (menuType === "all") {

            let rowData: any = {};
            let tempData: any = data;
            for (let index = 0; index < data.length; index++) {
                rowData[tempData[index].contId] = true;
            }
            // console.log(rowData);
            setRowSelection(rowData);
            setIsSelectAllChecked(true);
        } else if (menuType === "clear") {
            setIsSelectAllChecked(false);
            setRowSelection({});
        }
        setSelectAllElement(null);
    };

    return (
        <div className="contactsList MRTableCustom pl-0">
            <div className="actionItems">
                <Button
                    disableRipple
                    id="select-all-button"
                    className="select-all-button"
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
                    <span className={`selectedCountText ${checkedCount === 0 ? "d-none" : "d-block"}`}>
                        {checkedCount} Selected
                    </span>

                    <ArrowDropDownIcon
                        className="arrowDownIcon"
                    />
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
                        onClick={() => selectAllMenuItemClicked("page")}
                        className="menuItem"
                    >
                        Select this page
                    </MenuItem>
                    <MenuItem
                        disableRipple
                        onClick={() => selectAllMenuItemClicked("all")}
                    >
                        Select all people (
                        <Box component="span">{data.length}</Box>)
                    </MenuItem>
                    <MenuItem
                        disableRipple
                        onClick={() => selectAllMenuItemClicked("clear")}
                    >
                        Clear Selection
                    </MenuItem>
                </Menu>
            </div>

            <MaterialReactTable
                columns={columns}
                enableRowSelection
                data={data}
                onRowSelectionChange={setRowSelection}

                //     (e) => {
                //         // console.log(e);
                //         setRowSelection(e);
                //     }
                // } //connect internal row selection state to your own
                enablePinning
                enableStickyHeader
                initialState={{
                    columnPinning: { left: ['mrt-row-select', 'name'] },
                    density: 'compact',
                    showGlobalFilter: true,
                    columnOrder: [
                        'mrt-row-select', // move the built-in selection column 
                        'name',
                        'title',
                        'dept',
                        'phone1',
                        'phone2',
                        'loc',
                        'notes',
                        'supervisor',
                        'dlist'
                    ]
                }}
                enableColumnResizing
                enableGlobalFilterModes
                columnResizeMode="onChange"
                state={{ rowSelection, pagination }} //pass our managed row selection state to the table to use
                onPaginationChange={setPagination} //hoist pagination state to your state when it changes internally
                getRowId={(row) => row.contId}
                icons={{
                    ArrowDownwardIcon: (props: any) => <SwitchLeftIcon  {...props} />
                }}
            // enableSelectAll={false}

            // paginateExpandedRows={true}
            // enableRowVirtualization
            // onColumnSizingChange={(e) => columnChanged(e)}
            // onColumnSizingInfoChange={(e) => columnInfo(e)}
            />
        </div>
    )
}

export default Contacts;