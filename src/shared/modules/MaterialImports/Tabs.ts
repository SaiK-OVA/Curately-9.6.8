import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


const CustomTabProps = (index: number) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export { Tab, Tabs, CustomTabProps };