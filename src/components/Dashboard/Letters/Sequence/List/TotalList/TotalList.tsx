// import { useEffect, useMemo, useRef, useState } from 'react';
// import { Close } from '@mui/icons-material';

// import { DialogContent, Box, IconButton, DialogTitle } from '@mui/material';
// // import { DataGrid, GridColDef } from '@mui/x-data-grid';
// import Dialog from '@mui/material/Dialog';
// //import { Button } from '../../../../../../shared/modules/commonImports';

// import { create } from 'zustand';

// import './TotalList.scss';
// // import { DateTime } from 'luxon';
// import { trackPromise } from 'react-promise-tracker';
// import ApiService from '../../../../../../shared/api/api';
// import { userLocalData } from '../../../../../../shared/services/userData';

// import SwitchLeftIcon from "@mui/icons-material/SwitchLeft";

// import {
//     MaterialReactTable,
//     type MRT_ColumnDef,
//     // type MRT_SortingState,
// } from "material-react-table";
// //import { globalData } from '../../../../../../shared/services/globalData';
// import CustomPagination from '../../../../../shared/CustomPagination/CustomPagination';
// import ViewCandidateModal from '../../../../Candidate/ViewCandidate/ViewCandidateModal';
// import { useParams } from 'react-router-dom';

// type TotalListStore = {
//     id: string;
//     type: string;
//     candidateOrContact: string;
//     onSubmit?: () => void;
//     close?: () => void;
// };

// const useTotalListStore = create<TotalListStore>((set) => ({
//     id: '',
//     type: '',
//     candidateOrContact: '',
//     onSubmit: undefined,
//     close: () => set({ onSubmit: undefined }),
// }));


// export const totalListDialog = (id: string, type: string, candidateOrContact: string, onSubmit: () => void) => {
//     useTotalListStore.setState({
//         id,
//         type,
//         candidateOrContact,
//         onSubmit
//     });
// };

// export const TotalListDialog = () => {
//     //   const c = useStyles();
//     const { id, type, candidateOrContact, onSubmit, close} = useTotalListStore();
//     const [listCandidates, setListCandidates] = useState<any[] | never[]>([]);
//     //console.log(candidateOrContact)
//     // "CandidateID": 8990090,
//     // "CandidateName": "Testqa 032",
//     // "Email": "sallysmithova@gmail.com",
//     // "Phone": "",
//     // "CreatedDate": "2022-12-06 07:12:07.0"
//     const { jobId } = useParams();

//     const [viewCandidate, setViewCandidate] = useState(false);
//     const viewCandidateId = useRef("");
//     const openUserView = (id: string, candidateOrContact: string) => {
//         // if (candidateOrContact === 'candidate') {
//         //     window.open(globalData.getWindowLocation() + "candidate/view/" + id.trim() + "/");
//         // }
//         // else if (candidateOrContact === 'contact') {
//         //     window.open(globalData.getWindowLocation() + "contact/view/" + id.trim() + "/");
//         // }
//         viewCandidateId.current = id
//         setViewCandidate(true)



//     }

//     const columns: MRT_ColumnDef<any>[] = [
//         // {
//         //     accessorKey: 'id',
//         //     header: 'ID',
//         //     width: 80,
//         //     filterable: false,
//         //     sortable: false,
//         // },
//         {
//             accessorKey: 'firstName',
//             header: 'Name',
//             Cell: ({ renderedCellValue, row }) => (
//                 <span className="hightLightTd" onClick={() => openUserView(row.original.userId + "", '')} >{row.original.firstName + " " + row.original.lastName}</span>
//                 // {row.original.candName.toLowerCase()}
//             ),

//         },
//         {
//             accessorKey: 'phone',
//             header: 'Phone',
//         },
//         {
//             accessorKey: 'email',
//             header: 'Email',
//         },
//         // {
//         //     accessorKey: 'phone',
//         //     header: 'Phone'
//         // }
//         // {
//         //     accessorKey: 'CreatedDate',
//         //     header: 'Created Date',
//         //     flex: 1,
//         //     align: 'center',
//         //     headerAlign: 'center',
//         //     Cell: ({ renderedCellValue, row }) =>
//         //         <span>
//         //             {DateTime.fromSQL(row.original.CreatedDate.substring(0, 10)).toFormat('dd/MM/yyyy')}
//         //         </span>
//         //     ),
//         //     editable: false,
//         // }
//     ];


