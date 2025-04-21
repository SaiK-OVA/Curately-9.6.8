import { useState, useMemo } from '../../../../shared/modules/React';
import { Box   } from '../../../../shared/modules/MaterialImports/Box';
import {  Stack   } from '../../../../shared/modules/MaterialImports/Stack';
import {  Tab, Tabs,  } from '../../../../shared/modules/MaterialImports/Tabs';
import {   Typography } from '../../../../shared/modules/MaterialImports/Typography';
import './SearchBot.scss';
import {Grid,Button} from '../../../../shared/modules/commonImports';
import  { MaterialReactTable, type MRT_ColumnDef } from "../../../../shared/modules/MaterialReactTable";
import { data } from './makeData';

import InnerTabs from './InnerTabs';



const SearchBot = () => {
    interface TabPanelProps {
        children?: React.ReactNode;
        index: number;
        value: number;
    }
    function CustomTabPanel(props: TabPanelProps) {
        const { children, value, index, ...other } = props;
        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
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
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }


    const [value, setValue] = useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };



   // const [ListSearchBot, setListSearchBot] = useState<any[] | never[]>([]);
    const columns: MRT_ColumnDef<any>[] = useMemo(
        () => [

            {
                accessorKey: "searchBotName",
                header: "SearchBot Name",
            },

            {
                accessorKey: "type",
                header: "Type",
            },
            {
                accessorKey: "createdBy",
                header: "Createdby",
            },
            {
                accessorKey: "date",
                header: "Date",
            },
            {
                accessorKey: "Action",
                header: "Action",
            },
        ],

        []
    );

    return (
        <div className='searchBotContainer' id="searchBotContainer">
            <Grid container className="customCard p-0 " gap={0}>
                <Grid sx={{ width: 550, overflow: 'hidden', opacity: 1 }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label=" My Searchbots" {...a11yProps(0)} />
                            <Tab label="All Searchbot" {...a11yProps(1)} />
                            <Stack direction="row"  justifyContent={'flex-end'} marginLeft={'96px'} marginTop={'5px'}>
                            <Button variant="contained">Create New SearchBot</Button>
                            </Stack>
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <div className="MRTableCustom">
                        <MaterialReactTable 
                            columns={columns}
                            // enableRowSelection
                            data={data}
                        />
                        </div>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                    <div className="MRTableCustom">
                        <MaterialReactTable 
                            columns={columns}
                            // enableRowSelection
                            data={data}
                        />
                        </div>
                    </CustomTabPanel>
                </Grid>
                <Grid sx={{ width: 'calc(100% - 610px)' }} >
                    <InnerTabs />
                </Grid>
            </Grid>
        </div>
    );
}
export default SearchBot;





