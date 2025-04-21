
import { Button, IconButton } from "../../../../shared/modules/MaterialImports/Button";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
import { Grid } from "../../../../shared/modules/MaterialImports/Grid";
import { Typography } from "../../../../shared/modules/MaterialImports/Typography";
import { Stack } from "../../../../shared/modules/MaterialImports/Stack";
// import React, {useState} from 'react';

import { MaterialReactTable, type MRT_ColumnDef } from "../../../../shared/modules/MaterialReactTable";
// import { useFormik } from "formik";
// import * as Yup from "yup";
import "./FindCandidates.scss";
import { trackPromise } from '../../../../shared/modules/PromiseTrackter';


import { DateTime } from '../../../../shared/modules/Luxon';

import ApiRequests from "../../../../shared/api/api";
import { useState, useMemo, useEffect } from "../../../../shared/modules/React";
import { showToaster } from "../../../shared/SnackBar/SnackBar";
import updateDocumentTitle from "../../../../shared/services/title";
import CandidateFilters from "./CandidateFilters";


import { Box } from "../../../../shared/modules/MaterialImports/Box";
// import Button from "@mui/material/Button";
import { Checkbox } from "../../../../shared/modules/MaterialImports/FormElements";
import { Menu, MenuItem } from "../../../../shared/modules/MaterialImports/Menu";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';
// import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
// import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import TuneIcon from '@mui/icons-material/Tune';
import AddCandidate from "../AddCandidate/AddCandidate";
import { globalData } from "../../../../shared/services/globalData";
import { Tooltip } from "../../../../shared/modules/MaterialImports/ToolTip";
// import { CommonImages } from "../../../../shared/images/CommonImages";

