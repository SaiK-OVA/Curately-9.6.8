
import { Button, IconButton } from "../../../../shared/modules/MaterialImports/Button";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import FormControl from "@mui/material/FormControl";
import { Grid } from "../../../../shared/modules/MaterialImports/Grid";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import Select from "@mui/material/Select";
// import TextField from "@mui/material/TextField";
import { Typography } from "../../../../shared/modules/MaterialImports/Typography";
import { Stack } from "../../../../shared/modules/MaterialImports/Stack";
// import Box from "@mui/material/Box";
// import React, {useState} from 'react';
// import { useFormik } from "formik";
// import * as Yup from "yup";
import "./FindCompany.scss";
import { useMemo, useState, useEffect } from "../../../../shared/modules/React";
// import { Divider } from "@mui/material";
import { MaterialReactTable, type MRT_ColumnDef } from "../../../../shared/modules/MaterialReactTable";
import { DateTime } from "../../../../shared/modules/Luxon";
import updateDocumentTitle from "../../../../shared/services/title";
import CompanyFilters from "./CompanyFilters";
// import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
// import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Menu, MenuItem } from "../../../../shared/modules/MaterialImports/Menu";
import { Checkbox } from "../../../../shared/modules/MaterialImports/FormElements";
import { Box } from "../../../../shared/modules/MaterialImports/Box";

import ApiRequests from "../../../../shared/api/api";
import { showToaster } from "../../../shared/SnackBar/SnackBar";
import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';
import AddCompany from "../Add/AddCompany";
import { globalData } from "../../../../shared/services/globalData";
import { trackPromise } from '../../../../shared/modules/PromiseTrackter';
// import { CommonImages } from "../../../../shared/images/CommonImages";
import TuneIcon from '@mui/icons-material/Tune';
import { Tooltip } from "../../../../shared/modules/MaterialImports/ToolTip";

