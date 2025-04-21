import {React} from '../../../../../../shared/modules/React';
import {Box} from "../../../../../../shared/modules/MaterialImports/Box";
import {Typography} from "../../../../../../shared/modules/MaterialImports/Typography";
import {IconButton} from '../../../../../../shared/modules/MaterialImports/Button';

import Avatar  from '@mui/material/Avatar';
import LockIcon from '@mui/icons-material/Lock';

type FilterRowProps = {
  number: number;
  label: string;
  condition: string;
  setCondition: (condition: string) => void;
  children: React.ReactNode;
};

const FilterRow: React.FC<FilterRowProps> = ({ number, label, condition, setCondition, children }) => {
  // const handleConditionChange = (event: React.ChangeEvent<{ value: unknown }>) => {
  //   setCondition(event.target.value as string);
  // };


 

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2, m:1 }}>
      <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem', mr: 1 }}>
        {number}
      </Avatar>
      <IconButton size="small" disabled>
        <LockIcon />
      </IconButton>
      <Typography variant="body1"  sx={{ minWidth: '166px', textAlign:"left" }}>{label}</Typography>
     
      {children}
    </Box>
  );
};

export default FilterRow;
