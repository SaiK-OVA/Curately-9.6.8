import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect } from 'react';
import { userLocalData } from '../../../../../shared/services/userData';

function createData(
    name: string,
    value: string
) {
    return { name, value };
}
const CandidateStatic = ({ reRoute }: { reRoute: boolean }) => {


    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();



    const rows = [
        createData('EntityType', searchParams.get('EntityType') ? searchParams.get('EntityType') as string : ""),
        createData('UserID', searchParams.get('UserID') ? searchParams.get('UserID') as string : ""),
        createData('CorporationID', searchParams.get('CorporationID') ? searchParams.get('CorporationID') as string : ""),
        createData('PrivateLabelID', searchParams.get('PrivateLabelID') ? searchParams.get('PrivateLabelID') as string : ""),
        createData('EntityID', searchParams.get('EntityID') ? searchParams.get('EntityID') as string : ""),
        // createData('currentBullhornUrl', searchParams.get('currentBullhornUrl') ? searchParams.get('currentBullhornUrl') as string : ""),
    ];

    useEffect(() => {
        if (reRoute) {
            navigate({
                pathname: `/${userLocalData.getvalue('clientName')}/static/candidate`,
                search: createSearchParams({
                    EntityType: searchParams.get('EntityType') ? searchParams.get('EntityType') as string : "",
                    UserID: searchParams.get('UserID') ? searchParams.get('UserID') as string : "",
                    CorporationID: searchParams.get('CorporationID') ? searchParams.get('CorporationID') as string : "",
                    PrivateLabelID: searchParams.get('PrivateLabelID') ? searchParams.get('PrivateLabelID') as string : "",
                    EntityID: searchParams.get('EntityID') ? searchParams.get('EntityID') as string : "",
                    currentBullhornUrl: searchParams.get('currentBullhornUrl') ? searchParams.get('currentBullhornUrl') as string : "",
                }).toString()
            });
        }
    }, []);

    // https://appqa.curately.ai/?
    // EntityType=Candidate
    // UserID=5
    // CorporationID=27170
    // PrivateLabelID=50377
    // EntityID=263
    // currentBullhornUrl=https%3A%2F%2Fapp.bullhornstaffing.com%2Fcontent%2Frecord%2FCandidate%2F263%2Fcustom%3Bname%3DCurately%3Burl%3Dhttps%25253A%25252F%25252Fappqa.curately.ai%25252F%25253FEntityType%25253DCandidate%252526UserID%25253D5%252526CorporationID%25253D27170%252526PrivateLabelID%25253D50377


    // ?EntityType=Candidate&UserID=5&CorporationID=27170&PrivateLabelID=50377&EntityID=263&currentBullhornUrl=https%3A%2F%2Fapp.bullhornstaffing.com%2Fcontent%2Frecord%2FCandidate%2F263%2Fcustom%3Bname%3DCurately%3Burl%3Dhttps%25253A%25252F%25252Fappqa.curately.ai%25252F%25253FEntityType%25253DCandidate%252526UserID%25253D5%252526CorporationID%25253D27170%252526PrivateLabelID%25253D50377
    return reRoute ?
        <></> :
        <div className='m-5 bg-white p-5'>
            <h2>Candidate Page</h2>


            <Table sx={{ width: 350 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Value</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.value}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
}

export default CandidateStatic;