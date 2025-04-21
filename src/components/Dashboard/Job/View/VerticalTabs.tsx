import { React } from '../../../../shared/modules/React';
import {Tabs, Tab} from '../../../../shared/modules/MaterialImports/Tabs';
import {Typography} from '../../../../shared/modules/MaterialImports/Typography';
import {Box} from '../../../../shared/modules/MaterialImports/Box';
import './VerticalTabs.scss';
import NewspaperIcon from '@mui/icons-material/Newspaper';


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"

        scrollButtons={false}
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"


        TabIndicatorProps={{ style: { display: 'none' } }}
        sx={{

          '& .Mui-selected': {
            borderLeft: '2px solid var(--c-primary-color)',
            borderTop: '1px solid #e3e3e5',
            borderBottom: '1px solid #e3e3e5',
            '--color': 'var(--c-primary-color)',
            padding: '14px 16px',
            width: '200px',
            textDecoration: 'none',
            fontsize: '14px',
            fontWeight: '500',
            lineHeight: '20px',


          },
        }}
      >
        <Tab
          className="vertical-menu-item" label="Technologies" {...a11yProps(0)} />
        <Tab className="vertical-menu-item" label="Funding Rounds" {...a11yProps(1)} />
        <Tab className="vertical-menu-item" label="Job Postings" {...a11yProps(2)} />

        <Tab className="vertical-menu-item" label={<div><NewspaperIcon style={{ verticalAlign: 'middle', fontSize: '18px' }} /> News </div>} />

        <Tab className="vertical-menu-item" label="Employee Trends" {...a11yProps(4)} />

      </Tabs>
      <TabPanel value={value} index={0}>
        Technologies Content
      </TabPanel>
      <TabPanel value={value} index={1}>
        Funding Rounds content
      </TabPanel>
      <TabPanel value={value} index={2}>
        Job Postings Content
      </TabPanel>
      <TabPanel value={value} index={3}>
        News content
      </TabPanel>
      <TabPanel value={value} index={4}>
        Employee Trends
      </TabPanel>

    </Box>
  );
}
