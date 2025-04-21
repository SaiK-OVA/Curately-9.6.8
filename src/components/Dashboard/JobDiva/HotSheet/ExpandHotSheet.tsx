

import { Grid } from '../../../../shared/modules/MaterialImports/Grid2';
import './ExpandHotSheet.scss';
import { useEffect, useState } from 'react';

interface CandidateDetails { id: string; firstName: string; lastName: string; }
interface jobOrderDetails { id: string; title: string; }

const ExpandHotSheet = ({ candidateData }: { candidateData: any; }) => {

    const [objCandidateDisplay, setObjCandidateDisplay] = useState<CandidateDetails[]>(candidateData?.candidates?.data ? candidateData?.candidates?.data : []);
    const [objJobOrderDisplay, setObjJobOrderDisplay] = useState<jobOrderDetails[]>(candidateData?.jobOrders?.data ? candidateData?.jobOrders?.data : []);


    return <Grid container spacing={2}
        sx={{

            margin: 'auto',
            gridTemplateColumns: '1fr 1fr',
            width: '100%',
            border: '2px '
        }}
        id="ExpandHotSheet">
        <div className="grid-container">
            <div className="grid-item">
                {candidateData?.candidates?.total > 0 &&
                    <Grid container size={12} className='mr-4 '>
                        <Grid size={12} className='m-2 ' textAlign={'center'}>Candidate's Full Name</Grid>
                        <ul id="myUL">
                            {
                                objCandidateDisplay && objCandidateDisplay.map((obj: any, index: number) => (
                                    <li key={index}>
                                        <span className='px-2'> {obj.firstName + ' ' + obj.lastName}</span>
                                    </li>
                                ))
                            }
                        </ul>
                    </Grid>
                }
            </div>
            <div className="grid-item">
                {candidateData?.jobOrders?.total > 0 &&
                    <Grid container size={12} className='mr-4 '>
                        <Grid size={12} className='m-2 ' textAlign={'center'}>Job Titles</Grid>
                        <ul id="myUL1">
                            {
                                objJobOrderDisplay && objJobOrderDisplay.map((obj: any, index: number) => (
                                    <li key={index}>
                                        <span className='px-2'> {obj.title}</span>
                                    </li>
                                ))
                            }
                        </ul>
                    </Grid>


                }
            </div>

        </div>

    </Grid>
}

export default ExpandHotSheet;