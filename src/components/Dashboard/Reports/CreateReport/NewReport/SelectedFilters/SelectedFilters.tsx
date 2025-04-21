// import { useMemo, useEffect, useState } from 'react';
import { useEffect, useState } from '../../../../../../shared/modules/React';
import {Typography} from '../../../../../../shared/modules/MaterialImports/Typography';

import './SelectedFilters.scss';
import { useDroppable } from "@dnd-kit/core";
import { FC } from "react";
import '../NewReport.scss';
// import { CSS } from "@dnd-kit/utilities";
 
import {Grid} from "../../../../../../shared/modules/MaterialImports/Grid";
// import Box from '@mui/material/Box';
// import FormControlLabel from '@mui/material/FormControlLabel';

import FilterLogic from './FilterLogic';
//import { dataFilters as addFiltersData, Filter } from '../../AddFilters'; // Import the shared type definitions
import { Filter } from '../AddFilters';
interface IColumnDropable {
    id: string;
    items: Filter[]; 
  }

const SelectedFilters : FC<IColumnDropable> = (props) => {
    const { id, items } = props;
   const { setNodeRef } = useDroppable({
     id
   });
   const [data, setData] = useState(() => props.items);
   
   const [filters, setFilters] = useState(()=>props.items);

  // useEffect(() => {

  //   setTimeout(() => {
  //     setData([...props.items]);
  //     setFilters([...props.items]);
  //     console.log(props.items);
  //   }, 200);

  // }, [props.items]);
  useEffect(() => {
   
    const updateDataWithNewItems = (newItems: Filter[]): Filter[] => {
      return newItems.map(item => {
        const existingItem = filters.find(filter => filter.id === item.id);
        return existingItem || item;
      });
    };
    const updatedData = updateDataWithNewItems(items);
    setFilters(updatedData);
  }, [items, filters]);
  



   console.log(data);
    return (
        <div id='SelectedFilters' className="customCard px-4 py-2">
            <Typography sx={{ textAlign: 'left', margin: "1px", fontWeight: "Bold" }} >  Selected Filters </Typography>
            <div  ref={setNodeRef}>
      <Grid className='routerHeight1' sx={{ height: 302 }}>
      <FilterLogic filters={filters} setFilters={setFilters} />
      </Grid>
 
      <div className="cart">  
            Drop filters here to add to the report
      
    </div>
    </div>
        </div>
    )
}

export default SelectedFilters;