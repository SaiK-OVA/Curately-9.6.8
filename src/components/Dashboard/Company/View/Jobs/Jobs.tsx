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


// import { useParams } from 'react-router-dom';
import { trackPromise } from '../../../../../shared/modules/PromiseTrackter';

import { Box } from "../../../../../shared/modules/MaterialImports/Box";
import { Button, IconButton } from "../../../../../shared/modules/MaterialImports/Button";
import { Checkbox } from "../../../../../shared/modules/MaterialImports/FormElements";
import { Menu, MenuItem } from "../../../../../shared/modules/MaterialImports/Menu";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';
// import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
// import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

import './Jobs.scss';
import ApiService from "../../../../../shared/api/api";
// import ListJob from "../../../Job/List/ListJob";
import { Grid } from "../../../../../shared/modules/MaterialImports/Grid";
import JobFilters from "../../../Job/Filters/Filters";
import { globalData } from "../../../../../shared/services/globalData";
// import { CommonImages } from "../../../../../shared/images/CommonImages";
import TuneIcon from '@mui/icons-material/Tune';
import { Tooltip } from '../../../../../shared/modules/MaterialImports/ToolTip';

const Jobs = () => {

    // const { id } = useParams();

    const [rowSelection, setRowSelection] = useState({});
    const [data, setData] = useState<any>([]);

    useEffect(() => {
        //do something when the row selection changes...
        console.info({ rowSelection });
    }, [rowSelection]);

    // useEffect(() => {

    // }, []);

    const loadJobsData = (data: any) => {
        trackPromise(
            ApiService.getByParams(193, 'Company/jobs_json_db.jsp', data).then(
                (response: any) => {
                    // console.log(response)
                    setData(response.data);
                    // debugger;
                }
            ))
    }




    // status
    // date
    // title
    // reqNo
    // jobType
    // billRate
    // hiringManager
    // mspOwner
    // loc
    // interSub
    // clientSub
    // fhm
    // interview
    // clientReject
    // offers

    // jobId
    // empId
    // compId
    // candId

    const openJobView = (id: string) => {
        window.open(globalData.getWindowLocation() + "job/view/" + id);
    }
    const openContactView = (id: string, compId: string) => {
        window.open(globalData.getWindowLocation() + "contact/view/" + id + "/" + compId);
    }


    const columns: MRT_ColumnDef<(typeof data)[0]>[] = useMemo(
        () => [
            {
                accessorKey: 'status',
                header: 'Status',
                size: 105
            },
            {
                accessorKey: 'jobType',
                header: '',
                size: 52.8,
            },
            {
                accessorKey: 'date',
                header: 'Created',
                size: 111.8,
            },
            {
                accessorKey: 'title',
                header: 'Job Title',
                size: 331.8,
                Cell: ({ renderedCellValue, row }) => (
                    // <span className="hightLightTd">{row.original.title}</span>
                    (<span className="hightLightTd" onClick={() => openJobView(row.original.jobId)}>{row.original.title.toLowerCase()}</span>)
                ),
            },
            {
                accessorKey: 'reqNo',
                header: 'Req ID',
                size: 104.8,
            },
            {
                accessorKey: 'hiringManager',
                header: 'HM Manager',
                size: 141.8,
                Cell: ({ renderedCellValue, row }) => (
                    <span>
                        {
                            (row.original.empId && row.original.compId) ?
                                <span className="hightLightTd" onClick={() => openContactView(row.original.empId, row.original.compId)}>{row.original.hiringManager}</span>
                                :
                                <span>{row.original.hiringManager}</span>
                        }
                    </span>

                ),
            },
            {
                accessorKey: 'mspOwner',
                header: 'MSP',
                size: 89.8,
            },
            {
                accessorKey: 'loc',
                header: 'ST',
                size: 76.8,
            },
            {
                accessorKey: 'billRate',
                header: 'Rate',
                size: 113
            },
            {
                accessorKey: 'interSub',
                header: 'ISub',
                size: 70,
            },
            {
                accessorKey: 'clientSub',
                header: 'CSub',
                size: 76,
            },
            {
                accessorKey: 'fhm',
                header: 'FHM',
                size: 80,
            },
            {
                accessorKey: 'interview',
                header: 'INT',
                size: 63,
            },
            {
                accessorKey: 'clientReject',
                header: 'CR',
                size: 71,
            },
            {
                accessorKey: 'offers',
                header: 'Offers',
                size: 82,
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

            const startIndex = pagination.pageIndex * pagination.pageSize;
            const endIndex = Math.min((pagination.pageIndex + 1) * pagination.pageSize, data.length);

            let checkedCheckboxesData: any = {};
            for (let index = startIndex; index < endIndex; index++) {
                checkedCheckboxesData[data[index].jobId] = true;
            }
            // console.log(checkedCheckboxesData);
            setRowSelection(checkedCheckboxesData);
            setIsSelectAllChecked(false);
        } else if (menuType === "all") {

            let rowData: any = {};
            let tempData: any = data;
            for (let index = 0; index < data.length; index++) {
                rowData[tempData[index].jobId] = true;
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

    const [filtersExpand, setFiltersExpand] = useState(false);
    const toggleFilers = () => {
        setFiltersExpand(!filtersExpand);
    }



    return (
        <Grid
            container
            className="jobsList filterExpand-grid"
            direction="row"
            justifyContent='center'
        >
            <Grid sx={{ width: filtersExpand ? 0 : 310, overflow: 'hidden', opacity: filtersExpand ? 0 : 1 }}>
                <JobFilters onSearch={loadJobsData} />
            </Grid>
            <Grid sx={{ width: filtersExpand ? 'calc(100%)' : 'calc(100% - 310px)' }}>
                <div className={`MRTableCustom ${filtersExpand ? 'pl-0' : ''}`}>
                    <Tooltip title={filtersExpand ? "Show Filters" : "Hide Filters"}>
                        <IconButton disableRipple className="filtersHideButton" color={filtersExpand ? "primary" : "primary"} aria-label={filtersExpand ? "Expand" : "Collapse"} onClick={toggleFilers}>
                            {/* {<img src={CommonImages.GetFilterIcon()} className="filterIcon" />} */}
                            <TuneIcon className="c-grey" />
                            {/* {
                            filtersExpand ?
                                <KeyboardDoubleArrowRightIcon />
                                :
                                <KeyboardDoubleArrowLeftIcon />
                        } */}
                        </IconButton>
                    </Tooltip>
                    <Grid className="actionItems filterActionItems">
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
                    </Grid>
                    <MaterialReactTable
                        columns={columns}
                        enableRowSelection
                        data={data}
                        onRowSelectionChange={setRowSelection} //connect internal row selection state to your own
                        enablePinning
                        enableStickyHeader
                        initialState={{
                            columnPinning: { left: ['mrt-row-select', 'name'] },
                            density: 'compact',
                            showGlobalFilter: true,
                            columnOrder: [
                                'mrt-row-select', // move the built-in selection column 
                                'status',
                                'jobType',
                                'date',
                                'title',
                                'reqNo',
                                'hiringManager',
                                'mspOwner',
                                'loc',
                                'billRate',
                                'interSub',
                                'clientSub',
                                'fhm',
                                'interview',
                                'clientReject',
                                'offers',
                            ]
                        }}
                        enableColumnResizing
                        enableGlobalFilterModes
                        state={{ rowSelection, pagination }} //pass our managed row selection state to the table to use
                        columnResizeMode="onChange"
                        onPaginationChange={setPagination} //hoist pagination state to your state when it changes internally
                        getRowId={(row) => row.jobId}
                        icons={{
                            ArrowDownwardIcon: (props: any) => <SwitchLeftIcon  {...props} />
                        }}
                    // paginateExpandedRows={true}
                    // enableRowVirtualization
                    // onColumnSizingChange={(e) => columnChanged(e)}
                    // onColumnSizingInfoChange={(e) => columnInfo(e)}
                    />
                </div>
            </Grid>
        </Grid >
    )
}

export default Jobs;