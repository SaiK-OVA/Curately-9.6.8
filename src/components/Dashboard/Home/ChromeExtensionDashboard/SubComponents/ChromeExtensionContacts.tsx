import { React, useState, useMemo, useEffect } from "../../../../../shared/modules/React";
// import Box from '@mui/material/Box';
import { MaterialReactTable, type MRT_ColumnDef } from "../../../../../shared/modules/MaterialReactTable";
import ApiService from "../../../../../shared/api/api";
import { DateTime } from '../../../../../shared/modules/Luxon';
// import CircularProgress from '@mui/material/CircularProgress';
import { userLocalData } from "../../../../../shared/services/userData";
// import { debounce } from "lodash";
// import { showToaster } from '../../../../shared/SnackBar/SnackBar';
import TuneIcon from '@mui/icons-material/Tune';
import { Grid } from '../../../../../shared/modules/MaterialImports/Grid';
// import { Button } from "../../../../../shared/modules/MaterialImports/Button";
import { List, ListItemButton, ListItemText } from "../../../../../shared/modules/MaterialImports/List";
import { Popover } from "../../../../../shared/modules/MaterialImports/Popover";
import { CircularProgress } from "../../../../../shared/modules/MaterialImports/CircularProgress";



// import { Link } from 'react-router-dom';

// import {
//   Chart as ChartJS, ArcElement, Tooltip as ChartTooltip, Legend, CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title
// } from 'chart.js';
// import { Doughnut, Line } from 'react-chartjs-2';
// //import ApplicantsListView from "../../Job/Find/ApplicantsListView/ApplicantsListView";
// import { ContinuousLoader } from "../../../../shared/ContinuousLoader/ContinuousLoader";

import './ChromeExtensionContacts.scss'


