// import React from 'react';

import AppBar from '@mui/material/AppBar';
// import Button from '@mui/material/Button';
import MenuButton from '../MenuButton/MenuButton';
// import { Link } from 'react-router-dom';

import './Header.scss';
import { HeaderList } from './HeaderList';
import { Grid } from '../../../shared/modules/commonImports';


const Header = () => {
    return (
        <AppBar position="static">

            <Grid container direction="row" justifyContent="center" alignItems="center" className='px-4'>
                {HeaderList.map((menu) => <MenuButton headObject={menu} key={menu.label} />)}
            </Grid>
        </AppBar>
    );
}

export default Header;