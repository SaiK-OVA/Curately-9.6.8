// import React from 'react'
import { useEffect, useMemo, useState } from '../../../../shared/modules/React';
import { MaterialReactTable, MRT_ColumnDef } from "../../../../shared/modules/MaterialReactTable";
import { Grid } from '../../../../shared/modules/MaterialImports/Grid';
import { Button } from "../../../../shared/modules/MaterialImports/Button";
import { Typography } from '../../../../shared/modules/MaterialImports/Typography';
import CustomPagination from '../../../shared/CustomPagination/CustomPagination';
import ApiService from "../../../../shared/api/api";
import { userLocalData } from "../../../../shared/services/userData";
// import { Link } from 'react-router-dom';

import './LinkedInUsage.scss';
import { globalData } from '../../../../shared/services/globalData';

const LinkedInUsage = () => {

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const openCandidateView = (id: string) => {
        window.open(globalData.getWindowLocation() + "candidate/view/" + id);
    }

    const [rowCount, setRowCount] = useState(0);
    const LinkedInColumns: MRT_ColumnDef<any>[] = useMemo(
        () => [
            {
                accessorKey: "firstName",
                header: "Name",
                Cell: ({ row }) =>
                    // <Link to={`../candidate/view/${row.original.userId}`} className="hightLightTd" state={{
                    //     data: [{
                    //         text: "Home",
                    //         link: `../../home`
                    //     },
                    //     {
                    //         text: `${row.original.firstName.toLowerCase() + " " + row.original.lastName.toLowerCase()}`,
                    //         link: ``
                    //     }]
                    // }}>
                    //     <span className='tt-capital'>{row.original.firstName + " " + row.original.lastName}</span>
                    // </Link>
                    (<span className="hightLightTd" onClick={() => openCandidateView(row.original.userId)}>{row.original.firstName.toLowerCase() + " " + row.original.lastName.toLowerCase()}</span>)
                // row.original.hasOwnProperty("linkedinUrl") ? (
                //   <span onClick={() => window.open("https://www." + row.original.linkedinUrl)} className='tt-capital firstname'>{row.original.firstName}</span>
                // )
                //   :
                //   <span className='tt-capital'>{row.original.firstName}</span>
            },
            {
                accessorKey: "linkedinUrl",
                header: "Linkedin URL",
                Cell: ({ row }) =>
                    row.original.hasOwnProperty("linkedinUrl") ? (
                        <Button variant='text' color='primary' onClick={() => window.open("https://www." + row.original.linkedinUrl)} className='tt-lower'>{row.original.linkedinUrl}</Button>
                    )
                        :
                        null

            },
        ], [])
    const [linkedindata, setLinkedindata] = useState<any[]>([]);
    const fetchLinkedinConnectReport = (pageNum: number) => {
        const requestData = {
            clientId: userLocalData.getvalue('clientId'),
            recrId: userLocalData.getvalue('recrId'),
            pageNum: pageNum,
            pageSize: 10
        };

        ApiService.postWithData('admin', 'getLinkedinConnectReport', requestData)
            .then((response: any) => {
                if (response.data && response.data.Success) {
                    console.log(response.data);
                    setLinkedindata(response.data.data);
                    setRowCount(response.data.totalCount);
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

    useEffect(() => {
        fetchLinkedinConnectReport(pagination.pageIndex);
    }, [pagination.pageIndex]);

    return (
        <div className='px-5' id="LinkedInusage">
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
                        LinkedIn Viewed Profiles
                    </Typography>
                </Grid>
            </div>
            <div className={`MRTableCustom  pl-0 `}>
                <MaterialReactTable
                    columns={LinkedInColumns}
                    data={linkedindata}//connect internal row selection state to your own
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
                    enablePagination={false}
                    enableStickyHeader
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
        </div>
    )
}

export default LinkedInUsage