//     useEffect(() => {
//         setPagination(prev => ({
//             ...prev,
//             pageIndex: 0
//           }));
//         if (id) {
//             getUserList();
//         }
//     }, [id]);


//     const getUserList = () => {
//         // https://www4.accuick.com/Accuick_API/Curately/Sequence/sequence_users_list.jsp?sequenceId=10&clientId=2&type=finished
//         if ((candidateOrContact === 'candidate')) {
//             trackPromise(
//                 ApiService.postWithData('admin', 'getSequenceUsersList', {
//                     sequenceId: id,
//                     clientId: userLocalData.getvalue('clientId'),
//                     type: type
//                 }).then((response: any) => {

//                     console.log(response.data.list);
//                     if (response.data.Success) {
//                         let tempSequenceList = [...response.data.list];
//                         for (let sl = 0; sl < tempSequenceList.length; sl++) {
//                             tempSequenceList[sl].id = sl + 1;
//                             tempSequenceList[sl].actions = "";
//                         }
//                         setListCandidates(tempSequenceList);
//                     } else {

//                     }
//                 })
//             );
//         }
//         else if (candidateOrContact === 'contact') {
//             //http://35.155.202.216:8080/QADemoCurately/getSequenceContactUserList
//             trackPromise(
//                 ApiService.postWithData('admin', 'getSequenceContactUserList', {
//                     sequenceId: id,
//                     clientId: userLocalData.getvalue('clientId'),
//                     type: " "
//                 }).then((response: any) => {

//                     // console.log(response.data);
//                     if (response.data.Success) {
//                         let tempSequenceList = [...response.data.List];
//                         for (let sl = 0; sl < tempSequenceList.length; sl++) {
//                             tempSequenceList[sl].id = sl + 1;
//                             tempSequenceList[sl].actions = "";
//                         }
//                         setListCandidates(tempSequenceList);
//                     } else {

//                     }
//                 })
//             );
//         }
//     }

//     const [pagination, setPagination] = useState({
//         pageIndex: 0,
//         pageSize: 5,
//     });

//     const paginatedData = useMemo(() => {
//         const start = pagination.pageIndex * pagination.pageSize;
//         const end = start + pagination.pageSize;
//         return listCandidates.slice(start, end);
//     }, [listCandidates, pagination.pageIndex, pagination.pageSize]);
//     const closeViewCandidateModal = () => {
//         setViewCandidate(false);
//     };




//     return (
//         <div>
//             {viewCandidate && (
//                 <ViewCandidateModal
//                     candidateId={viewCandidateId.current}
//                     closePopup={closeViewCandidateModal}
//                     jobId={jobId || ""}
//                     open={viewCandidate}
//                 />
//             )}
//         <Dialog open={Boolean(onSubmit)} onClose={close} maxWidth="md" fullWidth id="TotalList">
//             <Box display="flex" justifyContent="space-between" alignItems="center" className='TotalList'>
//                 <DialogTitle p={1.75}>Assigned Candidates List</DialogTitle>
//                 <IconButton onClick={close}>
//                     <Close />
//                 </IconButton>
//             </Box>
//             <DialogContent>
//                 <div>
//                     <div className="MRTableCustom pl-0" >
//                         <MaterialReactTable
//                             columns={columns}
//                             // enableRowSelection
//                             data={paginatedData}
//                             enablePinning
//                             initialState={{
//                                 columnPinning: { left: ["mrt-row-select"] },
//                                 density: "compact",
//                                 showGlobalFilter: true
//                             }}
//                             enableDensityToggle={false}
//                             enableFullScreenToggle={false}
//                             // manualPagination
//                             // manualSorting
//                             enableGlobalFilterModes
//                             columnResizeMode="onChange"
//                             getRowId={row => row.userId}
//                             //onPaginationChange={setPagination}
//                             enableStickyHeader
//                             enablePagination={false}
//                             icons={{
//                                 ArrowDownwardIcon: (props: any) => (
//                                 <SwitchLeftIcon {...props} />
//                                 ),
//                             }}
//                             state={{
//                                 pagination,
//                             }}
//                             renderBottomToolbarCustomActions={() => (
//                             <CustomPagination
//                                 page={pagination.pageIndex}
//                                 rowsPerPage={pagination.pageSize}
//                                 rowCount={listCandidates.length}
//                                 //showCount={true}
//                                 onChangePage={(page: any) =>
//                                 setPagination({
//                                     ...pagination,
//                                     pageIndex: page,
//                                     pageSize: pagination.pageSize,
//                                     })
//                                 }
//                             />
//                                         )}
//                         />
//                    </div>
//                 </div>




