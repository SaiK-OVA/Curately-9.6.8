import { Grid } from '../../shared/modules/MaterialImports/Grid2';
import './UnAuthorized.scss'

const UnAuthorized = () => {
    return <div id="UnAuthorized">
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            className='fs-16 fw-6 c-darkGrey'
        >
            You dont have permission to view this page.
        </Grid>
    </div>
}

export default UnAuthorized;