    import { useEffect, useMemo, useRef, useState } from '../../../../../../shared/modules/React';
    import { Close } from '@mui/icons-material';
    import { Box  } from '../../../../../../shared/modules/MaterialImports/Box';
    import { IconButton  } from '../../../../../../shared/modules/MaterialImports/Button';
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
        close: () => set({ onSubmit: undefined }),
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
    
        const openUserView = (id: string, candidateOrContact: string) => {
            viewCandidateId.current = id;
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
                    <span className="hightLightTd" onClick={() => openUserView(row.original.userId + "", '')}>
                        {row.original.firstName + " " + row.original.lastName}
                    </span>
                ),
            },
            {
                accessorKey: 'phone',
                header: 'Phone',
            },
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
            
                trackPromise(
                    ApiService.postWithData('admin', 'getContactsByListId', {
                        clientId: userLocalData.getvalue('clientId'),
                        "listId": id,
                        "fname": "",
                        "lname": "",
                        "email": "",
                        "sort": "modifyDate",
                        "sortby": "desc",
                        "next": 0,
                        "pageSize": 25
                    }).then((response: any) => {
                        if (response.data.Success) {
                            console.log(response.data.contactsList,"response..")
                            let tempSequenceList = [...response.data.contactsList];
                            for (let sl = 0; sl < tempSequenceList.length; sl++) {
                                tempSequenceList[sl].id = sl + 1;
                                tempSequenceList[sl].actions = "";
                            }
                            setListCandidates(tempSequenceList);
                        }
                    })
                );
        
        };
    
        const [pagination, setPagination] = useState({
            pageIndex: 0,
            pageSize: 5,
        });
    
        const paginatedData = useMemo(() => {
            const start = pagination.pageIndex * pagination.pageSize;
            const end = start + pagination.pageSize;
            return listCandidates.slice(start, end);
        }, [listCandidates, pagination.pageIndex, pagination.pageSize]);
        const candidateIdsList = useMemo(() => paginatedData.map((each) => each.userId), [paginatedData])
    
        return (
            <div>
                {viewCandidate && (
                    <ViewCandidateModal
                        candidateId={viewCandidateId.current}
                        closePopup={closeViewCandidateModal}
                        jobId={jobId || ""}
                        open={viewCandidate}
                        candidateIdsList={candidateIdsList}
                    />
                )}
                <Dialog open={Boolean(onSubmit) && !viewCandidate} onClose={close} maxWidth="md" fullWidth id="TotalList">
                    <Box display="flex" justifyContent="space-between" alignItems="center" className='TotalList'>
                        <DialogTitle p={1.75}>Assigned Candidates List</DialogTitle>
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
                                enablePagination={false}
                                icons={{
                                    ArrowDownwardIcon: (props: any) => <SwitchLeftIcon {...props} />,
                                }}
                                state={{ pagination }}
                                renderBottomToolbarCustomActions={() => (
                                    <CustomPagination
                                        page={pagination.pageIndex}
                                        rowsPerPage={pagination.pageSize}
                                        rowCount={listCandidates.length}
                                        onChangePage={(page: any) =>
                                            setPagination({
                                                ...pagination,
                                                pageIndex: page,
                                                pageSize: pagination.pageSize,
                                            })
                                        }
                                    />
                                )}
                            />
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        );
    };
    
