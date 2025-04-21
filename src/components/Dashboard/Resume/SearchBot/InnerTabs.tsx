import {React, useMemo } from "../../../../shared/modules/React";
import {Tabs,Tab} from '../../../../shared/modules/MaterialImports/Tabs';
import {Typography} from '../../../../shared/modules/MaterialImports/Typography';
import {Box} from '../../../../shared/modules/MaterialImports/Box';
import { Button, Grid,  TextField } from '../../../../shared/modules/commonImports';
import { MenuItem } from '../../../../shared/modules/MaterialImports/Menu';
import {  Select } from '../../../../shared/modules/MaterialImports/FormElements';
import {   Stack } from '../../../../shared/modules/MaterialImports/Stack';
import {  TextareaAutosize } from '@mui/material';
import  { MaterialReactTable, type MRT_ColumnDef } from "../../../../shared/modules/MaterialReactTable";;
//import { ErrorMessage } from 'formik';
import Editor from '../../../shared/EmailDialogBox/EmailBody';
import { data } from './makeData';




const InnerTabs = () => {
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


  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  //const [ListSearchBot, setListSearchBot] = useState<any[] | never[]>([]);
  const columns: MRT_ColumnDef<any>[] = useMemo(
    () => [

      {
        accessorKey: "firstName",
        header: "Keyword",
      },

      {
        accessorKey: "date",
        header: "Date",
      },
    ],

    []
  );

  return (
    <Box className="tab-pane">
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Search String" {...a11yProps(0)} />
          <Tab label="Email" {...a11yProps(1)} />
          <Tab label="Report" {...a11yProps(2)} />
          <Tab label="Activities" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Stack
          direction="row"
          // className="customCard px-4 py-2"
          justifyContent="space-evenly"
          alignItems="center"
          sx={{ minHeight: 'auto !important' }}
        >
          <Typography className="header">
            Name:
          </Typography>
          <Stack direction="row" className="btn-container">
            <Typography> Type:Job/Skills</Typography>
          </Stack>
        </Stack>
        <div className="MRTableCustom">
        <MaterialReactTable
          columns={columns}
          // enableRowSelection
          data={data}
        // onRowSelectionChange={setRowSelection} //connect internal row selection state to your own
        // state={{ rowSelection, pagination }} //pass our managed row selection state to the table to use
        // enablePinning
        // initialState={{ columnPinning: { left: ['mrt-row-select'] }, density: 'compact', showGlobalFilter: true }}
        // enableDensityToggle={false}
        // enableFullScreenToggle={false}
        // muiTableHeadCellProps={{
        //   sx: (theme) => ({
        //     background: 'var(--buttrPurple)',
        //   }),
        // }}
        // enableGlobalFilterModes
        // columnResizeMode="onChange"
        // onPaginationChange={setPagination}
        // getRowId={(row) => row.companyId}
        // icons={{
        //   ArrowDownwardIcon: (props: any) => <SwitchLeftIcon  {...props} />
        //  }}
        />
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Select
            labelId="type-label"
            id="jobCategory"
            name="jobCategory"
            size="medium"
            variant="outlined"
            type="select"

          >
            <MenuItem value="1" >Merge fields</MenuItem>
            <MenuItem value="2">First name</MenuItem>
            <MenuItem value="3">Last name</MenuItem>
            <MenuItem value="4">Firstname and Lastname</MenuItem>
            <MenuItem value="5">Email</MenuItem>
            <MenuItem value="6">Signature</MenuItem>
            <MenuItem value="7">Candid</MenuItem>

          </Select>
        </Grid>
        <Grid container spacing={2} className="mb-2">
          <Grid size={12} className='pr-2'>
            <label>Subject</label>
            <TextField fullWidth
              id="subject"
              name="subject"
              size="small"
              variant="outlined"
              type="text"
            />
          </Grid>
          <Grid size={12} className='pr-2'>

            <Editor
              toolbarId='publicDescription'
              placeholder='Public Description'
              id='publicDescription'

              // editorHtml={addJobFormik.values.publicDescription}
              mentions={false}
              saveTemplate={false} editorHtml={''} handleChange={undefined} />

          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Select
            labelId="type-label"
            id="jobCategory"
            name="jobCategory"
            size="medium"
            variant="outlined"
            type="select"

          >
            <MenuItem value="1" >Merge fields</MenuItem>
            <MenuItem value="2">First name</MenuItem>
            <MenuItem value="3">Last name</MenuItem>
            <MenuItem value="4">Firstname and Lastname</MenuItem>
            <MenuItem value="5">Email</MenuItem>
            <MenuItem value="6">Signature</MenuItem>
            <MenuItem value="7">Candid</MenuItem>

          </Select>
        </Grid>
        <label htmlFor="title">SMS Body </label>
        <br />
        <TextareaAutosize
          aria-label="minimum height"
          minRows={8}
          // placeholder="Minimum 3 rows"
          style={{ width: 628 }}
        />
        <Stack spacing={2} direction="row" justifyContent={'flex-end'}>
          <Button type="submit" size="medium" variant="contained">Save</Button>
        </Stack>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <div className="MRTableCustom">
          <MaterialReactTable
            columns={columns}
            // enableRowSelection
            data={data}
          />
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <div className="MRTableCustom">
          <MaterialReactTable
            columns={columns}
            // enableRowSelection
            data={data}
          />
        </div>
      </CustomTabPanel>
    </Box>
  );
}
export default InnerTabs;