import {React} from '../../../../../../../shared/modules/React';
import { styled, alpha } from '@mui/material/styles';
import {Box} from '../../../../../../../shared/modules/MaterialImports/Box';
import Paper from '@mui/material/Paper';
import {Menu,MenuItem} from '../../../../../../../shared/modules/MaterialImports/Menu';
import EditIcon from '@mui/icons-material/Edit';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import './Menu.scss';
const StyledMenu = styled((props: any) => (
    <Menu
        elevation={0}

        PaperProps={{
            style: {
                maxHeight: "250px",
            },
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: 0,
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow: 'rgba(15, 15, 15, 0.05) 0px 0px 0px 1px, rgba(15, 15, 15, 0.1) 0px 3px 6px, rgba(15, 15, 15, 0.2) 0px 9px 24px',
        '& .MuiMenu-list': {
            padding: '0px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));
interface MenuProps {
    anchorElement: any;
    handleMenuClose: (value: any) => void
}
const MenuComponent: React.FC<MenuProps> = ({ anchorElement, handleMenuClose }) => {
    const open = Boolean(anchorElement);
    const handleClose = () => {
        handleMenuClose(null)
    };
    return (
        <div>
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorElement}
                open={open}
                onClose={handleClose}

            >
                <Box className="menu-header">input blocks</Box>
                <Paper className="menu-list-cls">

                    <MenuItem onClick={handleClose} disableRipple>
                        <EditIcon className="icon-cls" />
                        Short answer
                    </MenuItem>
                    <MenuItem onClick={handleClose} disableRipple>
                        <FileCopyIcon className="icon-cls" />
                        Long answer
                    </MenuItem>

                    <MenuItem onClick={handleClose} disableRipple>
                        <ArchiveIcon className="icon-cls" />
                        Multiple choices
                    </MenuItem>
                    <MenuItem onClick={handleClose} disableRipple>
                        <MoreHorizIcon className="icon-cls" />
                        Checkboxes
                    </MenuItem>
                    <MenuItem onClick={handleClose} disableRipple>
                        <MoreHorizIcon className="icon-cls" />
                        Dropdown
                    </MenuItem>
                    <MenuItem onClick={handleClose} disableRipple>
                        <MoreHorizIcon className="icon-cls" />
                        Multiselect
                    </MenuItem>
                    <MenuItem onClick={handleClose} disableRipple>
                        <MoreHorizIcon className="icon-cls" />
                        Number
                    </MenuItem>

                </Paper>
            </StyledMenu>
        </div>
    );
}

export default MenuComponent