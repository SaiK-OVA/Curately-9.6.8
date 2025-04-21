import { useState } from "../../../../shared/modules/React";
import { Paper, Tabs, Tab, Box, Typography, MenuItem, Select, Divider, Button } from '@mui/material'
import Stats from "./Stats";
import Logs from "./Logs";
import { Grid } from "../../../../shared/modules/MaterialImports/Grid";
import Link from "@mui/icons-material/Link";

export default function StatsandLogs() {
    const [tabValue, setTabValue] = useState('Stats');
    const [page, setPage] = useState(1);

    const handleTabChange = (_event: any, newValue: string) => {
        setTabValue(newValue);
        setPage(1);
    };

    return (
        <div>   <Paper sx={{ mb: 2, boxShadow: "none" }}>
            <Tabs value={tabValue} onChange={handleTabChange} sx={{
                px: 1,
                "& .MuiTab-root": {
                    textTransform: "capitalize",
                },
                fontSize: "16px",
                borderBottom: "1px solid #E0E0E0",
                "& .MuiTab-textColorPrimary": {
                    color: "#000",
                },

            }}>
                <Tab value="Stats" label="Stats" />
                <Tab value="Logs" label="Logs" />
            </Tabs>

            <Box sx={{ mt: 0, p: 2 }}>
                {/* {tabValue === 'Stats' ?
                    <Typography variant="h6" sx={{ marginBottom: 1, fontSize: "14px" }}>Show Stats</Typography>
                    :
                    <>
                      <Typography variant="h6" sx={{ marginBottom: 1, fontSize: "14px" }}>Show Logs</Typography>
                     
                    </>
                    
                }
                <Divider sx={{ mb: 1 }} /> */}
                {/* <Select fullWidth defaultValue="This Month" sx={{

                    fontSize: "14px",
                    "& .MuiOutlinedInput-root": {
                        borderRadius: "6px",
                        padding: "0px",
                    },
                    "& .MuiSelect-select": {
                        padding: "8px 12px", // Adjust text padding
                    },
                }}>
                    <MenuItem value="This Month">This Month</MenuItem>
                    <MenuItem value="Last Month">Last Month</MenuItem>
                    <MenuItem value="Last Month">Custom Range</MenuItem>
                </Select> */}
                {tabValue === 'Stats' ? (
                    <>
                        <Stats />
                    </>
                ) : (
                    <Logs />
                )}
            </Box>
        </Paper></div>
    )
}
