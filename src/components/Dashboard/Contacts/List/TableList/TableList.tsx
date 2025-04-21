// import React, { useState } from 'react';
import { useState } from '../../../../../shared/modules/React';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Checkbox } from '../../../../../shared/modules/MaterialImports/FormElements';
import Fab from '@mui/material/Fab';
import { Menu, MenuItem } from '../../../../../shared/modules/MaterialImports/Menu';
import Pagination from '@mui/material/Pagination';
import { Stack } from '../../../../../shared/modules/MaterialImports/Stack';
import { TextField } from '../../../../../shared/modules/MaterialImports/TextField';
import { Typography } from '../../../../../shared/modules/MaterialImports/Typography';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import data from './ListData.json'
import { Box } from '@mui/system';
import ItemPerPage from './ItemPerPage';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';

import './TableList.scss'

const TableListData = data

const TableList = () => {
    const [checked, setChecked] = useState(TableListData.map(() => false));
    const [selectAll, setSelectAll] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [sort, setSort] = useState('ASC')
    const [action, setAction] = useState(null)


    // const numChecked = checked.filter((isChecked) => isChecked).length;



    const handleCheckboxClick = (index: number) => {
        const newChecked = [...checked];
        newChecked[index] = !newChecked[index];
        setChecked(newChecked);
    };

    const handleSort = () => {
        setSort(sort === 'asc' ? 'desc' : 'asc');
    };

    // const handleSort = () => {
    //     setSort(sort === 'desc' ? 'asc' : '');
    // };

    const handleSelectAllClick = () => {
        const newChecked = TableListData.map(() => !selectAll);
        setChecked(newChecked);
        setSelectAll(!selectAll);
    };


    const filteredData = TableListData.filter((item) => {
        return item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.designation.toLowerCase().includes(searchText.toLowerCase()) ||
            item.contact.toLowerCase().includes(searchText.toLowerCase()) ||
            item.location.toLowerCase().includes(searchText.toLowerCase()) ||
            item.lastnoteupdated.toLowerCase().includes(searchText.toLowerCase());
    });

    const sortedData = filteredData.sort((a, b) => {
        if (a.name > b.name) {
            return sort === 'asc' ? -1 : 1;
        }
        if (a.name < b.name) {
            return sort === 'asc' ? 1 : -1;
        }
        return 0;
    });

    const pageData = sortedData.slice((page - 1) * pageSize, page * pageSize);
    // const pageData = filteredData.slice((page - 1) * pageSize, page * pageSize);

    let itemsFound = null
    if (searchText !== '' && filteredData.length > 0) {
        itemsFound = `${filteredData.length} ${filteredData.length === 1 ? 'item' : 'items'}  found`
    }

    const handleActionClick = (event: any) => {
        setAction(event.target)
    }

    const handleActionClose = () => {
        setAction(null)
    }

    const handleSaveClick = () => {
        console.log('Save clicked');
        handleActionClose();
    };

    const handleEditClick = () => {
        console.log('Edit clicked');
        handleActionClose();
    };

    const handleDeleteClick = () => {
        console.log('Delete clicked');
        handleActionClose();
    };

    return (
        <Stack pl={12} pr={12} pt={5} pb={5}>
            <Stack mb={2} className='filter-item-container filter-item-container-spacing'>
                <Stack className='filter-item-container' spacing={1} direction='row'>
                    <TextField
                        size='small'
                        variant='outlined'
                        onChange={(e) => setSearchText(e.target.value)}
                        className='filter-search-field'
                        InputProps={{ startAdornment: <FilterAltOutlinedIcon /> }}
                    />
                    <p>
                        {itemsFound}
                    </p>
                </Stack>

                <Box>
                    <ItemPerPage pageSize={pageSize} setPageSize={setPageSize} />
                </Box>

            </Stack>


            <TableContainer component={Paper} >
                <Table sx={{ minWidth: 650 }} aria-label="simple table" >
                    <TableHead >
                        <TableRow className='table-head-container'>
                            <TableCell>

                                <Checkbox
                                    checked={selectAll}
                                    onClick={handleSelectAllClick}
                                    className='list-checkbox'
                                // sx={{ backgroundColor: 'white' }}
                                />

                            </TableCell>

                            <TableCell
                                className='table-head-container-items'

                            >
                                <Typography component='h4' className='table-head-name-container'>NAME
                                    <span className='arrow-buttons-span' onClick={handleSort}>
                                        <ExpandLessOutlinedIcon className='arrow-buttons' />
                                        <ExpandMoreOutlinedIcon className='arrow-buttons' />
                                    </span>
                                </Typography>
                            </TableCell>
                            <TableCell className='table-head-container-items'>DESIGNATION</TableCell>
                            <TableCell className='table-head-container-items'>CONTACT</TableCell>
                            <TableCell className='table-head-container-items'>LOCATION</TableCell>
                            <TableCell className='table-head-container-items'>LAST NOTE UPDATED</TableCell>
                            <TableCell className='table-head-container-items'>ACTION</TableCell>


                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pageData.map((list, index) => (
                            <TableRow key={list.id}>
                                <TableCell>
                                    <Checkbox
                                        checked={checked[index]}
                                        onClick={() => handleCheckboxClick(index)}
                                        className='list-checkbox'
                                    />
                                </TableCell>
                                <TableCell className='table-font-size'>
                                    {list.name}
                                </TableCell >
                                <TableCell className='table-font-size'>{list.designation}</TableCell >
                                <TableCell className='table-font-size'>{list.contact}</TableCell >
                                <TableCell className='table-font-size'>{list.location}</TableCell >
                                <TableCell className='table-font-size'>{list.lastnoteupdated}</TableCell >
                                <TableCell ><span>
                                    <Fab
                                        size='small'
                                        onClick={handleActionClick}
                                        className='action-buttons'
                                    >
                                        <MoreVertOutlinedIcon />
                                    </Fab>
                                    <Paper>
                                        <Menu
                                            open={Boolean(action)}
                                            onClose={handleActionClose}
                                            anchorEl={action}
                                        >
                                            <MenuItem onClick={handleSaveClick}>Save</MenuItem>
                                            <MenuItem onClick={handleEditClick}>Edit</MenuItem>
                                            <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
                                        </Menu>
                                    </Paper>
                                </span></TableCell >
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer >

            <Box p={5}>
                <Pagination
                    count={Math.ceil(filteredData.length / pageSize)}
                    page={page}
                    onChange={(event, value) => setPage(value)}
                    className='data-buttons'
                    variant='outlined'
                />
            </Box>
        </Stack>
    );
}

export default TableList