const ChromeExtensioncontacts: React.FC = () => {
  const [campaigndata, setCampaignData] = useState<any[]>([]);
  const [campaignPerformanceloading, setCampaignPerformanceloading] = useState(false);

  const [popoverContext, setPopoverContext] = useState<'linkedin' | 'campaign' | 'sentemail' | 'candidate' | 'received' | null>(null);


  const defaultOptions = {
    linkedin: "Last 6 months",
    campaign: "Last 6 months",
    sentemail: "Last 6 months",
    candidate: "Last 6 months",
    received: "Last 6 months",
  };

  const [selectOptions, setSelectOptions] = useState(defaultOptions.linkedin);
  const [selectedOptions, setSelectedOptions] = useState(defaultOptions.campaign);
  const [selectedEmailOptions, setSelectedEmailOptions] = useState(defaultOptions.sentemail);
  const [selectedCandidateOptions, setSelectedCandidateOptions] = useState(defaultOptions.candidate);
  const [selectedReceivedOptions, setSelectedReceivedOptions] = useState(defaultOptions.received);
  // const [fromDate, setFromDate] = useState<string>('');
  // const [toDate, setToDate] = useState<string>(DateTime.now().toISODate() ?? '');

  const [emailStats, setEmailStats] = useState({
    sentEmailCount: 0,
    sentEmailCountPrev: 0,
    openedEmailCount: 0,
    openedEmailCountPrev: 0,
    repliedEmailCount: 0,
    repliedEmailCountPrev: 0,
  });

  const [anchorEl, setAnchorEl] = useState<null | SVGSVGElement>(null);
  const [anchorE2, setAnchorE2] = useState<null | SVGSVGElement>(null);
  const [filterDurationType, setFilterDurationType] = useState("MONTH");
  const [selectedOption, setSelectedOption] = useState("Last 4 weeks");

  // const handleClick = (event: React.MouseEvent<SVGSVGElement>) => {
  //   setAnchorE2(event.currentTarget);
  // };
  const handleClickEmail = (event: React.MouseEvent<SVGSVGElement>) => {
    console.log(event.currentTarget);
    //  setFilterDurationType(event.currentTarget);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setAnchorE2(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'filter-popover' : undefined;
  const opened = Boolean(anchorE2);
  const ids = opened ? 'filter-popover' : undefined;

  const durationMapping = [
    { label: "Today", value: "DAY" },
    { label: "Last week", value: "WEEK" },
    { label: "Last 4 weeks", value: "MONTH" },
    { label: "Last 3 months", value: "QUARTER" },
  ];

  const [emailStatsLoaded, setEmailStatsLoaded] =  useState(false);

  const fetchEmailStats = (filterType: any) => {
    const saveData = {
      clientId: userLocalData.getvalue('clientId'), //userLocalData.getvalue('clientId'), /// 7
      recrId: userLocalData.getvalue('recrId'),
      filterDurationType: filterType,
    };

    ApiService.postWithData("admin", 'getEmailStats', saveData)
      .then((response: any) => {
        if (response.data.Success) {
          setEmailStats({
            sentEmailCount: response.data.sentEmailCount,
            sentEmailCountPrev: response.data.sentEmailCountPrev,
            openedEmailCount: response.data.openedEmailCount,
            openedEmailCountPrev: response.data.openedEmailCountPrev,
            repliedEmailCount: response.data.repliedEmailCount,
            repliedEmailCountPrev: response.data.repliedEmailCountPrev,
          });
          setEmailStatsLoaded(true);
          // showToaster(response.data.Message, 'success');
        } else {
          //   showToaster("Failed to retrieve email stats", 'error');
          console.log("Failed to retrieve email stats");
        }
      })
      .catch((error: any) => {
        console.error("Error fetching email stats:", error);
        // showToaster("An error occurred while fetching email stats", 'error');
      });
  };


  const handleOpenPopover = (context: 'linkedin' | 'campaign' | 'sentemail' | 'candidate' | 'received', event: React.MouseEvent<SVGSVGElement>) => {
    setPopoverContext(context);
    setAnchorE2(event.currentTarget);
  };

  useEffect(() => {
    fetchDefaultData();
  }, []);

  const fetchDefaultData = () => {
    const fromDate = DateTime.now().minus({ months: 6 }).toISODate() ?? '';
    const toDate = DateTime.now().toISODate() ?? '';

    // fetchLinkedinConnectReport(fromDate, toDate);
    fetchEmailStats(filterDurationType);
    if (userLocalData.getvalue('paymentType') !== 1) {
      fetchEmailSentByTeamMember(fromDate, toDate);
      fetchCampaignPerformance(fromDate, toDate);
      fetchCandidatesSavedByTeamMember(fromDate, toDate);
      fetchEmailReceivedByTeamMember(fromDate, toDate);
    }
  };

  const fetchCampaignPerformance = (fromDate?: string, toDate?: string) => {
    setCampaignPerformanceloading(true);
    const requestData = {
      clientId: userLocalData.getvalue('clientId'), //userLocalData.getvalue('clientId'), //7, //
      recrId: userLocalData.getvalue('recrId'),
      fromDate: fromDate,
      toDate: toDate,
    };

    ApiService.postWithData('admin', 'getCampaignPerformance', requestData)
      .then((response: any) => {
        if (response.data && response.data.Success) {
          setCampaignData(response.data.data);
          // showToaster(response.data.Message, 'success');
        } else {
          console.log("Error fetching campaign performance data:");
          // showToaster("Failed to fetch campaign performance data", 'error');
        }
      })
      .catch(error => {
        console.error("Error fetching campaign performance data:", error);
        //  showToaster("Error fetching campaign performance data", 'error');
      })
      .finally(() => {
        setCampaignPerformanceloading(false);
      });
  };

  const handleOptionsClick = (option: string) => {
    if (option === 'Custom Date') {

    } else {

      const calculatedFromDate =
        option === 'Last 7 days'
          ? DateTime.now().minus({ days: 7 }).toISODate()
          : option === 'Last 4 weeks'
            ? DateTime.now().minus({ weeks: 4 }).toISODate()
            : option === 'Last 6 months'
              ? DateTime.now().minus({ months: 6 }).toISODate()
              : option === 'Last 12 months'
                ? DateTime.now().minus({ months: 12 }).toISODate()
                : DateTime.now().toISODate();


      const fromDate = calculatedFromDate ?? '';
      const toDate = DateTime.now().toISODate() ?? '';

      // setFromDate(fromDate);
      // setToDate(toDate);

      handleClose();
      // if (popoverContext === 'linkedin') {
      //   setSelectOptions(option);
      //   fetchLinkedinConnectReport(fromDate, toDate);

      // } else 
      if (popoverContext === 'campaign') {
        setSelectedOptions(option);
        fetchCampaignPerformance(fromDate, toDate);
      } else if (popoverContext === 'sentemail') {
        setSelectedEmailOptions(option);
        fetchEmailSentByTeamMember(fromDate, toDate);
      } else if (popoverContext === 'candidate') {
        setSelectedCandidateOptions(option);
        fetchCandidatesSavedByTeamMember(fromDate, toDate);
      }
      else if (popoverContext === 'received') {
        setSelectedReceivedOptions(option);
        fetchEmailReceivedByTeamMember(fromDate, toDate);
      }

    }
  }

  const handleOptionClick = (option: any) => {
    setSelectedOption(option.label);
    setFilterDurationType(option.value);
    handleClose(); // close the popover after selection
    fetchEmailStats(option.value);
  };


  const [linkedinemaildata, setLinkedinemaildata] = useState<any[]>([]);
  const fetchEmailSentByTeamMember = (fromDate?: string, toDate?: string) => {
    const requestData = {
      clientId: userLocalData.getvalue('clientId'), // userLocalData.getvalue('clientId'), //7, //
      recrId: userLocalData.getvalue('recrId'),
      fromDate: fromDate,
      toDate: toDate,
    };

    ApiService.postWithData('admin', 'getEmailSentByTeamMember', requestData)
      .then((response: any) => {
        if (response.data && response.data.Success) {
          setLinkedinemaildata(response.data.data);
          // showToaster(response.data.Message, 'success');
        } else {
          //showToaster("Failed to fetch data", 'error');
          console.log("Failed to fetch data");
        }
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        //  showToaster("Error fetching data", 'error');
      })
      .finally(() => {
      });
  };


  const campaignColumns: MRT_ColumnDef<any>[] = useMemo(
    () => [
      {
        accessorKey: "sequenceName",
        header: "Campaign Name",
      },
      {
        accessorKey: "active",
        header: "Active",
        size: 80
      },
      {
        accessorKey: "finished",
        header: "Finished",
        size: 80
      },
      {
        accessorKey: "opened",
        header: "Opened",
        size: 80
      },
      {
        accessorKey: "clicked",
        header: "Clicked",
        size: 80
      },
      {
        accessorKey: "replied",
        header: "Replied",
        size: 80
      }
    ], []);

  const [linkedinrepliesdata, setLinkedinrepliesdata] = useState<any[]>([]);
  const fetchEmailReceivedByTeamMember = (fromDate?: string, toDate?: string) => {
    const requestData = {
      clientId: userLocalData.getvalue('clientId'), // userLocalData.getvalue('clientId'), //7, //
      recrId: userLocalData.getvalue('recrId'),
      fromDate: fromDate,
      toDate: toDate,
    };

    ApiService.postWithData('admin', 'getEmailReceivedByTeamMember', requestData)
      .then((response: any) => {
        if (response.data && response.data.Success) {
          setLinkedinrepliesdata(response.data.data);
          // showToaster(response.data.Message, 'success');
        } else {
          // showToaster("Failed to fetch data", 'error');
          console.log("Failed to fetch data");
        }
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        // showToaster("Error fetching data", 'error');
      })
      .finally(() => {
      });
  };

  // const [linkedindata, setLinkedindata] = useState<any[]>([]);
  // const [linkedindataFiltered, setLinkedindataFiltered] = useState<any[]>([]);
  // const fetchLinkedinConnectReport = (fromDate?: string, toDate?: string) => {
  //   const requestData = {
  //     clientId: userLocalData.getvalue('clientId'), //userLocalData.getvalue('clientId'), //7, //
  //     recrId: userLocalData.getvalue('recrId'),
  //     fromDate: fromDate,
  //     toDate: toDate,
  //     pageNum: 0,
  //     pageSize: 5

  //   };

  //   ApiService.postWithData('admin', 'getLinkedinConnectReport', requestData)
  //     .then((response: any) => {
  //       if (response.data && response.data.Success) {
  //         setLinkedindata(response.data.data);
  //         setLinkedindataFiltered(response.data.data);
  //         // showToaster(response.data.Message, 'success');
  //       } else {
  //         // showToaster("Failed to fetch data", 'error');
  //         console.log("Failed to fetch data");
  //       }
  //     })
  //     .catch(error => {
  //       console.error("Error fetching data:", error);
  //       // showToaster("Error fetching data", 'error');
  //     })
  //     .finally(() => {
  //     });
  // };


  const [linkedincandidatedata, setLinkedincandidatedata] = useState<any[]>([]);
  const fetchCandidatesSavedByTeamMember = (fromDate?: string, toDate?: string) => {
    const requestData = {
      clientId: userLocalData.getvalue('clientId'), //userLocalData.getvalue('clientId'), //7, //
      recrId: userLocalData.getvalue('recrId'),
      fromDate: fromDate,
      toDate: toDate,
    };

    ApiService.postWithData('admin', 'getCandidatesSavedByTeamMember', requestData)
      .then((response: any) => {
        if (response.data && response.data.Success) {
          setLinkedincandidatedata(response.data.data);
          // showToaster(response.data.Message, 'success');
        } else {
          //showToaster("Failed to fetch data", 'error');
          console.log("Failed to fetch data");
        }
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        //  showToaster("Error fetching data", 'error');
      })
      .finally(() => {
      });
  };

  const LinkedinemailColumns: MRT_ColumnDef<any>[] = useMemo(
    () => [
      {
        accessorKey: "firstName",
        header: "Team Member",
      },
      {
        accessorKey: "emailsSent",
        header: "# Email Sent",
        size: 60
      },
    ], [])
  const LinkedIncandidateColumns: MRT_ColumnDef<any>[] = useMemo(
    () => [
      {
        accessorKey: "firstName",
        header: "Team Member",
      },
      {
        accessorKey: "candidatesAdded",
        header: "# Candidates Added",
        size: 60
      },
    ], [])
  const LinkedInrepliesColumns: MRT_ColumnDef<any>[] = useMemo(
    () => [
      {
        accessorKey: "firstName",
        header: "Team Member",
      },
      {
        accessorKey: "repliesReceived",
        header: "# replies received",
        size: 60
      },
    ], [])
  // const LinkedInColumns: MRT_ColumnDef<any>[] = useMemo(
  //   () => [
  //     {
  //       accessorKey: "firstName",
  //       header: "Name",
  //       Cell: ({ row }) =>
  //         <Link to={`../candidate/view/${row.original.userId}`} className="hightLightTd" state={{
  //           data: [{
  //             text: "Home",
  //             link: `../../home`
  //           },
  //           {
  //             text: `${row.original.firstName.toLowerCase() + " " + row.original.lastName.toLowerCase()}`,
  //             link: ``
  //           }]
  //         }}>
  //           <span className='tt-capital'>{row.original.firstName.toLowerCase() + " " + row.original.lastName.toLowerCase()}</span>
  //         </Link>
  //       // row.original.hasOwnProperty("linkedinUrl") ? (
  //       //   <span onClick={() => window.open("https://www." + row.original.linkedinUrl)} className='tt-capital firstname'>{row.original.firstName}</span>
  //       // )
  //       //   :
  //       //   <span className='tt-capital'>{row.original.firstName}</span>
  //     },
  //     {
  //       accessorKey: "linkedinUrl",
  //       header: "Linkedin URL",
  //       Cell: ({ row }) =>
  //         row.original.hasOwnProperty("linkedinUrl") ? (
  //           <Button variant='text' color='primary' onClick={() => window.open("https://www." + row.original.linkedinUrl)} className='tt-lower'>{row.original.linkedinUrl}</Button>
  //         )
  //           :
  //           null

  //     },
  //   ], [])

  //   const [globalFilterLinkedIn, setGlobalFilterLinkedIn] = useState('');
  //   useEffect(() => {
  //     const filtered = linkedindata.filter(row => {
  //         const filter = globalFilterLinkedIn || ''; 
  //         return (
  //             row.firstName?.toLowerCase().includes(filter.toLowerCase()) ||           
  //             row.lastName?.toLowerCase().includes(filter.toLowerCase())            
  //         );
  //     });
  //     setLinkedindataFiltered(filtered);
  // }, [globalFilterLinkedIn, linkedindata]); 

  return (
    <div id="ChromeExtensioncontacts">
      <div className="chormeContacts ">
        <div className="contacts-header ">
          <h4>Email Status</h4>
          <TuneIcon style={{ cursor: 'pointer' }} onClick={handleClickEmail} />
        </div>
        <Grid container direction="row" className=' stats-container '>
          <Grid className=' stat-box'  >
            <h3 className='mb-2'>Sent</h3>
            {
              emailStatsLoaded ? 
              <h3>{emailStats.sentEmailCount}</h3>
              :
              <CircularProgress size="25px" />
            }
            {/* <p>vs prev {emailStats.sentEmailCountPrev}</p> */}
          </Grid>
          <Grid className=' stat-box'  >
            <h3 className='mb-2'>Opened</h3>
            {
              emailStatsLoaded ? 
              <h3>{emailStats.openedEmailCount}</h3>
              :
              <CircularProgress size="25px" />
            }
            {/* <p>vs prev {emailStats.openedEmailCountPrev}</p> */}

          </Grid>
          <Grid className=' stat-box'  >
            <h3 className='mb-2'>Replied</h3>
            {
              emailStatsLoaded ? 
              <h3>{emailStats.repliedEmailCount}</h3>
              :
              <CircularProgress size="25px" />
            }
            {/* <p>vs prev {emailStats.repliedEmailCountPrev}</p> */}
          </Grid>
        </Grid>
      </div>

          {/* <TuneIcon style={{ cursor: 'pointer' }} onClick={(event) => handleOpenPopover('linkedin', event)} /> */}
      {/* <div className="chormeContacts MRTableCustom">
        <div className="contacts-header">
          <h4>LinkedIn Viewed Profiles</h4>
        </div>

        <MaterialReactTable
          columns={LinkedInColumns}
          data={linkedindataFiltered}//connect internal row selection state to your own
          // state={{ isLoading: jobsLoading }} //pass our managed row selection state to the table to use
          // initialState={{ columnPinning: { left: ['mrt-row-select', 'name'] }, density: 'compact' }}
          state={{ globalFilter: globalFilterLinkedIn }}
          initialState={{
              // columnPinning: { left: ['mrt-row-select', 'roleName'] },
              density: 'compact',
              showGlobalFilter: false,
          }}
          enableStickyHeader
          enableDensityToggle={false}
          enableFullScreenToggle={false}
          columnResizeMode="onChange"
          enableGlobalFilterModes={true}
          enableGlobalFilter={true}
          enableColumnActions={false}
          enableColumnFilters={false}
          enableHiding={false}
          enableBottomToolbar={false}
          onGlobalFilterChange={setGlobalFilterLinkedIn}
        />
        <div className="text-right">
              <Button
                  href={`#/${userLocalData.getvalue('clientName')}/reports/LinkedInViewedProfiles`}
                  color="primary"
                  sx={{ ml: 'auto', mt: 2, maxWidth: '100px !important' }}
              >
                Show More
              </Button>
        </div>
      </div> */}
      {
        (userLocalData.getvalue('paymentType') !== 1) ?
          <>
            <div className="chormeContacts MRTableCustom">
              <div className="contacts-header ">
                <h4>Campaign Performance</h4>
                <TuneIcon style={{ cursor: 'pointer' }} onClick={(event) => handleOpenPopover('campaign', event)} />
              </div>
              <MaterialReactTable
                columns={campaignColumns}
                data={campaigndata}//connect internal row selection state to your own
                state={{ isLoading: campaignPerformanceloading }}
                // initialState={{ columnPinning: { left: ['mrt-row-select', 'name'] }, density: 'compact' }}
                enableDensityToggle={false}
                enableFullScreenToggle={false}
                columnResizeMode="onChange"
                enableGlobalFilterModes={false}
                enableGlobalFilter={false}
                enableColumnActions={false}
                enableColumnFilters={false}
                enableTopToolbar={false}
                enableHiding={false}
                enableBottomToolbar={false}
              />
            </div>

            <div className="Leaderboard_contacts">
              <div className="chormeContacts_Leaderboard MRTableCustom">
                <div className="contacts-header ">
                  <h4>Leader Board - Emails sent</h4>
                  <TuneIcon style={{ cursor: 'pointer' }} onClick={(event) => handleOpenPopover('sentemail', event)} />
                </div>
                <MaterialReactTable
                  columns={LinkedinemailColumns}
                  data={linkedinemaildata}//connect internal row selection state to your own
                  // state={{ isLoading: jobsLoading }} //pass our managed row selection state to the table to use
                  // initialState={{ columnPinning: { left: ['mrt-row-select', 'name'] }, density: 'compact' }}
                  enableDensityToggle={false}
                  enableFullScreenToggle={false}
                  columnResizeMode="onChange"
                  enableGlobalFilterModes={false}
                  enableGlobalFilter={false}
                  enableColumnActions={false}
                  enableColumnFilters={false}
                  enableTopToolbar={false}
                  enableHiding={false}
                  enableBottomToolbar={false}
                />
              </div>

              <div className="chormeContacts_Leaderboard MRTableCustom">
                <div className="contacts-header  ">
                  <h4>Leader Board - Candidates Added to Curately</h4>
                  <TuneIcon style={{ cursor: 'pointer' }} onClick={(event) => handleOpenPopover('candidate', event)} />
                </div>
                <MaterialReactTable
                  columns={LinkedIncandidateColumns}
                  data={linkedincandidatedata}//connect internal row selection state to your own
                  // state={{ isLoading: jobsLoading }} //pass our managed row selection state to the table to use
                  // initialState={{ columnPinning: { left: ['mrt-row-select', 'name'] }, density: 'compact' }}
                  enableDensityToggle={false}
                  enableFullScreenToggle={false}
                  columnResizeMode="onChange"
                  enableGlobalFilterModes={false}
                  enableGlobalFilter={false}
                  enableColumnActions={false}
                  enableColumnFilters={false}
                  enableTopToolbar={false}
                  enableHiding={false}
                  enableBottomToolbar={false}
                />
              </div>

              <div className="chormeContacts_Leaderboard MRTableCustom">
                <div className="contacts-header ">
                  <h4>Leader Board - replies received</h4>
                  <TuneIcon style={{ cursor: 'pointer' }} onClick={(event) => handleOpenPopover('received', event)} />
                </div>
                <MaterialReactTable
                  columns={LinkedInrepliesColumns}
                  data={linkedinrepliesdata}//connect internal row selection state to your own
                  // state={{ isLoading: jobsLoading }} //pass our managed row selection state to the table to use
                  // initialState={{ columnPinning: { left: ['mrt-row-select', 'name'] }, density: 'compact' }}
                  enableDensityToggle={false}
                  enableFullScreenToggle={false}
                  columnResizeMode="onChange"
                  enableGlobalFilterModes={false}
                  enableGlobalFilter={false}
                  enableColumnActions={false}
                  enableColumnFilters={false}
                  enableTopToolbar={false}
                  enableHiding={false}
                  enableBottomToolbar={false}
                />
              </div>
            </div>
          </>
          :
          null
      }
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <List>
          {durationMapping.map((option) => (
            <ListItemButton
              className="list_item"
              key={option.value}
              selected={selectedOption === option.label}
              onClick={() => handleOptionClick(option)}
              sx={{
                backgroundColor: selectedOption === option.label ? '#1976d2 !important' : 'inherit',
                color: selectedOption === option.label ? '#fff !important' : 'inherit',
              }}
            >
              <ListItemText primary={option.label} />
            </ListItemButton>
          ))}
        </List>
      </Popover>
      <Popover
        id={ids}
        open={opened}
        anchorEl={anchorE2}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <List>
          {/* , 'Custom Date' */}
          {['Last 7 days', 'Last 4 weeks', 'Last 6 months', 'Last 12 months'].map((option) => (
            <ListItemButton
              className="list_item_options"
              key={option}
              selected={
                (popoverContext === 'linkedin' && selectOptions === option) ||
                (popoverContext === 'campaign' && selectedOptions === option) ||
                (popoverContext === 'sentemail' && selectedEmailOptions === option) ||
                (popoverContext === 'candidate' && selectedCandidateOptions === option) ||
                (popoverContext === 'received' && selectedReceivedOptions === option)
              }
              onClick={() => handleOptionsClick(option)}
              style={{
                backgroundColor:
                  (popoverContext === 'linkedin' && selectOptions === option) ||
                    (popoverContext === 'campaign' && selectedOptions === option) ||
                    (popoverContext === 'sentemail' && selectedEmailOptions === option) ||
                    (popoverContext === 'candidate' && selectedCandidateOptions === option) ||
                    (popoverContext === 'received' && selectedReceivedOptions === option)
                    ? '#1976d2'
                    : 'inherit',
                color:
                  (popoverContext === 'linkedin' && selectOptions === option) ||
                    (popoverContext === 'campaign' && selectedOptions === option) ||
                    (popoverContext === 'sentemail' && selectedEmailOptions === option) ||
                    (popoverContext === 'candidate' && selectedCandidateOptions === option) ||
                    (popoverContext === 'received' && selectedReceivedOptions === option)
                    ? '#fff'
                    : 'inherit',
              }}
            >
              <ListItemText primary={option} />
            </ListItemButton>
          ))}
        </List>

      </Popover>
    </div>
  );
};

export default ChromeExtensioncontacts;
