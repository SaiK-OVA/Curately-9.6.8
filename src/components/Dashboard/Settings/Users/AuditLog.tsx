import { useEffect, useMemo, useState } from '../../../../shared/modules/React';
import {
  MaterialReactTable,
  // useMaterialReactTable,
  type MRT_ColumnDef,
} from '../../../../shared/modules/MaterialReactTable';
import CustomPagination from '../../../shared/CustomPagination/CustomPagination';
import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';
import ApiService from '../../../../shared/api/api';
import { userLocalData } from '../../../../shared/services/userData';
import { DateTime } from '../../../../shared/modules/Luxon';

type PersonWithId = {
  actionDate: string;
  actionName: string;
  auditId: number;
  jsonData: any;
  // "{\"userId\":60549,\"recrId\":2070,\"jobId\":46,\"clientId\":3}"
  userId: string;
};


const AuditLog = ({ userId }: { userId: string }) => {
  const [data, setData] = useState<PersonWithId[]>([])

  const columns = useMemo<MRT_ColumnDef<PersonWithId>[]>(
    () => [
      {
        accessorKey: 'descr',
        header: 'Action',
      },
      {
        accessorKey: 'Date',
        header: 'Date',
        size: 150,
        Cell: ({ row }) => {
          const formattedDate = row.original.actionDate ? DateTime.fromFormat(row.original.actionDate.substring(0, 19), 'yyyy-MM-dd hh:mm:ss').toFormat('MM/dd/yyyy hh:mm:ss') : "";
          return formattedDate;
        },
      },
    ],
    [],
  );

  // https://adminapi.curately.ai/curatelyAdmin/getAuditLogList

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [rowSelection, setRowSelection] = useState({});
  const [rowCount, setRowCount] = useState(0);
  const [globalFilter, setGlobalFilter] = useState('');

  const getSelection = (selectedRows: any) => {
    setRowSelection(selectedRows);
  };

  useEffect(() => {
    if (userId) {
      ApiService.postWithData('admin', 'getAuditLogList', {
        "clientId": userLocalData.getvalue('clientId'),
        "recrId": userId,
        "next": pagination.pageIndex * pagination.pageSize,
        "pageSize": pagination.pageSize
      }).then((response: { data: { Success: any; total: any; auditLogList: any; }; }) => {
        console.log(response.data);
        if (response.data.Success) {
          if (pagination.pageIndex === 0) {
            setRowCount(response.data.total);
          }
          setData(response.data.auditLogList);
        }
      })
    }

  }, [pagination.pageIndex]);

  return (
    <div id="userAuditLog">
      <div className='MRTableCustom'>
        <MaterialReactTable
          columns={columns}
          data={data}
          enableRowSelection
          onRowSelectionChange={getSelection}
          rowCount={rowCount}
          state={{
            rowSelection,
            pagination,
            globalFilter,
          }}
          initialState={{
            density: 'compact',
            showGlobalFilter: true,
            columnPinning: { left: ['mrt-row-select', 'Action'] },
          }}
          enableGlobalFilterModes
          onGlobalFilterChange={setGlobalFilter}
          getRowId={(row: { auditId: { toString: () => any; }; }) => row.auditId.toString()}
          enableStickyHeader
          enablePagination={false}
          manualPagination
          icons={{
            ArrowDownwardIcon: (props: any) => <SwitchLeftIcon {...props} />,
          }}
          renderBottomToolbarCustomActions={() => (
            <CustomPagination
              page={pagination.pageIndex}
              rowsPerPage={pagination.pageSize}
              rowCount={rowCount}
              onChangePage={(page: number) => setPagination({ ...pagination, pageIndex: page })}
            />
          )}
        />
      </div>
    </div>
  );

};

export default AuditLog;

