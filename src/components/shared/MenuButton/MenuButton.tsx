// import React from 'react';
import { Button } from '../../../shared/modules/MaterialImports/Button';
import { List, ListItem, ListItemButton, ListItemText } from '../../../shared/modules/MaterialImports/List';
import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import HoverPopover from 'material-ui-popup-state/HoverPopover';
import {
    usePopupState,
    bindHover,
    bindPopover,
} from 'material-ui-popup-state/hooks';
import './MenuButton.scss'


const MenuButton = (props: any) => {
    // const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    // const open = Boolean(anchorEl);
    // const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    //     setAnchorEl(event.currentTarget);
    // };
    // const handleClose = () => {
    //     setAnchorEl(null);
    // };
    const popupState = usePopupState({
        variant: 'popover',
        popupId: 'demoPopover',
    })

    let navigate = useNavigate();
    const routeChange = (path: string) => {
        // let path = `newPath`;
        popupState.close();
        navigate(path);
    }
    if (props.headObject.children) {
        return (
            <div>
                <Button
                    className="c-white mr-2"
                    {...bindHover(popupState)}
                >
                    {props.headObject.label}
                </Button>
                <HoverPopover
                    {...bindPopover(popupState)}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >
                    <List id={props.headObject.label}>
                        {props.headObject.children.map((menu: any) =>
                            <ListItem disablePadding className='listItem' key={menu.id} >
                                <ListItemButton onClick={() => { routeChange(menu.route) }} >
                                    <ListItemText primary={menu.label} />
                                </ListItemButton>
                            </ListItem>
                        )}
                    </List>
                    {/* <Menu
                        id={props.headObject.label}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        {props.headObject.children.map((menu: any) =>
                            <MenuItem onClick={() => { routeChange(menu.route) }} key={menu.label}>{menu.label}</MenuItem>
                        )}
                    </Menu> */}
                </HoverPopover>
            </div>
        );
    } else {
        return (
            <div>
                <Button className="c-white mr-2" onClick={() => { routeChange(props.headObject.route) }} >
                    {props.headObject.label}
                </Button>
            </div>
        )
    }
}

export default MenuButton;