//             </DialogContent>
//             {/* <DialogActions>
//                 <Button color="secondary" variant="outlined" onClick={close}>
//                     Close
//                 </Button>
//             </DialogActions> */}
//         </Dialog>
//         </div>
//     );
// };
import { useEffect, useMemo, useRef, useState } from '../../../../../../shared/modules/React';
import { Close } from '@mui/icons-material';
import { Box } from '../../../../../../shared/modules/MaterialImports/Box';
import { IconButton } from '../../../../../../shared/modules/MaterialImports/Button';
import { Dialog, DialogTitle, DialogContent } from '../../../../../../shared/modules/MaterialImports/Dialog';
import { create } from 'zustand';
import './TotalList.scss';
import { trackPromise } from '../../../../../../shared/modules/PromiseTrackter';
import ApiService from '../../../../../../shared/api/api';
import { userLocalData } from '../../../../../../shared/services/userData';
import SwitchLeftIcon from "@mui/icons-material/SwitchLeft";
import {
    MaterialReactTable,
    type MRT_ColumnDef,
} from "../../../../../../shared/modules/MaterialReactTable";
import CustomPagination from '../../../../../shared/CustomPagination/CustomPagination';
import ViewCandidateModal from '../../../../Candidate/ViewCandidate/ViewCandidateModal';
import { useParams } from 'react-router-dom';
import ViewContactModal from '../../../../Contacts/View/ViewContactModal';
import { InputAdornment } from '../../../../../../shared/modules/commonImports';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import CloseRounded from '@mui/icons-material/CloseRounded';

type TotalListStore = {
    id: string;
    type: string;
    candidateOrContact: string;
    onSubmit?: () => void;
    close?: () => void;
};

const useTotalListStore = create<TotalListStore>((set) => ({
    id: '',
    type: '',
    candidateOrContact: '',
    onSubmit: undefined,
    close: () => set({ onSubmit: undefined, id: "", type: "", candidateOrContact: "" }),
}));

export const totalListDialog = (id: string, type: string, candidateOrContact: string, onSubmit: () => void) => {
    useTotalListStore.setState({
        id,
        type,
        candidateOrContact,
        onSubmit,
    });
};

