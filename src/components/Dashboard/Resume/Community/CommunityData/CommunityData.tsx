
import CustomPagination from '../../../../shared/CustomPagination/CustomPagination'

import { MaterialReactTable } from '../../../../../shared/modules/MaterialReactTable';
import SwitchLeftIcon from "@mui/icons-material/SwitchLeft";

import ViewCandidateModal from '../../../Candidate/ViewCandidate/ViewCandidateModal';

import ExpandDetails from '../ExpandDetails/ExpandDetails';


import "../Community.scss";
import { userLocalData } from '../../../../../shared/services/userData';
import { ID_SETTINGS_EVALUTE } from '../../../../../shared/services/Permissions/IDs';



const CommunityData = (
    {
        isLayoutFetched,
        columns,
        applicantsData,
        rowSelection,
        pagination,
        sorting,
        columnVisibility,
        customHeadingsList,
        jobIdFromJobPage,
        isSelectAllChecked,
        selectedRowCount,
        rowCount,
        setSorting,
        setRowSelection,
        setSelectedRowCount,
        setPagination,
        openCandidateModal,
        openCandidateId,
        setOpenCandidateModal,
        setOpenCandidateId,
        pinnedColumn,
        columnOrder
    }
        :
        {
            isLayoutFetched: any;
            columns: any;
            applicantsData: any;
            rowSelection: any;
            pagination: any;
            sorting: any;
            columnVisibility: any;
            customHeadingsList: any;
            jobIdFromJobPage: string; isSelectAllChecked: any;
            selectedRowCount: any; rowCount: any;
            setSorting: any;
            setRowSelection: any;
            setSelectedRowCount: any;
            setPagination: any;
            openCandidateModal: any;
            openCandidateId: any;
            setOpenCandidateModal: any;
            setOpenCandidateId: any;
            pinnedColumn: { name: string, key: string }
            columnOrder: string[];
        }
) => {
    const isEvaluteSettingEnabled = userLocalData.adminSettings(ID_SETTINGS_EVALUTE)

    return <>

        <MaterialReactTable
            columns={isLayoutFetched ? columns : []}
            // paginationDisplayMode="pages"
            enableRowSelection
            // ={(row) => {
            //     // Return true or false based on the row data
            //     return row.original.hideUserCheckBox;
            // }}
            data={applicantsData}
            //  onSelectionChange = {onselectionchange}
            // onRowSelectionChange={setRowSelection} //connect internal row selection state to your own
            state={{
                rowSelection,
                pagination,
                sorting,
                columnVisibility,
                columnOrder,
                // isLoading: !isLayoutFetched,
                columnPinning: isLayoutFetched ? { left: ["mrt-row-select", pinnedColumn.key] } : {},
            }} //pass our managed row selection state to the table to use
            enablePinning
            initialState={{
                // columnPinning: { left: ['mrt-row-select', 'name'] },
                // columnPinning: isLayoutFetched ? { left: ["mrt-row-select", pinnedColumn.key] } : {},
                density: "compact",
                showGlobalFilter: false,
                // columnVisibility: { score: !Boolean(mainJsonData.parsedDocument) }
                // columnOrder: showColumns
            }}

            // muiPaginationProps={{
            //     rowsPerPageOptions: [50],
            //     showFirstButton: false,
            //     showLastButton: false,
            //     SelectProps: {
            //         style: { display: 'none' }, // Hide the rows per page dropdown
            //     },
            // }}
            enablePagination={false}
            enableDensityToggle={false}
            enableFullScreenToggle={false}
            manualPagination
            manualSorting
            onSortingChange={setSorting}
            enableGlobalFilterModes
            columnResizeMode="onChange"
            onPaginationChange={setPagination}
            getRowId={row => row.candId}
            icons={{
                ArrowDownwardIcon: (props: any) => (
                    <SwitchLeftIcon {...props} />
                ),
            }}
            rowCount={rowCount}
            enableStickyHeader
            renderBottomToolbarCustomActions={() => (
                <CustomPagination
                    page={pagination.pageIndex}
                    rowsPerPage={50}
                    rowCount={rowCount}
                    onChangePage={(page: any) => setPagination({ ...pagination, pageIndex: page, pageSize: 50 })}
                    maxTotalCount={1000}
                />
            )}

            muiSelectCheckboxProps={(prop) => ({
                onChange: (e) => {
                    if (prop.row.id) {
                        let tempRowSelection: any = { ...rowSelection };
                        if (e.target.checked) {
                            tempRowSelection[prop.row.id] = e.target.checked;
                        } else {
                            // delete tempRowSelection[prop.row.id];
                            if (tempRowSelection.hasOwnProperty(prop.row.id)) {
                                delete tempRowSelection[prop.row.id];
                            }
                        }
                        setRowSelection(tempRowSelection);
                        //  setRowSelection({ ...rowSelection, [prop.row.id]: e.target.checked });
                        console.log(e.target.checked);
                        if (isSelectAllChecked) {
                            if (e.target.checked) {
                                setSelectedRowCount(selectedRowCount + 1);
                            } else {
                                setSelectedRowCount(selectedRowCount - 1);
                            }
                        }
                    }
                },
                style: {
                    display: prop.row.original.hideUserCheckBox ? 'none' : 'block', // Hide the checkbox based on someCondition
                },
            })}
            renderTopToolbar={
                <></>
            }
            positionExpandColumn={(isEvaluteSettingEnabled && !!customHeadingsList?.length) ? "last" : undefined}
            renderDetailPanel={(isEvaluteSettingEnabled && !!customHeadingsList?.length) ? ({ row }) => {
                const isExpanded = row.getIsExpanded();
                if (!!row?.original?.candidateCriteria?.length) {
                    return isExpanded ? <ExpandDetails headingList={customHeadingsList} candidateData={row.original} /> : <></>
                } else return undefined;
            } : undefined}
            muiDetailPanelProps={{ colSpan: columns.length + 2, sx: { background: "#fafafa" } }}
            muiExpandButtonProps={({ row, table }) => ({
                onClick: () => table.setExpanded({ [row.id]: !row.getIsExpanded() }), //set only this row to be expanded
            })}
            muiExpandAllButtonProps={() => ({ className: "d-none" })}


        />
        {(openCandidateModal && openCandidateId && jobIdFromJobPage) &&
            <ViewCandidateModal open={openCandidateModal} closePopup={() => {
                setOpenCandidateModal(false);
                setOpenCandidateId(null);
            }} jobId={jobIdFromJobPage} candidateId={openCandidateId ? `${openCandidateId}` : ""} />}
    </>
}

export default CommunityData;