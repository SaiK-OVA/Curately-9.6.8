import { useState, useEffect, useMemo } from 'react';
import Grid from '@mui/material/Grid2';
import { showToaster } from '../../../shared/SnackBar/SnackBar';

import MASTER_JSON_COMMUNITY from "../../../../shared/data/Community/BuildJson";


import ApiService from '../../../../shared/api/api';
import { trackPromise } from 'react-promise-tracker';

import Stack from "@mui/material/Stack";
import { MaterialReactTable, type MRT_ColumnDef, type MRT_SortingState } from "material-react-table";
import { DateTime } from 'luxon';

import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import ApiRequests from "../../../../shared/api/api";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";

import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';
import Menu from "@mui/material/Menu";
import updateDocumentTitle from '../../../../shared/services/title';
import QuestionMarkRoundedIcon from '@mui/icons-material/QuestionMarkRounded';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import Tooltip from "@mui/material/Tooltip";
import PhoneDialog from '../../../shared/PhoneDialog/PhoneDialog';

import EmailDialogBox from '../../../shared/EmailDialogBox/EmailDialogBox';
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
//import IconButton from "@mui/material/IconButton";

import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import {
    Edit as EditIcon,


} from '@mui/icons-material';

import { globalData } from "../../../../shared/services/globalData";
//import styles from "./../../shared/config/variables.module.scss";
import EditCandidate from '../../Candidate/EditCandidate/EditCandidate';

import Sequence from '../../Job/View/Sourced/PopUps/Sequence/Sequence';
import Autocomplete from '@mui/material/Autocomplete';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { userLocalData } from '../../../../shared/services/userData';
import CircularProgress from '@mui/material/CircularProgress';
import TelegramIcon from '@mui/icons-material/Telegram';

import './ViewPool.scss';




