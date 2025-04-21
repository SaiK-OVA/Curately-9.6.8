import { Button } from '../../../shared/modules/commonImports';
import { userLocalData } from '../../../shared/services/userData';
import { RestrictMaskInterface } from '../../Dashboard/Candidate/ViewCandidate/ViewCandidate';
import UpgradeOutlinedIcon from '@mui/icons-material/UpgradeOutlined';


const UpgradeButton = ({ validationCheck, callViewAPI }: { validationCheck: RestrictMaskInterface['isPackageEmailValidity']; callViewAPI: () => void }) => {


    const openUpgrade = () => {
        window.open(`${import.meta.env.VITE_URL_193}#/${userLocalData.getvalue('clientName')}/upgrade`);
    }


    return <>
        {
            ((validationCheck === 'UPGRADE') || (validationCheck === 'UPGRADE BUTTON')) ?
                // <Button onClick={openUpgrade} size='small' variant='outlined' color='primary'>UPGRADE</Button>
                <Button variant='contained' color='primary' size='small' onClick={openUpgrade} startIcon={<UpgradeOutlinedIcon fontSize="small" />} >Upgrade</Button>
                :
                ((validationCheck === 'VIEW') || (validationCheck === 'VIEW BUTTON')) ?
                    <Button onClick={() => callViewAPI()} size='small' variant='outlined' color='primary'>VIEW</Button>
                    :
                    null
        }
    </>
}

export default UpgradeButton;