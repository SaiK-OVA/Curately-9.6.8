import { React } from '../../../../shared/modules/React';
// import { Card, CardHeader, CardContent } from '@mui/material';
import {ToggleButton, ToggleButtonGroup} from '../../../../shared/modules/MaterialImports/ToggleButton';

// import { DashboardCardInterface } from '../dashboardCardModel';

import './CardBodyData.scss';

const CardBodyData = (props: any) => {
    // const { data, removeEle } = props;
    const [months, setMonths] = React.useState('90');

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newMonths: string,
    ) => {
        setMonths(newMonths);
    };
    return (
        <div>
            <ToggleButtonGroup
                color="primary"
                value={months}
                exclusive
                onChange={handleChange}
                size="small"
            >
                <ToggleButton className='togBtn' value="90">3 mo</ToggleButton>
                <ToggleButton className='togBtn' value="180">6 mo</ToggleButton>
                <ToggleButton className='togBtn' value="270">9 mo</ToggleButton>
                <ToggleButton className='togBtn' value="365">12 mo</ToggleButton>
            </ToggleButtonGroup>

        </div>
    );
}

export default CardBodyData;
