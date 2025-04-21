
import {React,  useState } from '../../../../../../shared/modules/React';
import {Card, CardContent} from '../../../../../../shared/modules/MaterialImports/Card';
import {Button} from '../../../../../../shared/modules/MaterialImports/Button';
import {Typography} from '../../../../../../shared/modules/MaterialImports/Typography';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import './OnBoarding.scss';

const NewHireSheet = React.lazy(() => import('../NewHireSheet/NewHireSheet'));



const OnBoarding = (
    {
        stageId, passedStageData = {}, updated
    }: {
        stageId: string, passedStageData: any, updated: any
    }
) => {

    const [openNewHireSheet, setOpenNewHireSheet] = useState(false)


    return (
        <div className='OnBoarding'>
            <Card className='onboarding'>
                <CardContent>
                    <Typography variant='h6'>Setup New hire sheet mapping and Onboarding</Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddCircleOutlineIcon />}
                        onClick={() => setOpenNewHireSheet(true)}
                        className='mt-5'
                    >
                        Setup New Hire Mapping
                    </Button>
                </CardContent>
            </Card>
            {
                openNewHireSheet ?
                    <NewHireSheet
                        stageId={stageId}
                        passedStageData={passedStageData}
                        open={openNewHireSheet}
                        closePopup={() => setOpenNewHireSheet(false)}
                        update={() => { setOpenNewHireSheet(false); updated() }}
                    />
                    :
                    null
            }
        </div>
    )
}
export default OnBoarding;