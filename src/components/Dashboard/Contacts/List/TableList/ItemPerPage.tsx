// import React from 'react';
import {MenuItem} from '../../../../../shared/modules/MaterialImports/Menu';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {Stack} from '../../../../../shared/modules/MaterialImports/Stack';
import { FC } from "react";

import './TableList.scss'

interface ItemPerPageProps {
    pageSize: number;
    setPageSize: (pageSize: number) => void;
}

const rows = [5, 10, 20, 30]

const ItemPerPage: FC<ItemPerPageProps> = ({ pageSize, setPageSize }) => {
    // const [rowsperpage, setRowsPerPage] = useState(5);

    const handleChange = (event: SelectChangeEvent<number>) => {
        setPageSize(event.target.value as number);
    };

    return (
        <Stack
            className='filter-item-container'
            spacing={3}
            direction='row'
        >
            <span >Items per page</span>
            <Select
                id="rowsperpage"
                value={pageSize}
                onChange={handleChange}
                size="small"
                className='item-per-page-container-width'
            >
                {rows.map((item) => (
                    <MenuItem key={item} value={item}>{item}</MenuItem>
                ))}
            </Select>
        </Stack>
    );
}

export default ItemPerPage