const FindCandidate = () => {
  // const [isSearch, setIsSearch] = useState(true);
  const [rowSelection, setRowSelection] = useState({});
  const [openAddCandidateModal, setOpenAddCandidateModal] = useState(false);

  // const initialValues = {
  //   firstName: "",
  //   lastName: "",
  //   candidateId: "",
  //   email: "",
  //   phoneNo: "",
  //   noOfRecords: "20",
  // };


  // const onSubmit = (values: any, { resetForm }: any) => {
  //   console.log("Form Data", values);
  //   if (values.firstName === "" && values.lastName === "" && values.email === "" && values.phoneNo === "" && values.candidateId === "") {
  //     showToaster('Please enter some Search Criteria', 'error');
  //   } else {
  //     setIsSearch(false);
  //     let tempData = {
  //       "candidateId": (values.candidateId) ? values.candidateId : "",
  //       "email": (values.email) ? values.email : "",
  //       "lastName": (values.lastName) ? values.lastName : "",
  //       "firstName": (values.firstName) ? values.firstName : "",
  //       "noOfRecords": (values.noOfRecords) ? values.noOfRecords : "",
  //       "phoneNo": (values.phoneNo) ? values.phoneNo : ""
  //     };
  //     // [1, 2, 3]

  //     ApiRequests.getByParams(171, 'findCandidate.jsp', tempData).then(
  //       (result) => {
  //         console.log(result);
  //         setListCandidate(result.data);
  //       },
  //     )
  //   }
  // };




  // const validationSchema = Yup.object({
  //   firstName: Yup.string(),
  //   lastName: Yup.string(),
  //   candidateId: Yup.string(),
  //   email: Yup.string().email("Invalid email format"),
  //   phoneNo: Yup.string(),
  //   noOfRecords: Yup.string(),
  // });

  const [listCandidate, setListCandidate] = useState<any[] | never[]>([]);
  // const formik = useFormik({
  //   initialValues,
  //   onSubmit,
  //   validationSchema,
  // });

  // candId: "9485541"
  // companyName: ""
  // firstName: "ADITYA"
  // homePhone: "12345874"
  // lastName: "MATHI"
  // modifiedDate: "06/27/2023 04:43:13 PM"

  const columns: MRT_ColumnDef<any>[] = useMemo(
    () => [
      {
        accessorKey: "name", //simple recommended way to define a column
        header: "Name",
        accessorFn: (row) => `${row.firstName} ${row.lastName}`,
        Cell: ({ renderedCellValue, row }) => (
          (<span className="hightLightTd" onClick={() => openCandidateView(row.original.candId)}>{row.original.firstName.toLowerCase() + " " + row.original.lastName.toLowerCase()}</span>)
          // <Button onClick={() => openCandidateView(row.original.candId)}>{renderedCellValue}</Button>
        ),
      },
      {
        accessorKey: "homePhone",
        header: "Home Phone",
      },
      {
        accessorKey: "companyName",
        header: "Company ",
      },
      {
        accessorKey: "modifiedDate",
        header: " Modified",
        Cell: ({ renderedCellValue, row }) => (
          <span>
            {/* {params.row.CreatedDate.substring(0, 10)} */}
            {DateTime.fromFormat(row.original.modifiedDate.substring(0, 10), 'MM/dd/yyyy').toFormat('MM/dd/yyyy')}

          </span>
        ),
      },
    ],

    []
  );



  // const newSearch = () => {
  //   formik.resetForm();
  //   setIsSearch(true);
  // }

  const openCandidateView = (id: string) => {
    window.open(globalData.getWindowLocation() + "#/candidate/view/" + id);
  }

  const handleSearch = (data: any) => {
    if (data.firstName === "" && data.lastName === "" && data.email === "" && data.phoneNo === "" && data.candidateId === "") {
      showToaster('Please enter some Search Criteria', 'error');
    } else {
      // setIsSearch(false);
      let tempData = {
        "candidateId": (data.candidateId) ? data.candidateId : "",
        "email": (data.email) ? data.email : "",
        "lastName": (data.lastName) ? data.lastName : "",
        "firstName": (data.firstName) ? data.firstName : "",
        "noOfRecords": (data.noOfRecords) ? data.noOfRecords : "",
        "phoneNo": (data.phoneNumber) ? data.phoneNumber : ""
      };

      trackPromise(
        ApiRequests.getByParams(171, 'findCandidate.jsp', tempData).then(
          (result) => {
            // console.log(result);
            setListCandidate(result.data);
          },
        ))
    }
  }

  useEffect(() => {
    updateDocumentTitle.set('Find Candidates');
  }, []);



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
      const endIndex = Math.min((pagination.pageIndex + 1) * pagination.pageSize, listCandidate.length);

      let checkedCheckboxesData: any = {};
      for (let index = startIndex; index < endIndex; index++) {
        checkedCheckboxesData[listCandidate[index].candId] = true;
      }
      // console.log(checkedCheckboxesData);
      setRowSelection(checkedCheckboxesData);
      setIsSelectAllChecked(false);
    } else if (menuType === "all") {

      let rowData: any = {};
      let tempData: any = listCandidate;
      for (let index = 0; index < listCandidate.length; index++) {
        rowData[tempData[index].candId] = true;
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
    <div className="findCandidate pt-3">
      <Stack
        direction="row"
        className="customCard px-4 py-2"
        justifyContent="space-between"
        alignItems="center"
        sx={{ minHeight: 'auto !important' }}
      >
        <Typography variant="h6" className="header">
          Candidates
        </Typography>
        <Stack direction="row" className="btn-container">
          <Button variant="contained" color="primary" size="small" onClick={() => setOpenAddCandidateModal(true)}>Add Candidate</Button>
          {/*  href="#/candidate/add" */}
        </Stack>
      </Stack>
      <Grid container className="customCard p-0 filterExpand-grid" >

        <Grid sx={{ width: filtersExpand ? 0 : 310, overflow: 'hidden', opacity: filtersExpand ? 0 : 1 }}>
          <CandidateFilters onSearch={handleSearch} />
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
                  <Box component="span">{listCandidate.length}</Box>)
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
              enableStickyHeader
              columns={columns}
              enableRowSelection
              data={listCandidate}
              onRowSelectionChange={setRowSelection} //connect internal row selection state to your own
              state={{ rowSelection, pagination }} //pass our managed row selection state to the table to use
              enablePinning
              initialState={{ columnPinning: { left: ['mrt-row-select'] }, density: 'compact', showGlobalFilter: true }}
              // enableColumnResizing
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
              getRowId={(row) => row.candId}
              icons={{
                ArrowDownwardIcon: (props: any) => <SwitchLeftIcon  {...props} />
              }}
            />
          </div>
        </Grid>
      </Grid>


      {/* <div>
           <div className="mainhead text-center">Candidates List</div>
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

      {
        (openAddCandidateModal) ?
          <AddCandidate
            open={openAddCandidateModal}
            closePopup={() => setOpenAddCandidateModal(false)}
          />
          :
          null
      }
    </div >
  );
};

export default FindCandidate;