const FindCompany = () => {

  // const [isSearch, setIsSearch] = useState(true);

  // const initialValues = {
  //   companyName: "",
  //   firstName: "",
  //   lastName: "",
  //   companyId: "",
  //   reference: "",
  //   //phoneNo: "",
  //   noOfRecords: "20",
  // };

  // const onSubmit = (values: any) => {
  //   console.log("Form Data", values);
  //   if ((values.companyName === "") && (values.firstName === "") && (values.lastName === "") && (values.companyId === "") && (values.reference === "")) {
  //     showToaster(" You must enter some criteria to search", 'error');
  //   } else {
  //     setIsSearch(false);
  //     let tempData = {
  //       "companyName": (values.companyName) ? values.companyName : "",
  //       "firstName": (values.firstName) ? values.firstName : "",
  //       "lastName": (values.lastName) ? values.lastName : "",
  //       "companyId": (values.companyId) ? values.companyId : "",
  //       "reference": (values.reference) ? values.reference : "",
  //       "noOfRecords": (values.noOfRecords) ? values.noOfRecords : ""
  //     };
  //     // [1, 2, 3]

  //     ApiRequests.getByParams(193, 'Company/company_list.jsp', tempData).then(
  //       (result) => {
  //         console.log(result);
  //         setListCompany(result.data);
  //       },
  //     )
  //   }
  // }

  const handleSearch = (data: any) => {
    if ((data.companyName === "") && (data.firstName === "") && (data.lastName === "") && (data.companyId === "") && (data.reference === "")) {
      showToaster(" You must enter some criteria to search", 'error');
    } else {
      // setIsSearch(false);
      let tempData = {
        "companyName": (data.companyName) ? data.companyName : "",
        "firstName": (data.firstName) ? data.firstName : "",
        "lastName": (data.lastName) ? data.lastName : "",
        "companyId": (data.companyId) ? data.companyId : "",
        "reference": (data.reference) ? data.reference : "",
        "noOfRecords": (data.noOfRecords) ? data.noOfRecords : ""
      };
      trackPromise(

        ApiRequests.getByParams(193, 'Company/company_list.jsp', tempData).then(
          (result) => {
            // console.log(result);
            setListCompany(result.data);
          },
        ))
    }
  }

  // const validationSchema = Yup.object({
  //   companyName: Yup.string(),
  //   firstName: Yup.string(),
  //   lastName: Yup.string(),
  //   companyId: Yup.string(),
  //   reference: Yup.string(),
  //   // phoneNo: Yup.string().required("Required"),
  //   noOfRecords: Yup.string().required("Required"),
  // });

  // const newSearch = () => {
  //   formik.resetForm();
  //   setIsSearch(true);
  // }

  const [rowSelection, setRowSelection] = useState({});
  const [openAddCompanyModal, setOpenAddCompanyModal] = useState(false);


  const [listCompany, setListCompany] = useState<any[] | never[]>([]);
  // const formik = useFormik({
  //   initialValues,
  //   onSubmit,
  //   validationSchema,
  // });

  const openCompanyView = (id: string) => {
    window.open(globalData.getWindowLocation() + "company/view/" + id);
  }

  const [filtersExpand, setFiltersExpand] = useState(false);
  const toggleFilers = () => {
    setFiltersExpand(!filtersExpand);
  }


  useEffect(() => {
    updateDocumentTitle.set('Find Company');
  }, []);

  // companyName
  // reference
  // companyId
  // lastModified
  // phone
  // city
  // state

  const columns: MRT_ColumnDef<any>[] = useMemo(
    () => [
      {
        accessorKey: "companyName", //simple recommended way to define a column
        header: "Name",
        enableColumnPinning: true,
        accessorFn: (row) => `${row.firstName} ${row.lastName}`,
        Cell: ({ renderedCellValue, row }) => (
          (<span className="hightLightTd" onClick={() => openCompanyView(row.original.companyId)}>{row.original.companyName}</span>)
          // <Button onClick={() => openCandidateView(row.original.candId)}>{renderedCellValue}</Button>
        ),
      },
      {
        accessorKey: "lastModified",
        header: " Last Modified",
        Cell: ({ renderedCellValue, row }) => (
          <span>
            {DateTime.fromFormat(row.original.lastModified.substring(0, 10), 'MM/dd/yyyy').toFormat('MM/dd/yyyy')}

          </span>
        ),
      },
      {
        accessorKey: "phone",
        header: "Phone",
      },
      {
        accessorKey: "city",
        header: "City",
      },
      {
        accessorKey: "state",
        header: "State",
      },
    ],

    []
  );

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
      const endIndex = Math.min((pagination.pageIndex + 1) * pagination.pageSize, listCompany.length);

      let checkedCheckboxesData: any = {};
      for (let index = startIndex; index < endIndex; index++) {
        checkedCheckboxesData[listCompany[index].companyId] = true;
      }
      console.log(checkedCheckboxesData);
      setRowSelection(checkedCheckboxesData);
      setIsSelectAllChecked(false);
    } else if (menuType === "all") {

      let rowData: any = {};
      let tempData: any = listCompany;
      for (let index = 0; index < listCompany.length; index++) {
        rowData[tempData[index].companyId] = true;
      }
      console.log(rowData);
      setRowSelection(rowData);
      setIsSelectAllChecked(true);
    } else if (menuType === "clear") {
      setIsSelectAllChecked(false);
      setRowSelection({});
    }
    setSelectAllElement(null);
  };

  return (
    <div className="findCompany pt-3">
      <Stack
        direction="row"
        className="customCard px-4 py-2"
        justifyContent="space-between"
        alignItems="center"
        sx={{ minHeight: 'auto !important' }}
      >
        <Typography variant="h6" className="header">
          Company
        </Typography>
        <Stack direction="row" className="btn-container">
          <Button
            variant="contained"
            size="small"
            // href="#/company/add"
            onClick={() => setOpenAddCompanyModal(true)}
            color="primary"
          >
            Add Company
          </Button>
        </Stack>
      </Stack>
      <Grid container className="customCard p-0 filterExpand-grid" gap={0}>
        <Grid sx={{ width: filtersExpand ? 0 : 310, overflow: 'hidden', opacity: filtersExpand ? 0 : 1 }}>
          <CompanyFilters onSearch={handleSearch} />
        </Grid>
        <Grid sx={{ width: filtersExpand ? 'calc(100%)' : 'calc(100% - 310px)' }}>

          <div className={`MRTableCustom ${filtersExpand ? 'pl-0' : ''}`}>
            <Tooltip title={filtersExpand ? "Show Filters" : "Hide Filters"}>
              <IconButton disableRipple className="filtersHideButton" color="primary" aria-label={filtersExpand ? "Expand" : "Collapse"} onClick={toggleFilers}>
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
                  <Box component="span">{listCompany.length}</Box>)
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
              data={listCompany}
              onRowSelectionChange={setRowSelection} //connect internal row selection state to your own
              state={{ rowSelection, pagination }} //pass our managed row selection state to the table to use
              enablePinning
              initialState={{ columnPinning: { left: ['mrt-row-select', 'companyName'] }, density: 'compact', showGlobalFilter: true }}
              enableDensityToggle={false}
              enableFullScreenToggle={false}
              // muiTableHeadCellProps={{
              //   sx: (theme) => ({
              //     background: 'var(--curatelyPurple)',
              //   }),
              // }}
              enableGlobalFilterModes
              columnResizeMode="onChange"
              onPaginationChange={setPagination}
              getRowId={(row) => row.companyId}
              icons={{
                ArrowDownwardIcon: (props: any) => <SwitchLeftIcon  {...props} />
              }}
            />
          </div>
        </Grid>
      </Grid>

      {
        (openAddCompanyModal) ?
          <AddCompany
            open={openAddCompanyModal}
            closePopup={() => setOpenAddCompanyModal(false)}
            add={true}
            companyData={{}}
          />
          :
          null
      }
      {/* <div className="mainhead text-center">Companies List</div>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >

              <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
              >

                <Button variant="contained"
                  className="mr-3 my-3"
                  onClick={newSearch}
                  type="reset">New Search</Button>

                <Button variant="contained"
                  className="my-3"
                  onClick={() => setIsSearch(true)}

                >Modify Search</Button>
              </Grid>
            </Grid>
            </div> */}
    </div >
  );
};

export default FindCompany;
