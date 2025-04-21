

import { Grid } from '../../../../../shared/modules/MaterialImports/Grid2';

import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';

import './ExpandDetails.scss';
import { useEffect, useState } from 'react';


interface Criteria { criterion: string; status: string; evidence: string; score: number; }

const ExpandDetails = ({ headingList, candidateData, isInDrawer }: { headingList: any; candidateData: any; isInDrawer?: boolean }) => {


    const [objToDisplay, setObjToDisplay] = useState<Criteria[]>([]);

    const renderList = () => {
        let tempObj: Criteria[] = [];
        for (let hl = 0; hl < headingList.length; hl++) {

            let tempObjForCriteria = candidateData.candidateCriteria.find((obj: { criterion: string; status: string; evidence: string; score: number; }) => obj.criterion?.toLowerCase() === headingList[hl]?.toLowerCase());
            if (tempObjForCriteria?.criterion) {
                tempObj.push(tempObjForCriteria);
            }
        }
        setObjToDisplay(tempObj);
    }


    useEffect(() => {
        if (candidateData?.candidateCriteria?.length && headingList?.length) {
            renderList();
        }
    }, [])




    return <Grid container direction="row" justifyContent="start" className='m-2' alignItems="start" id="ExpandDetails" columnSpacing={3}>
        {
            objToDisplay.map((obj) => (

                <Grid size={isInDrawer ? 12 / objToDisplay.length : undefined} sx={isInDrawer ? undefined : { maxWidth: 300, minWidth: 250 }} className='mr-2 ml-2'>
                    {/* <Grid container direction="column" sx={{ maxWidth: 300, minWidth: 250 }} className='mr-4'> */}
                    <Grid>
                        <span className={`${(obj.status === "Match") ? 'Match' : (obj.status === "Potential Match") ? 'PotentialMatch' : (obj.status === "Not a Match") ? 'NotaMatch' : ''}`}>
                            {
                                obj.status === "Match" ?
                                    <ThumbUpOutlinedIcon />
                                    :
                                    obj.status === "Potential Match" ?
                                        <ThumbUpOutlinedIcon />
                                        :
                                        obj.status === "Not a Match" ?
                                            <ThumbDownAltOutlinedIcon />
                                            :
                                            null
                            }
                            <span className='px-2'>{obj.status}</span>
                        </span>
                    </Grid>
                    <Grid className="fw-6 mt-2 mb-3 fs-13">
                        {obj.criterion}
                    </Grid>
                    <Grid className="">
                        {obj.evidence}
                    </Grid>
                </Grid>
            ))
        }


    </Grid>
}

export default ExpandDetails;