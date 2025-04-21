import  {React, useState } from '../../../../../../shared/modules/React';
import {Typography} from '../../../../../../shared/modules/MaterialImports/Typography';
import './BaseModule.scss';

import {Button, TextField} from "../../../../../../shared/modules/commonImports";


import {Chip} from '../../../../../../shared/modules/MaterialImports/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import {Stack} from '../../../../../../shared/modules/MaterialImports/Stack';

import AddFormulaDialogBox from './AddFormulaDialogBox';
import ApiService from '../../../../../../shared/api/api';

interface ComponentBProps {
  onDataFromB: (dataFromB: any) => void;
}

const BaseModule: React.FC<ComponentBProps> = ({ onDataFromB }) => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const [customData, setCustomData] = useState<any>({});

  const handleAddFormulaDialogOpen = () => {
    setDialogOpen(true);
    setCustomData({});
    saveAuditLog(4208);
  };

  const handleAddFormulaDialogClose = () => {
    setDialogOpen(false);
  };
  const handleDataFromC = (dataFromC: any) => {
    onDataFromB(dataFromC);
  };

  const saveAuditLog = (id: number) => {
    ApiService.saveAuditLog(id);
}

  return (
    <div id='BaseModule'>

      <Typography sx={{ textAlign: 'left', margin: "1px" }} className='d-none'>  Base Module </Typography>
      <Stack direction="row" justifyContent="space-between"  >
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography component="h4" sx={{ fontWeight: "bold", fontSize: '18px' }}>Jobs</Typography>

        </Stack>
        <Button variant="outlined" sx={{ background: "white", borderRadius: '0.5em' }} className='d-none' >Change</Button>
      </Stack>
      <Stack direction="row" spacing={1} alignItems="center">
        <Button variant="text" onClick={handleAddFormulaDialogOpen} sx={{ fontSize: '14px' }} >Add Formula</Button> </Stack>
      <Stack className='d-none' >
        <Autocomplete
          multiple
          id="jobSkill"
          size="small"
          options={JobSkillsData.map((option) => option.title)}
          defaultValue={[JobSkillsData[0].title]}
          freeSolo
          sx={{ marginTop: "5px", marginBottom: "15px", }}
          renderTags={(value: readonly string[], getTagProps) =>
            value.map((option: string, index: number) => (
              <Chip variant="outlined" sx={{ padding: "0px", margin: "1px", height: "24px" }} label={option} {...getTagProps({ index })} />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              size="small"

            />
          )}
        />
      </Stack>
      {
        isDialogOpen ?
          <AddFormulaDialogBox open={isDialogOpen} onClose={handleAddFormulaDialogClose} customData={customData} onDataFromC={handleDataFromC} />
          :
          null
      }
    </div>
  )
}

export default BaseModule;


const JobSkillsData = [
  { title: 'All' },
  { title: 'Active listening' },
  { title: 'Adaptability' },
  { title: 'Administration' },
  { title: 'Advocacy' },
  { title: 'Analysis' },
];