const ViewPool = () => {

    const [filtersExpand, setFiltersExpand] = useState(false);
    const [mainJsonData, setMainJsonData] = useState<any>({});

    const [applicantsData, setApplicantsData] = useState<any>([]);
    const [rowSelection, setRowSelection] = useState({});
    const [dataLoading, setDataLoading] = useState(false);
    const [rowCount, setRowCount] = useState(0);
    const [candidateData, setCandidateData] = useState<any>([]);

    const [dialogPhoneStatus, setDialogPhoneStatus] = useState(false);
    const [phoneOnClicked, setPhoneOnClicked] = useState('');
    const [dialogStatus, setDialogStatus] = useState(false);
    const [addEmail, setAddEmail] = useState(false);
    const [emailOnClicked, setEmailOnClicked] = useState('');
    const tabValue = 'Talent Pool';


    const [selectedRowId, setSelectedRowId] = useState<string | null>(null)
    const [TableMailOpen, setTableOpenMail] = useState<null | HTMLElement>(null);
    const [TableCallOpen, setTableOpenCall] = useState<null | HTMLElement>(null);
    const [TableListOpen, setTableOpenList] = useState<null | HTMLElement>(null);
    const [TableSequenceOpen, setTableOpenSequence] = useState<null | HTMLElement>(null);

    const [TableTelegramOpen, setTableOpenTelegram] = useState<null | HTMLElement>(null);
    const openTableTelegram = Boolean(TableTelegramOpen);

    const openTableMail = Boolean(TableMailOpen);
    const openTableCall = Boolean(TableCallOpen);
    const openTableList = Boolean(TableListOpen);
    const openTableSequence = Boolean(TableSequenceOpen);



    const [openAddCandidateModal, setOpenAddCandidateModal] = useState(false);
    const [menuData, setMenuData] = useState({
        rowId: '',
        email: '',
        first: '',
        candId: '',
        jobId: '',
        phone: '',
    });
    const [selectAllElement, setSelectAllElement] = useState<null | HTMLElement>(null);
    const openSelectAllMenu = Boolean(selectAllElement);
    const openSelectAll = (event: React.MouseEvent<HTMLButtonElement>) => {
        setSelectAllElement(event.currentTarget);
    };
    const checkedCount = Object.keys(rowSelection).length;
    const [isSelectAllChecked, setIsSelectAllChecked] = useState(false);
    const someAreChecked = (!isSelectAllChecked && checkedCount) ? true : false;
    const [openSequenceModal, setOpenSequenceModal] = useState(false);
    const [addtolistanchorEl, setAddToListAnchorEl] = useState<null | HTMLElement>(null);
    const openAddToListenBtn = Boolean(addtolistanchorEl);
    const [distributionList, setDistributionList] = useState<any>([]);

    const handleClickAddTeligram = (event: React.MouseEvent<HTMLButtonElement>) => {
        setTableOpenTelegram(event.currentTarget);
    };













    const handleTableMenuSendMailOpen = (sendMailId: any) => {
        if (sendMailId) {
            setDialogStatus(true);
            setEmailOnClicked(sendMailId);
            setTableOpenMail(null);
        }
        console.log(sendMailId);
    };


    const handleTableCall = (event: React.MouseEvent<HTMLButtonElement>, callId: any) => {


        console.log('filterCallId', callId);
        if (callId) {
            setTableOpenMail(null);
            setTableOpenCall(event.currentTarget);


            setSelectedRowId(callId)
        }

    };

    const handleTableClose = () => {
        setTableOpenMail(null);
        setTableOpenCall(null);
        setTableOpenList(null);
        setTableOpenSequence(null);
        setTableOpenTelegram(null);
    };

    const handleShowCallSnack = (callId: any) => {
        setTableOpenCall(null);
    };


    const handleTableMail = (event: React.MouseEvent<HTMLButtonElement>, mailId: any) => {
        if (mailId) {
            setTableOpenMail(event.currentTarget);
            setSelectedRowId(mailId);
            setTableOpenCall(null);
            // console.log('aa', event.currentTarget, "---" + mailId, " === " + openTableMail);
        }
    };


    const handleShowSnack = (snackId: any) => {

        setTableOpenMail(null);
    };

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 50, //customize the default page size
    });
    const [sorting, setSorting] = useState<MRT_SortingState>([]);


    const handleClickAddToListen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAddToListAnchorEl(event.currentTarget);
        loadDistributionList()
    };

    const handleProfileMenuClose = () => {
        setAddToListAnchorEl(null);
    };

    const [selectedJob, setSelectedJob] = useState({
        title: "",
        id: "208057"
    });

    const selectAllMenuItemClicked = (menuType: any) => {
        if (menuType === "page") {

            const startIndex = pagination.pageIndex * pagination.pageSize;
            const endIndex = Math.min((pagination.pageIndex + 1) * pagination.pageSize, applicantsData.length);

            let checkedCheckboxesData: any = {};
            for (let index = startIndex; index < endIndex; index++) {
                checkedCheckboxesData[applicantsData[index].candId] = true;
            }

            setRowSelection(checkedCheckboxesData);
            setIsSelectAllChecked(false);
        } else if (menuType === "all") {

            let rowData: any = {};
            let tempData: any = applicantsData;
            for (let index = 0; index < applicantsData.length; index++) {
                rowData[tempData[index].candId] = true;
            }

            setRowSelection(rowData);
            setIsSelectAllChecked(true);
        } else if (menuType === "clear") {
            setIsSelectAllChecked(false);
            setRowSelection({});
        }
        setSelectAllElement(null);
    };

    const openCandidateView = (id: string) => {
        window.open(globalData.getWindowLocation() + "candidate/view/" + id.trim());
    }

    const openCandidateEdit = (candidateId: string) => {
        trackPromise(
            ApiRequests.getByParams(193, '/Candidate/candidate_details.jsp', { candId: candidateId })

                .then(
                    (response: any) => {
                        const result = response.data;

                        setCandidateData({
                            firstName: String(result.firstName ? result.firstName : ""),
                            lastName: String(result.lastName ? result.lastName : ""),
                            linkedIn: String(result.linkedIn ? result.linkedIn : ""),
                            email: String(result.email ? result.email : ""),
                            email2: String(result.email2 ? result.email2 : ""),
                            cellPhone2: String(result.cellPhone2 ? result.cellPhone2 : ""),
                            workPhone: String(result.workPhone ? result.workPhone : ""),
                            street: String(result.street ? result.street : ""),
                            cellPhone: String(result.cellPhone ? result.cellPhone : ""),
                            zip: Number(result.zip ? result.zip : ""),
                            city: String(result.city ? result.city : ""),
                            state: String(result.state ? result.state : ""),
                            homePhone: String(result.homePhone ? result.homePhone : ""),
                            homePhone2: String(result.homePhone2 ? result.homePhone2 : "")

                        });
                        updateDocumentTitle.set(result.firstName + result.lastName + ' | Candidate');
                        setOpenAddCandidateModal(true);
                    }
                )
        );


    }

    const loadDistributionList = () => {
        ApiRequests.getByParams(193, 'distributionlist.jsp', { userId: userLocalData.getvalue('recrId'), type: "Candidate" })
            .then(
                (response: any) => {
                    setDistributionList(response.data);
                }
            )
    }


    const columns: MRT_ColumnDef<any>[] = useMemo(
        () => [
            {
                accessorKey: "name", //simple recommended way to define a column
                header: "Name",
                enableColumnPinning: true,
                accessorFn: (row) => `${row.first} ${row.last}`,
                Cell: ({ renderedCellValue, row }) => {
                    let first = (row.original.first) ? row.original.first.toLowerCase() : "";
                    let last = (row.original.last) ? row.original.last.toLowerCase() : "";
                    return (
                        <span className="hightLightTd" onClick={() => openCandidateView(row.original.candId)}>{first + " " + last}</span>
                    )
                },
                size: 100
            },
            {
                accessorKey: "jobTitle",
                header: "Job",
                Cell: ({ renderedCellValue, row }) => {
                    let jobTitle = (row.original.jobTitle) ? row.original.jobTitle.toLowerCase() : "";
                    let displayTitle = jobTitle.length > 30 ? jobTitle.slice(0, 30) + "..." : jobTitle;
                    return (
                        <Tooltip title={row.original.jobTitle} classes={{ tooltip: 'tt-capital' }}>
                            <span>
                                {displayTitle}
                            </span>
                        </Tooltip>
                    );
                },
            },
            {
                accessorKey: "compName",
                header: "Company",
                Cell: ({ renderedCellValue, row }) => {
                    let compName = row.original.compName ? row.original.compName.toLowerCase() : "";
                    let displayTitle = compName.length > 30 ? compName.slice(0, 30) + "..." : compName;
                    return (
                        <Tooltip title={row.original.compName} classes={{ tooltip: 'tt-capital' }}>
                            <span>
                                {displayTitle}
                            </span>
                        </Tooltip>
                    );
                },
            },




            {
                accessorKey: "Actions",
                header: "Quick Actions",
                Cell: ({ renderedCellValue, row }) => (
                    <Stack
                        key={row.original.candId}
                    >
                        <ButtonGroup
                            variant="outlined"
                            id={
                                row.original.candId
                            }





                            sx={{

                                height: "31px",
                                "& .MuiButtonGroup-grouped": {
                                    marginRight: "1px",
                                },
                            }}
                        >
                            <Tooltip
                                title={row.original.email}
                                placement="top"
                            >
                                <Button
                                    id={`mailbutton-${row.id}`}

                                    onClick={(e) => {
                                        if (row.original.email) {
                                            setMenuData({
                                                rowId: row.id,
                                                email: row.original.email,
                                                first: row.original.first,
                                                candId: row.original.candId,
                                                jobId: row.original.jobId,
                                                phone: ''
                                            })
                                            handleTableMail(e, `${row.id}`);
                                        }
                                    }}
                                    aria-controls={
                                        openTableMail && selectedRowId === `${row.id}` ? `mail-${row.id}` : undefined
                                    }
                                    aria-haspopup="true"
                                    aria-expanded={
                                        openTableMail && selectedRowId === `${row.id}` ? "true" : undefined
                                    }
                                    sx={{
                                        pointerEvents: row.original.email ? 'auto' : 'none',
                                        borderColor: openTableMail && selectedRowId === `${row.id}`
                                            ? "var(--c-primary-color) !important"
                                            : "var(--c-secondary-color)",
                                        backgroundColor: "#ffffff",
                                        color: openTableMail && selectedRowId === `${row.id}`
                                            ? "var(--c-primary-color) !important"
                                            : "#919191",
                                        borderRightColor: openTableMail && selectedRowId === `${row.id}`
                                            ? "var(--c-primary-color) !important"
                                            : "var(--c-secondary-color)",
                                        mr: "0px",
                                        "&:hover": {
                                            borderColor: "var(--c-secondary-color)",
                                            color: "#919191",
                                            backgroundColor: "#ffffff",
                                        },
                                        width: "33px",
                                    }}
                                    className="customButtonForHover"









                                >
                                    <Box sx={{ position: 'relative', display: 'inline-block', alignItems: 'center', mt: 1 }}>
                                        <MailOutlineOutlinedIcon
                                            sx={{
                                                fontSize: "16px",
                                            }}
                                        />

                                        <Box
                                            sx={{
                                                backgroundColor: '#1DB268',

                                                height: '10px',
                                                width: '10px',
                                                borderRadius: '50%',
                                                fontSize: '10px',
                                                display: row.original.email ? 'flex' : 'none',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                color: 'red',
                                                position: 'absolute',
                                                top: -2,
                                                right: -2
                                            }}>
                                            <DoneRoundedIcon
                                                sx={{
                                                    fontSize: '8px',
                                                    color: '#ffffff',
                                                }} />
                                        </Box>


                                        <Box
                                            sx={{
                                                backgroundColor: '#919191',

                                                height: '10px',
                                                width: '10px',
                                                borderRadius: '50%',
                                                fontSize: '10px',
                                                display: row.original.email ? 'none' : 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                color: 'red',
                                                position: 'absolute',
                                                top: -2,
                                                right: -2
                                            }}>
                                            <CloseRoundedIcon
                                                sx={{
                                                    fontSize: '8px',
                                                    color: '#ffffff',
                                                }}
                                            />
                                        </Box>

                                        <Box
                                            sx={{
                                                backgroundColor: '#EB7A2F',
                                                display: 'none',
                                                height: '10px',
                                                width: '10px',
                                                borderRadius: '50%',
                                                fontSize: '10px',

                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                color: 'red',
                                                position: 'absolute',
                                                top: -2,
                                                right: -2
                                            }}>

                                            <QuestionMarkRoundedIcon
                                                sx={{
                                                    color: '#ffffff',
                                                    fontSize: '8px'
                                                }}
                                            />
                                        </Box>
                                    </Box>
                                    {/* <ArrowDropDownIcon
                                        sx={{
                                            fontSize: "16px",
                                        }}
                                    /> */}
                                </Button>
                            </Tooltip>


                            <Tooltip
                                title={`${row.original.phone}`}
                                placement="top"
                            >
                                <Button
                                    id={`phonebutton-${row.id}`}
                                    disableRipple
                                    onClick={(e) => {
                                        if (row.original.phone) {
                                            setMenuData({
                                                rowId: row.id,
                                                email: '',
                                                first: row.original.first,
                                                candId: row.original.candId,
                                                jobId: row.original.jobId,
                                                phone: row.original.phone
                                            })
                                            handleTableCall(e, `${row.id}`)
                                        }
                                    }
                                    }
                                    aria-controls={
                                        openTableCall && selectedRowId === `${row.id}`
                                            ? `phone-${row.id}` : undefined
                                    }
                                    aria-haspopup="true"
                                    aria-expanded={
                                        openTableCall && selectedRowId === `${row.id}` ? "true" : undefined
                                    }
                                    className={`customButtonForHover ${row.original.phone === "" ? 'disabled' : ''} `}
                                    sx={{
                                        borderColor: openTableCall && selectedRowId === `${row.id}`
                                            ? "var(--c-primary-color) !important"
                                            : "var(--c-secondary-color)",
                                        backgroundColor: "#ffffff",
                                        color: openTableCall && selectedRowId === `${row.id}`
                                            ? "#919191"
                                            : "#919191",
                                        "& .MuiButtonGroup-root .MuiButtonGroup-grouped:not(:last-of-type)":
                                        {
                                            borderRightColor: openTableCall && selectedRowId === `${row.id}`
                                                ? "#919191"
                                                : "",
                                        },
                                        "&:hover": {
                                            borderColor: "var(--c-secondary-color)",
                                            color: "#919191",
                                            backgroundColor: "#ffffff",
                                        },
                                        width: "33px",
                                    }}
                                >

                                    <CallOutlinedIcon
                                        sx={{
                                            fontSize: "16px",
                                        }}
                                    />
                                    {/* <ArrowDropDownIcon
                                        sx={{
                                            fontSize: "16px",
                                        }}
                                    /> */}
                                </Button>
                            </Tooltip>


                            <Tooltip
                                title='Add to Pool'
                                placement="top"
                            >
                                <Button
                                    id={`listbutton-${row.id}`}
                                    disableRipple
                                    aria-controls={openAddToListenBtn ? "addlistmenu" : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={openAddToListenBtn ? 'true' : undefined}
                                    onClick={handleClickAddToListen}






















                                    className="customButtonForHover"
                                    sx={{
                                        borderColor: openTableCall && selectedRowId === `${row.id}`
                                            ? "var(--c-primary-color) !important"
                                            : "var(--c-secondary-color)",
                                        backgroundColor: "#ffffff",
                                        color: openTableCall && selectedRowId === `${row.id}`
                                            ? "#919191"
                                            : "#919191",
                                        "& .MuiButtonGroup-root .MuiButtonGroup-grouped:not(:last-of-type)":
                                        {
                                            borderRightColor: openTableCall && selectedRowId === `${row.id}`
                                                ? "#919191"
                                                : "",
                                        },
                                        "&:hover": {
                                            borderColor: "var(--c-secondary-color)",
                                            color: "#919191",
                                            backgroundColor: "#ffffff",
                                        },
                                        width: "33px",
                                    }}
                                >

                                    <PlaylistAddOutlinedIcon
                                        sx={{
                                            fontSize: "16px",
                                        }}
                                    />
                                    {/* <ArrowDropDownIcon
                                        sx={{
                                            fontSize: "16px",
                                        }}
                                    /> */}
                                </Button>
                            </Tooltip>
                            <Tooltip
                                title='Add to Sequence'
                                placement="top"
                            >
                                <Button
                                    id={`sequencebutton-${row.id}`}
                                    disableRipple
                                    onClick={(e) => {
                                        if (row.original.candId) {









                                            setOpenSequenceModal(true);
                                        }
                                    }
                                    }
                                    aria-controls={
                                        openTableSequence && selectedRowId === `${row.id}`
                                            ? `sequence-${row.id}` : undefined
                                    }
                                    aria-haspopup="true"
                                    aria-expanded={
                                        openTableSequence && selectedRowId === `${row.id}` ? "true" : undefined
                                    }
                                    className="customButtonForHover"
                                    sx={{
                                        borderColor: openTableSequence && selectedRowId === `${row.id}`
                                            ? "var(--c-primary-color) !important"
                                            : "var(--c-secondary-color)",
                                        backgroundColor: "#ffffff",
                                        color: openTableSequence && selectedRowId === `${row.id}`
                                            ? "#919191"
                                            : "#919191",
                                        "& .MuiButtonGroup-root .MuiButtonGroup-grouped:not(:last-of-type)":
                                        {
                                            borderRightColor: openTableSequence && selectedRowId === `${row.id}`
                                                ? "#919191"
                                                : "",
                                        },
                                        "&:hover": {
                                            borderColor: "var(--c-secondary-color)",
                                            color: "#919191",
                                            backgroundColor: "#ffffff",
                                        },
                                        width: "33px",
                                    }}
                                >

                                    <SendOutlinedIcon
                                        sx={{
                                            fontSize: "16px",
                                        }}
                                    />
                                    {/* <ArrowDropDownIcon
                                        sx={{
                                            fontSize: "16px",
                                        }}
                                    /> */}
                                </Button>
                            </Tooltip>

                            {
                                row.original.notInvited ?
                                    <Tooltip
                                        title="Invite"
                                        placement="top"
                                    >
                                        <Button
                                            className="customButtonForHover"
                                            disableRipple
                                            sx={{
                                                borderColor: "var(--c-secondary-color)",
                                                backgroundColor: "#ffffff",
                                                color: "#919191",
                                                width: "33px",
                                            }}
                                            id="add-telegram-btn"
                                            aria-controls={openTableTelegram ? "addtelegrammenu" : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={openTableTelegram ? 'true' : undefined}
                                            onClick={handleClickAddTeligram}
                                        >

                                            <TelegramIcon
                                                sx={{


                                                    fontSize:
                                                        "16px",
                                                }}
                                            />
                                        </Button>
                                    </Tooltip>
                                    :
                                    null
                            }
                            <Tooltip
                                title="Edit"
                                placement="top"
                            >
                                <Button
                                    className="customButtonForHover"
                                    sx={{
                                        borderColor: "var(--c-secondary-color)",
                                        backgroundColor: "#ffffff",
                                        color: "#919191",
                                        width: "33px",
                                    }}
                                    onClick={() => openCandidateEdit(row.original.candId)}
                                >
                                    {/* {tabValue} */}
                                    <EditIcon
                                        sx={{


                                            fontSize:
                                                "16px",
                                        }}
                                    />
                                </Button>
                            </Tooltip>
                        </ButtonGroup>


                    </Stack>

                ),
                size: 100
            }, {
                accessorKey: "score",
                header: "Score",










                Cell: ({ renderedCellValue, row }) => (
                    row.original.hasOwnProperty('score') ?
                        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                            <CircularProgress variant="determinate" value={Math.round(row.original.score)} />
                            <Box
                                sx={{
                                    top: 0,
                                    left: 0,
                                    bottom: 0,
                                    right: 0,
                                    position: 'absolute',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Typography
                                    variant="caption"
                                    component="div"
                                    color="text.secondary"
                                >{`${Math.round(row.original.score)}%`}</Typography>
                            </Box>
                        </Box>
                        :
                        null
                ),
                size: 80,
            },



















            {
                accessorKey: "city",
                header: "Location",
                Cell: ({ renderedCellValue, row }) => (
                    <span className='location'>
                        {row.original.city}
                        {(row.original.city && row.original.state) ? ", " : ""}
                        {row.original.state}
                        {(row.original.state && row.original.zipCode) ? ", " : ""}
                        {row.original.zipCode}
                    </span>
                )
            },
            {
                accessorKey: "date",
                header: "Date",
                Cell: ({ renderedCellValue, row }) => (
                    <span>
                        {DateTime.fromFormat(row.original.date.substring(0, 19), 'yyyy-MM-dd hh:mm:ss').toFormat('MM/dd/yyyy ')}
                    </span>
                ),
                size: 80
            },
        ],

        []
    );



    const buildJson = async (num = 0, size = 50, passedJsonData: any, count: boolean) => {
        let jsonToPass: any;
        if (passedJsonData.jobTitles) {

            if (passedJsonData.location.zipCode) {
                if (passedJsonData.location.radius === "") {
                    showToaster('Distance is Mandatory', 'error');
                    return false;
                }
            }

            jsonToPass = JSON.parse(JSON.stringify(MASTER_JSON_COMMUNITY));




            jsonToPass.PaginationSettings.Skip = num * size;
            jsonToPass.PaginationSettings.Take = size;


            let jobtitlesTemp: any = [];
            let skillsTemp: any = [];
            for (let i = 0; i < passedJsonData.jobTitles.length; i++) {
                if (passedJsonData.jobTitles[i].title !== '') {
                    jsonToPass.FilterCriteria.JobTitles.push({
                        "Title": passedJsonData.jobTitles[i].title,
                        "IsCurrent": passedJsonData.jobTitles[i].required
                    })
                    jobtitlesTemp.push(passedJsonData.jobTitles[i].title);

                }
            }
            let d = new Date();
            d.setDate(d.getDate() - Number(passedJsonData.daysBack));
            let tempFullYear = d.getFullYear();
            let tempMonth: string | number = d.getMonth() + 1;
            let tempDate: string | number = d.getDate();
            if (tempMonth < 10) {
                tempMonth = '0' + tempMonth;
            }
            if (tempDate < 10) {
                tempDate = '0' + tempDate;
            }
            let d1 = new Date();
            let tempFullYear1 = d1.getFullYear();
            let tempMonth1: string | number = d1.getMonth() + 1;
            let tempDate1: string | number = d1.getDate();
            if (tempMonth1 < 10) {
                tempMonth1 = '0' + tempMonth1;
            }
            if (tempDate1 < 10) {
                tempDate1 = '0' + tempDate1;
            }

            jsonToPass.FilterCriteria.RevisionDateRange.Minimum = tempFullYear + "-" + tempMonth + "-" + tempDate;
            jsonToPass.FilterCriteria.RevisionDateRange.Maximum = tempFullYear1 + "-" + tempMonth1 + "-" + tempDate1;

            jsonToPass.FilterCriteria.MonthsExperience.Minimum = parseInt(passedJsonData.minExp) * 12;
            jsonToPass.FilterCriteria.MonthsExperience.Maximum = parseInt(passedJsonData.maxExp) * 12;


            jsonToPass.FilterCriteria.MonthsManagementExperience.Minimum = Number(passedJsonData.minManExp) * 12;
            jsonToPass.FilterCriteria.MonthsManagementExperience.Maximum = Number(passedJsonData.maxManExp) * 12;

            for (let i = 0; i < passedJsonData.skills.length; i++) {
                if (passedJsonData.skills[i].skillName !== '') {
                    jsonToPass.FilterCriteria.Skills.push({
                        "SkillName": passedJsonData.skills[i].skillName,
                        "ExperienceLevel": (passedJsonData.skills[i].experLevel) ? passedJsonData.skills[i].experLevel : "",
                        "IsCurrent": (passedJsonData.skills[i].recentUse) ? true : false
                    })
                    skillsTemp.push(passedJsonData.skills[i].skillName);



                }
            }
            jsonToPass.FilterCriteria.SkillsMustAllExist = (passedJsonData.allSkills === "must") ? true : false;
            jsonToPass.FilterCriteria.SearchExpression = passedJsonData.keywords ? passedJsonData.keywords.replace(/["]/g, "\"") : '';

            if (!Array.isArray(passedJsonData.languageSpoken)) {
                passedJsonData.languageSpoken = (passedJsonData.languageSpoken) ? passedJsonData.languageSpoken.split(',') : [];
            }
            let spokenLang = [];
            for (let i = 0; i < passedJsonData.languageSpoken.length; i++) {
                if (passedJsonData.languageSpoken[i]) {
                    spokenLang.push(passedJsonData.languageSpoken[i])
                }
            }
            jsonToPass.FilterCriteria.LanguagesKnown = passedJsonData.languageSpoken;

            if (passedJsonData.workAuthorization.title) {
                jsonToPass.FilterCriteria.CustomValueIds.push(passedJsonData.workAuthorization.title);
            }

            jsonToPass.FilterCriteria.CustomValueIdsMustAllExist = passedJsonData.workAuthorization.required;

            let certiTemp = [];
            for (let i = 0; i < passedJsonData.certifications.length; i++) {
                if (passedJsonData.certifications[i].certificationName) {
                    certiTemp.push(passedJsonData.certifications[i].certificationName)



                }
            }
            jsonToPass.FilterCriteria.Certifications = certiTemp.filter((value, index, array) => array.indexOf(value) === index);
            let getZip: any = {};
            if (passedJsonData.location.zipCode) {
                getZip = await getZipcode(passedJsonData.location.zipCode);



                let lat = (getZip.Latitude) ? getZip.Latitude : 0;
                let long = (getZip.Longitude) ? getZip.Longitude : 0;


                jsonToPass.FilterCriteria.LocationCriteria = {
                    "Locations": [{
                        "CountryCode": "",
                        "Region": '',
                        "Municipality": "",
                        "PostalCode": passedJsonData.location.zipCode,
                        "GeoPoint": {
                            "Latitude": lat,
                            "Longitude": long
                        }
                    }],
                    "Distance": (passedJsonData.location.radius) ? passedJsonData.location.radius : 0,
                    "DistanceUnit": "Miles",
                    "GeocodeProvider": "Google",
                    "GeocodeProviderKey": import.meta.env.VITE_GEOCODEPROVIDERKEY
                }
            } else {
                if (!Array.isArray(passedJsonData.location.state)) {
                    passedJsonData.location.state = (passedJsonData.location.state) ? passedJsonData.location.state.split(',') : [];
                }
                jsonToPass.FilterCriteria.LocationCriteria = {
                    "Locations": [{
                        "CountryCode": "",
                        "Region": (passedJsonData.location.state.length) ? passedJsonData.location.state[0] : '',
                        "Municipality": "",
                        "PostalCode": "",
                        "GeoPoint": {
                            "Latitude": 0,
                            "Longitude": 0
                        }
                    }],
                    "Distance": 0,
                    "DistanceUnit": "Miles",
                    "GeocodeProvider": "Google",
                    "GeocodeProviderKey": import.meta.env.VITE_GEOCODEPROVIDERKEY
                }
                for (let locai = 0; locai < passedJsonData.location.state.length; locai++) {
                    if (locai) {
                        jsonToPass.FilterCriteria.LocationCriteria.Locations.push({
                            "CountryCode": "",
                            "Region": passedJsonData.location.state[locai],
                            "Municipality": "",
                            "PostalCode": "",
                            "GeoPoint": {
                                "Latitude": 0,
                                "Longitude": 0
                            }
                        })
                    }

                }
            }
            let degreeTypesTemp = [];
            for (let i = 0; i < passedJsonData.degrees.length; i++) {
                if (passedJsonData.degrees[i].degreeName) {
                    degreeTypesTemp.push(passedJsonData.degrees[i].degreeName.val())

                }
            }
            jsonToPass.FilterCriteria.DegreeTypes = passedJsonData.degTypes;
            jsonToPass.FilterCriteria.IsTopStudent = passedJsonData.IsTopStudent;
            jsonToPass.FilterCriteria.IsCurrentStudent = passedJsonData.IsCurrentStudent;
            jsonToPass.FilterCriteria.IsRecentGraduate = passedJsonData.IsRecentGraduate;

            let schoolNamesTemp = [];
            for (let i = 0; i < passedJsonData.schools.length; i++) {
                if (passedJsonData.schools[i].schoolName) {
                    schoolNamesTemp.push(passedJsonData.schools[i].schoolName)
                }
            }
            jsonToPass.FilterCriteria.SchoolNames = schoolNamesTemp.filter((value, index, array) => array.indexOf(value) === index);

            let degreeNamesTemp = [];
            for (let i = 0; i < passedJsonData.degrees.length; i++) {
                if (passedJsonData.degrees[i].degreeName) {
                    degreeNamesTemp.push(passedJsonData.degrees[i].degreeName)
                }
            }
            jsonToPass.FilterCriteria.DegreeNames = degreeNamesTemp.filter((value, index, array) => array.indexOf(value) === index);

            let empNamesTemp: string[] = [];
            for (let i = 0; i < passedJsonData.employer.length; i++) {
                if (passedJsonData.employer[i].employerName) {
                    empNamesTemp.push(passedJsonData.employer[i].employerName)
                }
            }
            jsonToPass.FilterCriteria.Employers = empNamesTemp.filter((value, index, array) => array.indexOf(value) === index);

            let taxoTemp = [];
            for (let i = 0; i < passedJsonData.industries.length; i++) {
                if (passedJsonData.industries[i].indcate) {
                    if (passedJsonData.industries[i].subCat !== '')
                        taxoTemp.push(passedJsonData.industries[i].subCat)
                    else
                        taxoTemp.push(passedJsonData.industries[i].indcate)
                }

            }
            jsonToPass.FilterCriteria.Taxonomies = taxoTemp.filter((value, index, array) => array.indexOf(value) === index);
            jsonToPass.ParsedDocument = (passedJsonData.parsedDocument) ? passedJsonData.parsedDocument : "";

            if (passedJsonData.parsedDocument) {
                passedJsonData.CategoryWeights = [
                    {
                        "Category": "JOB_TITLES",
                        "Weight": 0.45
                    },
                    {
                        "Category": "SKILLS",
                        "Weight": 0.45
                    },
                    {
                        "Category": "EDUCATION",
                        "Weight": 0.1
                    }
                ];
            } else {
                passedJsonData.CategoryWeights = [];
            }

            // if (num === 0 && count) {
            //     loadCount(jsonToPass, passedJsonData.talentPoolId);
            // }
            if (tabValue === "Talent Pool") {
                jsonToPass.IndexIdsToSearchInto = [
                    "talentpool"
                ]
                jsonToPass.FilterCriteria.CustomValueIds = [];
                jsonToPass.FilterCriteria.CustomValueIdsMustAllExist = false;
            }
            if (passedJsonData.talentPoolId) {
                jsonToPass.IndexIdsToSearchInto = [
                    "talentpool"
                ]
                if (jsonToPass.FilterCriteria.CustomValueIds.length) {
                    jsonToPass.FilterCriteria.CustomValueIds.push("poolid_" + passedJsonData.talentPoolId);
                } else {
                    jsonToPass.FilterCriteria.CustomValueIds = ["poolid_" + passedJsonData.talentPoolId]
                }
            }

            jsonToPass.FilterCriteria.CustomValueIds = jsonToPass.FilterCriteria.CustomValueIds.filter((val: string, i: number, array: String[]) => array.indexOf(val) === i);

            // console.log(jsonToPass);



            const params = new URLSearchParams();

            params.append("jobid", selectedJob.id);
            params.append("json", JSON.stringify(jsonToPass));
            params.append("client_subs", '0');
            params.append("csninja", '0');
            params.append("page", "" + num);
            params.append("type", "" + tabValue);

            setDataLoading(true);
            trackPromise(


                ApiService.postWithData(171, (jsonToPass.ParsedDocument && jsonToPass.ParsedDocument.trim()) ? 'sovren_results_community_aimatch.jsp' : 'sovren_results_community.jsp', params)
                    .then(
                        (result: any) => {
                            setDataLoading(false);
                            let tempData = result.data.data;

                            if (result.data && result.data.data && result.data.total && Number(result.data.total)) {
                                setRowCount(Number((result.data.total) ? result.data.total : 0))
                                for (let al = 0; al < tempData.length; al++) {
                                    tempData[al].notInvited = false;
                                }
                                setApplicantsData(tempData)
                            }
                            else {
                                setRowCount(0);
                                setApplicantsData([]);
                            }
                        })
            );
        }
    }


    const getZipcode = (zipCode: string) => {

        return new Promise((resolve, reject) => {

            ApiService.postWithData(193, "Curately/Sovren/get_Longitude_Latitude.jsp", {
                zipcode: zipCode
            }).then(
                (response: any) => {
                    resolve(response);
                });
        })
    }


    useEffect(() => {
        buildJson(pagination.pageIndex, pagination.pageSize, mainJsonData, true);
    }, [pagination.pageIndex, pagination.pageSize]);


    return (
        <div id="communityCandidates" className="findCandidate pt-3">
            <Stack
                direction="row"
                className="customCard px-4 py-2"
                justifyContent="space-between"
                alignItems="center"
                sx={{ minHeight: 'auto !important' }}
            >
                <Typography variant="h6" className="header">
                    Talent Pool
                </Typography>
                {/* <Grid className='fs-14 fw-5 c-blue' sx={{ cursor: 'pointer' }}>
                    {selectedJob.title}
                </Grid> */}
            </Stack>
            <Grid container spacing={0} className="customCard p-0 filterExpand-grid mb-0">
                <Grid sx={{ width: filtersExpand ? 'calc(100%)' : 'calc(100% - 310px)' }}>
                    <div className={`MRTableCustom ${filtersExpand ? 'pl-0' : ''}`}>

                        <Grid
                            container
                            className="actionItems"
                            sx={{ width: '90% !important' }}
                        >
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
                                    <Box component="span">{applicantsData.length}</Box>)
                                </MenuItem>
                                <MenuItem
                                    disableRipple
                                    onClick={() => selectAllMenuItemClicked("clear")}
                                >
                                    Clear Selection
                                </MenuItem>
                            </Menu>

                            <Button
                                color="secondary"
                                className='mr-2'
                                disabled={Object.keys(rowSelection).length > 0 ? false : true}
                                onClick={() => setAddEmail(true)}
                                startIcon={<MailOutlineOutlinedIcon />}
                            >
                                Email
                            </Button>
                            <Button
                                color="secondary"
                                className='mr-2'
                                onClick={() => setOpenSequenceModal(true)}
                                disabled={Object.keys(rowSelection).length > 0 ? false : true}
                                startIcon={<SendOutlinedIcon />}
                            >
                                Sequence
                            </Button>
                            <Button
                                id="add-list-btn"
                                aria-controls={openAddToListenBtn ? "addlistmenu" : undefined}
                                aria-haspopup="true"
                                aria-expanded={openAddToListenBtn ? 'true' : undefined}
                                onClick={handleClickAddToListen}
                                startIcon={<PlaylistAddOutlinedIcon />}
                                disableRipple
                                color="secondary"
                                className='mr-2'
                                disabled={Object.keys(rowSelection).length > 0 ? false : true}
                                endIcon={<ArrowDropDownIcon />}
                            >
                                Pool
                            </Button>
                            <Menu
                                id="addlistmenu"
                                anchorEl={addtolistanchorEl}
                                open={openAddToListenBtn}
                                onClose={handleProfileMenuClose}
                                MenuListProps={{
                                    'aria-labelledby': 'add-list-btn',
                                }}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "center"
                                }}
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "center"
                                }}
                                PaperProps={{
                                    style: { overflow: "visible" }
                                }}

                                sx={{
                                    boxShadow: '0px',
                                    '& .MuiList-root.MuiMenu-list': {
                                        pt: '8px',
                                        pb: '15px',
                                        pr: '10px',
                                        pl: '10px'
                                    }
                                }}
                            >


                                <Autocomplete
                                    disablePortal
                                    disableClearable

                                    id="combo-box-demo"
                                    options={distributionList.map((option: any) => option.name)}
                                    sx={{
                                        width: '259px',
                                        height: '30px',
                                        '& .MuiOutlinedInput-root': {
                                            p: 0
                                        },
                                        '& .MuiAutocomplete-popupIndicator': {
                                            transform: "unset",
                                            color: "#737373",
                                            '& .MuiTouchRipple-root': {
                                                display: 'none',
                                            },
                                            '&:hover': {
                                                backgroundColor: '#ffffff'
                                            }
                                        },
                                    }}
                                    PaperComponent={({ children }) => (
                                        <Paper style={{
                                            minWidth: '274px',
                                            left: '50%',
                                            transform: 'translateX(-3.7%)',

                                            height: 'auto',
                                            overflow: 'hidden',
                                            paddingRight: '5px',
                                        }}>{children}</Paper>
                                    )}

                                    renderOption={(props, option: any) => (
                                        <li {...props}
                                            style={{
                                                color: '#1A1A1A',
                                                fontSize: '14px',
                                                fontWeight: 600,
                                                fontFamily: 'Segoe UI',
                                                marginLeft: '10px',
                                                marginRight: '10px'
                                            }}
                                            onMouseEnter={(e: any) => {
                                                e.target.style.backgroundColor = '#F7F7F7';
                                            }}
                                            onMouseLeave={(e: any) => {
                                                e.target.style.backgroundColor = 'unset';
                                            }}
                                            key={option}
                                        >{option}</li>
                                    )}
                                    renderInput={(params) => <TextField {...params} placeholder="Select / Type to create list"
                                        sx={{
                                            '& .MuiInputBase-input.MuiOutlinedInput-input': {
                                                color: '#1A1A1A',
                                                fontSize: '14px',
                                                fontWeight: 600,
                                                fontFamily: 'Segoe UI',
                                            },
                                            '& .MuiInputBase-input::placeholder': {
                                                color: '#919191',
                                                fontSize: '14px',
                                                fontWeight: 600,
                                                fontFamily: 'Segoe UI',
                                                opacity: 1,
                                            },
                                            '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                                borderColor: 'var(--c-primary-color)',
                                            },
                                            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: 'var(--c-secondary-color)',
                                                borderWidth: '1px'
                                            },
                                        }}
                                    />}
                                />
                            </Menu>
                        </Grid>

                        <MaterialReactTable
                            columns={columns}
                            enableRowSelection
                            data={applicantsData}
                            onRowSelectionChange={setRowSelection} //connect internal row selection state to your own
                            state={{ rowSelection, pagination, sorting, isLoading: dataLoading }} //pass our managed row selection state to the table to use
                            enablePinning
                            initialState={
                                {
                                    columnPinning: { left: ['mrt-row-select','name'] },
                                    density: 'compact',
                                    showGlobalFilter: false,
                                }
                            }
                            enableDensityToggle={false}
                            enableFullScreenToggle={false}
                            manualPagination
                            manualSorting
                            onSortingChange={setSorting}
                            enableGlobalFilterModes
                            columnResizeMode="onChange"
                            onPaginationChange={setPagination}
                            getRowId={(row) => row.candId}
                            icons={{
                                ArrowDownwardIcon: (props: any) => <SwitchLeftIcon  {...props} />
                            }}
                            rowCount={rowCount}
                            enableStickyHeader
                        />
                        {
                            (openAddCandidateModal) ?
                                <EditCandidate
                                    open={openAddCandidateModal}
                                    closePopup={() => setOpenAddCandidateModal(false)}
                                    candidateData={candidateData}
                                />
                                :
                                null
                        }
                    </div>
                </Grid>

            </Grid>

            <Menu
                id={`mail-${menuData.rowId}`}
                anchorEl={TableMailOpen}
                open={openTableMail && (selectedRowId === `${menuData.rowId}`)}
                onClose={handleTableClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
                MenuListProps={{
                    "aria-labelledby": `mailbutton-${menuData.rowId}`,
                }}
                sx={{
                    "& .MuiPaper-root.MuiMenu-paper.MuiPopover-paper":
                    {
                        minWidth: "250px",
                    },
                }}
            >
                <Stack sx={{ p: 1.5 }}>
                    <Stack
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            mb: 0.5,
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "16px",
                                fontFamily: "Segoe UI",
                                fontWeight: 600,
                                color: "#1A1A1A",
                            }}
                        >
                            {menuData.email}
                        </Typography>
                        <ContentCopyRoundedIcon
                            onClick={() => handleShowSnack(`${menuData.rowId}`)}
                            sx={{
                                color: "#737373",
                                fontSize: "20px",
                                pl: 0.5,
                                cursor: "pointer",
                            }}
                        />
                    </Stack>

                    <Typography
                        sx={{
                            fontSize: "14px",
                            fontFamily: "Segoe UI",
                            fontWeight: 600,
                            color: "#1DB268",
                            mb: 0.5,
                        }}
                    >
                        Email is Verified
                    </Typography>

                    <Stack
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            mb: 0.5,
                        }}
                        direction="row"
                        spacing={1}
                    >
                        <Typography
                            sx={{
                                fontSize: "14px",
                                fontFamily: "Segoe UI",
                                fontWeight: 400,
                                color: "#1A1A1A",
                            }}
                        >
                            Business
                        </Typography>

                        <Box
                            sx={{
                                height: "6px",
                                width: "6px",
                                backgroundColor: "#cacccc",
                                borderRadius: "50%",
                            }}
                        ></Box>

                        <Typography
                            sx={{
                                fontSize: "14px",
                                fontFamily: "Segoe UI",
                                fontWeight: 400,
                                color: "#1A1A1A",
                            }}
                        >
                            Primary
                        </Typography>
                    </Stack>

                    <Stack
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >

                        <Button
                            variant="outlined"
                            id={menuData.email}
                            disableRipple
                            onClick={() => { handleTableMenuSendMailOpen(menuData.email); }}
                            sx={{
                                width: "40%",
                                whiteSpace: "nowrap",
                                textTransform: "capitalize",
                                color: "#1A1A1A",
                                borderColor: "var(--c-secondary-color)",
                                fontSize: "14px",
                                fontFamily: "Segoe UI",
                                fontWeight: "700",
                                "&:hover": {
                                    color: "var(--c-primary-color)",
                                    backgroundColor: "#ffffff",
                                    borderColor: "var(--c-primary-color)",
                                    boxShadow: 0,
                                },
                            }}
                        >
                            Send Email
                        </Button>
                    </Stack>
                </Stack>
            </Menu>

            {dialogStatus && <EmailDialogBox
                dialogOpen={dialogStatus}
                onClose={() => setDialogStatus(false)}
                name={menuData.first.toLowerCase()}
                emailId={emailOnClicked}
                candidateId={menuData.candId}
                jobId={menuData.jobId}
            />

            }

            <Menu
                id={`phone-${menuData.rowId}`}
                anchorEl={TableCallOpen}
                open={openTableCall && selectedRowId === `${menuData.rowId}`}
                onClose={handleTableClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
                MenuListProps={{
                    "aria-labelledby": `phonebutton-${menuData.rowId}`,
                }}
                sx={{
                    "& .MuiPaper-root.MuiMenu-paper.MuiPopover-paper":
                    {
                        minWidth: "250px",
                    },
                }}
            >
                <Stack sx={{ mb: 1, p: 1 }}>
                    <Typography
                        sx={{
                            fontSize: "12px",
                            fontFamily: "Segoe UI",
                            fontWeight: 400,
                            color: "#1A1A1A",
                        }}
                    >
                        HQ Number
                    </Typography>
                    <Box
                        component="div"
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            mb: 1.5,
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "14px",
                                fontFamily: "Segoe UI",
                                fontWeight: 600,
                                color: "#1A1A1A",
                            }}
                        >
                            {menuData.phone ? `${menuData.phone}` : ''}
                        </Typography>
                        <ContentCopyRoundedIcon
                            sx={{
                                color: "#737373",
                                fontSize: "20px",
                                pl: 0.5,
                                cursor: "pointer",
                            }}
                            onClick={() => handleShowCallSnack(`${menuData.rowId}`)}
                        />
                    </Box>

                    {!userLocalData.isChromeExtensionEnabled() ? <Button
                        variant="contained"
                        disableRipple
                        onClick={() => {
                            setPhoneOnClicked(menuData.phone);
                            setDialogPhoneStatus(true);
                            setTableOpenCall(null);
                        }}
                        sx={{
                            textTransform: "capitalize",
                            backgroundColor: "var(--c-primary-color)",
                            fontWeight: 700,
                            fontSize: "14px",
                            fontFamily: "Segoe UI",
                            color: "#ffffff",
                            height: "32px",
                            width: "45%",
                            whiteSpace: "nowrap",
                            boxShadow: "0",
                            "&:hover": {
                                backgroundColor: "#0852C2",
                                color: "#ffffff",
                                boxShadow: "0",
                            },
                        }}
                        startIcon={<CallOutlinedIcon />}
                    >
                        SMS
                    </Button> : null
                    }
                </Stack>

            </Menu>

            {
                dialogPhoneStatus ?
                    <PhoneDialog
                        dialogOpen={dialogPhoneStatus}
                        onClose={() => setDialogPhoneStatus(false)}
                        name={menuData.first.toLowerCase()}
                        toPhone={phoneOnClicked}
                        candidateId={menuData.candId}
                        jobId={menuData.jobId}
                    />
                    :
                    null
            }

            {
                (openSequenceModal) ?
                    <Sequence
                        open={openSequenceModal}
                        closePopup={() => setOpenSequenceModal(false)}
                    />
                    :
                    null
            }

            {addEmail && <EmailDialogBox
                dialogOpen={addEmail}
                onClose={() => setAddEmail(false)}
                name={""}
                emailId={""}
            />}

            <Menu
                id={`list-${menuData.rowId}`}
                anchorEl={TableListOpen}
                open={openTableList && selectedRowId === `${menuData.rowId}`}
                onClose={handleTableClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
                MenuListProps={{
                    "aria-labelledby": `listbutton-${menuData.rowId}`,
                }}
                sx={{
                    "& .MuiPaper-root.MuiMenu-paper.MuiPopover-paper":
                    {
                        minWidth: "250px",
                    },
                }}
            >
                <Stack sx={{ mb: 1, p: 1 }}>
                    <Typography
                        sx={{
                            fontSize: "12px",
                            fontFamily: "Segoe UI",
                            fontWeight: 400,
                            color: "#1A1A1A",
                        }}
                    >
                        {menuData.first ? `${menuData.first} is in lists` : ''}
                    </Typography>
                    <Box
                        component="div"
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            mb: 1.5,
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "14px",
                                fontFamily: "Segoe UI",
                                fontWeight: 600,
                                color: "#1A1A1A",
                            }}
                        >
                            {menuData.first ? `${menuData.first} is in any lists` : `${menuData.first} isn't in any lists`}
                        </Typography>

                    </Box>

                    <Button
                        variant="contained"
                        disableRipple
                        onClick={() => {


                            setTableOpenList(null);
                        }}
                        sx={{
                            textTransform: "capitalize",
                            backgroundColor: "var(--c-primary-color)",
                            fontWeight: 700,
                            fontSize: "14px",
                            fontFamily: "Segoe UI",
                            color: "#ffffff",
                            height: "32px",
                            width: "45%",
                            whiteSpace: "nowrap",
                            boxShadow: "0",
                            "&:hover": {
                                backgroundColor: "#0852C2",
                                color: "#ffffff",
                                boxShadow: "0",
                            },
                        }}
                        startIcon={<PlaylistAddOutlinedIcon />}
                    >
                        Add to List
                    </Button>
                </Stack>

            </Menu>


            <Menu
                id={`sequence-${menuData.rowId}`}
                anchorEl={TableSequenceOpen}
                open={openTableSequence && selectedRowId === `${menuData.rowId}`}
                onClose={handleTableClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
                MenuListProps={{
                    "aria-labelledby": `sequencebutton-${menuData.rowId}`,
                }}
                sx={{
                    "& .MuiPaper-root.MuiMenu-paper.MuiPopover-paper":
                    {
                        minWidth: "250px",
                        maxWidth: "350px",
                    },
                }}
            >
                <Stack sx={{ mb: 1, p: 1 }}>
                    <Typography
                        sx={{
                            fontSize: "12px",
                            fontFamily: "Segoe UI",
                            fontWeight: 400,
                            color: "#1A1A1A",
                        }}
                    >
                        Add contact to a sequence


                    </Typography>
                    <Box
                        component="div"
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            mb: 1.5,
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "14px",
                                fontFamily: "Segoe UI",
                                fontWeight: 600,
                                color: "#1A1A1A",
                            }}
                        >
                            You are one click away from an automated email workflow to get more open rates and meetings
                        </Typography>

                    </Box>

                    <Button
                        variant="contained"
                        disableRipple
                        onClick={() => {



                            setOpenSequenceModal(true)
                        }}
                        sx={{
                            textTransform: "capitalize",
                            backgroundColor: "var(--c-primary-color)",
                            fontWeight: 700,
                            fontSize: "14px",
                            fontFamily: "Segoe UI",
                            color: "#ffffff",
                            height: "32px",

                            whiteSpace: "nowrap",
                            boxShadow: "0",
                            "&:hover": {
                                backgroundColor: "#0852C2",
                                color: "#ffffff",
                                boxShadow: "0",
                            },
                        }}
                        startIcon={<SendOutlinedIcon />}
                    >
                        Create New Sequence
                    </Button>
                </Stack>

            </Menu>

            <Menu
                id="addtelegrammenu"
                anchorEl={TableTelegramOpen}
                open={openTableTelegram}
                onClose={handleTableClose}
                MenuListProps={{
                    'aria-labelledby': 'add-telegram-btn',
                }}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center"
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center"
                }}
                PaperProps={{
                    style: { overflow: "visible" }
                }}

                sx={{
                    boxShadow: '0px',
                    '& .MuiList-root.MuiMenu-list': {
                        pt: '4px',
                        pb: '10px',
                        pr: '5px',
                        pl: '5px'
                    }
                }}
            >
                <MenuItem onClick={handleTableClose}>Invite to Community</MenuItem>
                <MenuItem onClick={handleTableClose}>Invite to  Job</MenuItem>
            </Menu>
        </div>
    );
}
export default ViewPool;