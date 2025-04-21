import { useEffect, useState } from '../../../../shared/modules/React';
import ApiService from "../../../../shared/api/api";
import { DateTime } from '../../../../shared/modules/Luxon';
import { Grid } from '../../../../shared/modules/MaterialImports/Grid';
import { Typography } from '../../../../shared/modules/MaterialImports/Typography';
import { Stack } from '../../../../shared/modules/MaterialImports/Stack';
import { Button } from '../../../../shared/modules/MaterialImports/Button';
import { DatePicker, LocalizationProvider, AdapterLuxon } from '../../../../shared/modules/MaterialImports/DatePicker';
import { MaterialReactTable, MRT_ColumnDef } from "../../../../shared/modules/MaterialReactTable";
import { showToaster } from '../../../../shared/modules/commonImports';
import { userLocalData } from '../../../../shared/services/userData';
import CustomPagination from '../../../shared/CustomPagination/CustomPagination';

import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";

import { globalData } from '../../../../shared/services/globalData';

import './Activitylog.scss';


const Activitylog = ({ type, closeInvitePopup }: { type: '' | 'email' | 'phone', closeInvitePopup: () => void }) => {
    const [activityData, setActivityData] = useState([]);
    const [startDate, setStartDate] = useState<any>(DateTime.now().minus({ month: 1 }));
    const [endDate, setEndDate] = useState<any>(DateTime.now());
    const [searchedData, setSearchedData] = useState<boolean>(false);

    const [dataLoading, setDataLoading] = useState<boolean>(false);

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const [rowCount, setRowCount] = useState(0);


    const openCandidateView = (id: string) => {
        window.open(globalData.getWindowLocation() + "candidate/view/" + id);
    }

    const openContactView = (id: string) => {
        window.open(globalData.getWindowLocation() + "contact/view/" + id);
    }

    const columns: MRT_ColumnDef<any>[] = [

        {
            accessorKey: "name", //simple recommended way to define a column
            header: "Name",
            accessorFn: (row) => `${row.firstname} ${row.lastname}`,
            Cell: ({ row }) => {
                const firstName = row.original.firstname ? row.original.firstname?.toLowerCase() : "";
                const lastName = row.original.lastname ? row.original.lastname?.toLowerCase() : "";

                return <span className="hightLightTd" onClick={() => {
                    if (Number(row.original.type) === 1) {
                        openCandidateView(row.original.userid);
                    } else  if (Number(row.original.type) === 2) {
                        openContactView(row.original.userid);
                    }
                }}>{firstName + " " + lastName}</span>
            },
        },
        {
            accessorKey: 'actiondate',
            header: 'Date',
            Cell: ({ row }) => (
                <span>
                    {(row.original.actiondate && (row.original.actiondate?.length > 11)) ? DateTime.fromFormat(row.original.actiondate?.substring(0, 19) || "", 'yyyy-MM-dd hh:mm:ss').toFormat('MM/dd/yyyy hh:mm') : ""}
                    {/* hh:mm:ss */}
                </span>
            ),
            size: 120
        },
        {
            accessorKey: "recruiterName",
            header: "Accessed By",
            // Cell: ({ row }) => (
            //     <span>
            //         {(row.original.actionname === "Save Email") ? "Email Address" : (row.original.actionname === "Save Phone No") ? "Mobile Number" : (row.original.actionname === "Referral Recruiter") ? "Recruiter Referred" : row.original.actionname}
            //     </span>
            // ),
            size: 120
        },
        {
            accessorKey: "contactinfo",
            header: "Contact Info",
            Cell: ({ row }) => {
                let titleToShow = (type && (row.original.contactinfo)) ? row.original.contactinfo : "";
                // let titleToShow = type ? (row.original.actionname === "Save Email") ? row.original.email : (row.original.actionname === "Save Phone No") ? row.original.phone : "" : "";
                if (!type && row.original.contactinfo) {
                    let email = row.original.contactinfo.split(',')[0];
                    let phone = row.original.contactinfo.split(',').length > 1 ? row.original.contactinfo.split(',')[1] : row.original.contactinfo.split(',')[0];

                    titleToShow = (row.original.actionname === "Save Email") ? email : (row.original.actionname === "Save Phone No") ? phone : "";
                }
                return <span>
                    {titleToShow}
                </span>

            }
        },
        {
            accessorKey: "emailCredits",
            header: "Credits",
            Cell: ({ row }) => (
                <span className='fw-7 fs-16'>
                    {
                        (row.original.emailCredits === "1") && (row.original.phoneCredits === "1") ? <span className='c-red'>2</span> :
                            <>
                                {(row.original.emailCredits === "1") ? <span className='c-red'>1</span> : row.original.emailCredits ? <span className='c-green'>{row.original.emailCredits}</span> : <></>}
                                {(row.original.phoneCredits === "1") ? <span className='c-red'>1</span> : row.original.phoneCredits ? <span className='c-green'>{row.original.phoneCredits}</span> : <></>}
                            </>
                    }
                </span>
            ),
            size: 70,
            maxSize: 70
        },
    ];
    const getActivitylogData = (pageNumber: number) => {
        startDate && endDate ? setSearchedData(true) : setSearchedData(false);
        if (startDate && endDate) {
            setDataLoading(true);
            let dataToPass: {
                recrId: string;
                clientId: string;
                page_size: number;
                page_num: number;
                type?: string;
                fromDate?: string;
                toDate?: string;
            } = {
                recrId: userLocalData.getvalue('recrId'),
                clientId: userLocalData.getvalue('clientId'),
                page_size: 10,
                page_num: pageNumber,
            }
            if(type){
                dataToPass.type = type;
            }
            if (!type) {
                dataToPass.fromDate = startDate.toFormat('yyyy-MM-dd');
                dataToPass.toDate = endDate.toFormat('yyyy-MM-dd');
            }
            ApiService.postWithData('admin', 'chrome-extension/activity-log', dataToPass).then((response: any) => {
                // console.log(response.data);
                let respAction = response.data?.activityLogData ? response.data?.activityLogData : [];
                for (let ra = 0; ra < respAction.length; ra++) {
                    respAction[ra].emailCredits = ["Save Phone No and Email", "Save Email"].includes(respAction[ra].actionname) ?
                        "1"
                        :
                        ["4569", "4577", "4579", "4581", "4582",].includes(respAction[ra].actionid) ? "50" :
                            ["4570", "4578", "4580"].includes(respAction[ra].actionid) ? "600" :
                                ["4571", "4575", "4583"].includes(respAction[ra].actionid) ? "750" :
                                    ["4572", "4576", "4584"].includes(respAction[ra].actionid) ? "9000" :
                                        ["4573", "4585", "4587"].includes(respAction[ra].actionid) ? "1000" :
                                            ["4574", "4586", "4588"].includes(respAction[ra].actionid) ? "12000" :
                                                ["4589", "4590"].includes(respAction[ra].actionid) ? "10" :
                                                    "";
                    respAction[ra].phoneCredits = ["Save Phone No and Email", "Save Phone No"].includes(respAction[ra].actionname) ?
                        "1"
                        :
                        ["4573", "4585", "4587"].includes(respAction[ra].actionid) ? "100" :
                            ["4574", "4586", "4588"].includes(respAction[ra].actionid) ? "1200" :
                                "";

                }
                setActivityData(respAction);
                if (pageNumber === 0) {
                    setRowCount(response.data.totalRecords);
                }
                setDataLoading(false);

            })
        }
        else {
            showToaster("Please Enter Date", 'error')
        }
    }

    const [credits, setCredits] = useState({
        consumedEmailCredits: 0,
        consumedProfileCredits: 0,
        consumedSmsCredits: 0,
        daysLeft: 0,
        totalEmailCredits: 0,
        totalProfileCredits: 0,
        totalSmsCredits: 0,
        profilePercentage: 0,
        startDate: "",
        expireDate: "",
    });

    const getCredits = () => {
        // https://qaadminapi.curately.ai/curatelyAdmin/getCredits/7/3291
        ApiService.getById('admin', `getCredits/${userLocalData.getvalue('clientId')}`, userLocalData.getvalue('recrId')).then((response) => {
            // console.log(response.data);
            if (response.data.Success) {
                setCredits({
                    consumedEmailCredits: response.data.consumedEmailCredits,
                    consumedProfileCredits: response.data.consumedProfileCredits,
                    consumedSmsCredits: ((response.data.paymentType === 1) || (response.data.paymentType === 2)) ? 0 : response.data.consumedSmsCredits,
                    daysLeft: response.data.daysLeft,
                    totalEmailCredits: response.data.totalEmailCredits,
                    totalProfileCredits: response.data.totalProfileCredits,
                    totalSmsCredits: ((response.data.paymentType === 1) || (response.data.paymentType === 2)) ? 0 : response.data.totalSmsCredits,
                    profilePercentage: ((response.data.consumedProfileCredits / response.data.totalProfileCredits) * 100),
                    startDate: response.data.startDate ? DateTime.fromFormat(response.data.startDate.substring(0, 19), 'yyyy-MM-dd hh:mm:ss').toFormat('MM/dd/yyyy ') : "",
                    expireDate: response.data.expireDate ? DateTime.fromFormat(response.data.expireDate.substring(0, 19), 'yyyy-MM-dd hh:mm:ss').toFormat('MM/dd/yyyy ') : ""
                });
                localStorage.setItem(`credits_${userLocalData.getvalue('recrId')}`, JSON.stringify({
                    consumedEmailCredits: response.data.consumedEmailCredits,
                    consumedProfileCredits: response.data.consumedProfileCredits,
                    consumedSmsCredits: ((response.data.paymentType === 1) || (response.data.paymentType === 2)) ? 0 : response.data.consumedSmsCredits,
                    daysLeft: response.data.daysLeft,
                    totalEmailCredits: response.data.totalEmailCredits,
                    totalProfileCredits: response.data.totalProfileCredits,
                    totalSmsCredits: ((response.data.paymentType === 1) || (response.data.paymentType === 2)) ? 0 : response.data.totalSmsCredits,
                    profilePercentage: ((response.data.consumedProfileCredits / response.data.totalProfileCredits) * 100),
                    isPackageEmailValidity: Number(response.data.totalEmailCredits) ? (Number(response.data.totalEmailCredits) > Number(response.data.consumedEmailCredits)) ? true : false : false,
                    isPackagePhoneValidity: ((response.data.paymentType !== 1) && (response.data.paymentType !== 2) && Number(response.data.totalSmsCredits)) ? (Number(response.data.totalSmsCredits) - Number(response.data.consumedSmsCredits)) ? true : false : false,
                    startDate: response.data.startDate ? DateTime.fromFormat(response.data.startDate.substring(0, 19), 'yyyy-MM-dd hh:mm:ss').toFormat('MM/dd/yyyy ') : "",
                    expireDate: response.data.expireDate ? DateTime.fromFormat(response.data.expireDate.substring(0, 19), 'yyyy-MM-dd hh:mm:ss').toFormat('MM/dd/yyyy ') : ""
                }));




                // getDomainRecruitersList(response.data.invitedRecruiterDetails);
            }
        })
    }

    useEffect(() => {
        getActivitylogData(pagination.pageIndex);
    }, [pagination.pageIndex]);

    useEffect(() => {
        getCredits();
    }, []);
    return (
        <div className='px-5' id="ActivityLog">
            {
                !type ?
                    <div className="pt-3">
                        <Grid
                            container
                            direction="row"
                            className="customCard px-4 py-2 mb-2"
                            justifyContent="flex-start"
                            alignItems="center"
                            display="flex"
                            sx={{ minHeight: 'auto !important' }}
                        >
                            <Typography variant="h6" className="headerName">
                                Usage Report
                            </Typography>
                        </Grid>
                    </div>
                    :
                    null
            }
            {
                !type ?
                    <div>
                        <Grid
                            className="mt-1 mb-3 customCard activityLogDate py-3"
                            container
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                        >

                            <Stack direction="row" spacing={3} style={{ paddingRight: '22px' }} >
                                <LocalizationProvider dateAdapter={AdapterLuxon}>
                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="flex-start"
                                        alignItems="center" spacing={2}
                                    >
                                        <DatePicker
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
                                        <DatePicker
                                            value={endDate}
                                            onChange={(newValue, e) => {
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
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="flex-start"
                                    alignItems="center" spacing={2}
                                >
                                    <Button variant='contained' onClick={() => { getActivitylogData(0); }}>Get {type ? "Credits" : "Report"}</Button>
                                </Grid>
                            </Stack>
                            {
                                credits.totalProfileCredits && credits.totalSmsCredits ?
                                    <Stack direction="row" spacing={3}>
                                        <Stack direction="row" className='mr-4'>
                                            <span className='mr-2'>Credits Remaining</span>
                                            <MailOutlineOutlinedIcon className="mr-1" />
                                            <span className='mr-3'>{credits.totalProfileCredits - credits.consumedProfileCredits}</span>

                                            <CallOutlinedIcon className="mr-1" />
                                            <span>{credits.totalSmsCredits - credits.consumedSmsCredits}</span>
                                        </Stack>
                                        <Stack direction="row">
                                            <span className='mr-2'>Valid from {credits.startDate} to {credits.expireDate}</span>
                                        </Stack>
                                    </Stack>
                                    :
                                    null
                            }
                        </Grid>
                    </div>
                    :
                    null
            }
            <div className={type ? "inPopUp" : ""}>
                {searchedData ?
                    <div className={`MRTableCustom  pl-0 `}>
                        <MaterialReactTable
                            columns={columns}
                            data={activityData}
                            enableDensityToggle={false}
                            enableColumnFilters={false}
                            enableFullScreenToggle={false}
                            enableGlobalFilter={false}
                            enableHiding={false}
                            enableColumnActions={false}
                            enablePagination={false}
                            enableTopToolbar={false}
                            enableStickyHeader
                            state={{
                                isLoading: dataLoading
                            }}
                            renderBottomToolbarCustomActions={() => (
                                <CustomPagination
                                    page={pagination.pageIndex}
                                    rowsPerPage={10}
                                    rowCount={rowCount}
                                    onChangePage={(page: any) => setPagination({ ...pagination, pageIndex: page, pageSize: 10 })}
                                />
                            )}
                        />
                    </div>
                    :
                    null
                }
            </div>
        </div>

    )
}

export default Activitylog;