export const TotalListDialog = () => {
    const { id, type, candidateOrContact, onSubmit, close } = useTotalListStore();
    const [listCandidates, setListCandidates] = useState<any[] | never[]>([]);
    const { jobId } = useParams();

    const [viewCandidate, setViewCandidate] = useState(false);
    const viewCandidateId = useRef("");
    const viewContactId = useRef("");
    const [searchValue, setSearchValue] = useState("");

    const openUserView = (userId: string) => {
        if (candidateOrContact === 'candidate') {
            viewCandidateId.current = userId;
        } else if (candidateOrContact === 'contact') {
            viewContactId.current = userId;
        } else return null;
        setViewCandidate(true);
    };


    const closeViewCandidateModal = () => {
        setViewCandidate(false);
    };

    const columns: MRT_ColumnDef<any>[] = [
        {
            //accessorKey: 'firstName',
            accessorFn: (row) => `${row.firstName} ${row.lastName}`,
            header: 'Name',
            Cell: ({ row }) => (
                <span className="hightLightTd" onClick={() => openUserView(row.original.userId + "")}>
                    {row.original.firstName + " " + row.original.lastName}
                </span>
            ),
        },
        // {
        //     accessorKey: 'phone',
        //     header: 'Phone',
        // },
        {
            accessorKey: 'email',
            header: 'Email',
        },
    ];

    useEffect(() => {
        setPagination(prev => ({
            ...prev,
            pageIndex: 0,
        }));
        if (id) {
            getUserList();
        }
    }, [id]);

    const getUserList = () => {
        if (candidateOrContact === 'candidate') {
            trackPromise(
                ApiService.postWithData('admin', 'getSequenceUsersList', {
                    sequenceId: id,
                    clientId: userLocalData.getvalue('clientId'),
                    type: type,
                }).then((response: any) => {
                    if (response.data.Success) {
                        let tempSequenceList = [...response.data.list];
                        for (let sl = 0; sl < tempSequenceList.length; sl++) {
                            tempSequenceList[sl].id = sl + 1;
                            tempSequenceList[sl].actions = "";
                        }
                        setListCandidates(tempSequenceList);
                    }
                })
            );
        } else if (candidateOrContact === 'contact') {
            trackPromise(
                ApiService.postWithData('admin', 'getSequenceContactUserList', {
                    sequenceId: id,
                    clientId: userLocalData.getvalue('clientId'),
                    type: type,
                }).then((response: any) => {
                    if (response.data.Success) {
                        let tempSequenceList = [...response.data.List];
                        for (let sl = 0; sl < tempSequenceList.length; sl++) {
                            tempSequenceList[sl].id = sl + 1;
                            tempSequenceList[sl].actions = "";
                        }
                        setListCandidates(tempSequenceList);
                    }
                })
            );
        }
    };

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const paginatedData = useMemo(() => {
        // const start = pagination.pageIndex * pagination.pageSize;
        // const end = start + pagination.pageSize;
        // let slicedData = listCandidates.slice(start, end);
        if (searchValue) {
            const filteredData = listCandidates.filter((each) => {
                return `${each.firstName} ${each.lastName}`.toLowerCase().includes(searchValue.toLowerCase())
            });
            // return filteredData.slice((pagination.pageIndex * pagination.pageSize), ((pagination.pageIndex + 1) * pagination.pageSize));;
            return filteredData;
        } else return listCandidates
        // } else return slicedData;
    }, [listCandidates, searchValue]);
    const rowCount = useMemo(() => paginatedData.length, [paginatedData])
    const candidateIdsList = useMemo(() => paginatedData.map((each) => each.userId), [paginatedData]);
    const contactIdsList = useMemo(() => paginatedData.map((each) => each.userId), [paginatedData]);

    return (
        <div>
            {viewCandidate && (
                candidateOrContact === "candidate" ?
                    <ViewCandidateModal
                        candidateId={viewCandidateId.current}
                        closePopup={closeViewCandidateModal}
                        jobId={jobId || ""}
                        open={viewCandidate}
                        candidateIdsList={candidateIdsList}
                    /> :
                    candidateOrContact === "contact" ?
                        <ViewContactModal
                            open={viewCandidate}
                            closeDrawer={closeViewCandidateModal}
                            contactId={viewContactId.current}
                            contactIdsList={contactIdsList} />
                        : null

            )}
            <Dialog open={Boolean(onSubmit) && !viewCandidate} onClose={close} maxWidth="md" fullWidth id="TotalList">
                <Box display="flex" justifyContent="space-between" alignItems="center" className='TotalList'>
                    <DialogTitle p={1.75}>Assigned {(candidateOrContact === 'contact') ? `Contacts` : `Candidates`} List</DialogTitle>
                    <IconButton onClick={close}>
                        <Close />
                    </IconButton>
                </Box>
                <DialogContent>
                    <div className="MRTableCustom pl-0">
                        <MaterialReactTable
                            columns={columns}
                            data={paginatedData}
                            enablePinning
                            initialState={{
                                columnPinning: { left: ["mrt-row-select"] },
                                density: "compact",
                                showGlobalFilter: true,
                            }}
                            enableDensityToggle={false}
                            enableFullScreenToggle={false}
                            enableGlobalFilterModes
                            columnResizeMode="onChange"
                            getRowId={(row) => row.userId}
                            enableStickyHeader
                            muiPaginationProps={{
                                showFirstButton: false,
                                showLastButton: false,
                                SelectProps: { style: { display: "none" } },
                            }}
                            enablePagination={true}
                            icons={{
                                ArrowDownwardIcon: (props: any) => <SwitchLeftIcon {...props} />,
                            }}
                            state={{ pagination }}
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
                            muiSearchTextFieldProps={{
                                placeholder: `Search ${candidateOrContact === "candidate" ? "Candidates" : "Contacts"}`,
                                value: searchValue,
                                onChange: (e: any) => {
                                    setPagination({ ...pagination, pageIndex: 0 })
                                    setSearchValue(e.target.value)
                                },
                                InputProps: {
                                    startAdornment: <InputAdornment position="start"><SearchOutlined fontSize='small' htmlColor='#757575' /></InputAdornment>,
                                    endAdornment: <InputAdornment position="end" disablePointerEvents={searchValue ? false : true}>
                                        <CloseRounded fontSize='small' htmlColor={searchValue ? "#757575" : "#ebebeb"} sx={{ cursor: "pointer" }} onClick={() => {
                                            setPagination({ ...pagination, pageIndex: 0 })
                                            setSearchValue("")
                                        }} />
                                    </InputAdornment>
                                }
                            }}
                        />
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

