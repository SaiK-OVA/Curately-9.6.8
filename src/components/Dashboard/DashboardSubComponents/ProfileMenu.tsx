import { React, useEffect, useState, lazy } from '../../../shared/modules/React';

import { Divider } from './../../../shared/modules/MaterialImports/Divider';
import { ListItemIcon, ListItemText } from './../../../shared/modules/MaterialImports/List';
import { Menu, MenuItem } from './../../../shared/modules/MaterialImports/Menu';
import { Avatar } from '../../../shared/modules/MaterialImports/Avatar';
import LockIcon from '@mui/icons-material/Lock';
import LogoutIcon from '@mui/icons-material/Logout';
import ExtensionOutlinedIcon from '@mui/icons-material/ExtensionOutlined';
import { userLocalData } from '../../../shared/services/userData';
import { useAuth0 } from '@auth0/auth0-react';
import { useAuth } from '../../../shared/services/auth/validating';
import { useNavigate } from 'react-router-dom';

import { cookieStore } from '../../../shared/services/cookies/cookies';
const ChangePassword = lazy(() => import('../../../shared/components/ChangePassword/ChangePassword'));

const ProfileMenu = () => {

    const { isAuthenticated, logout } = useAuth0();
    let navigate = useNavigate();
    let auth = useAuth();
    const signOut = () => {
        // let path = `newPath`;
        if (isAuthenticated) {
            logout({
                logoutParams: {
                    returnTo: `${window.location.origin}${window.location.pathname}#/logout`,
                },
            });
        } else {
            auth.signOut(() => {
                if (cookieStore.getCookie('extensionClient')) {
                    navigate("/#/signin");
                } else {
                    navigate("/#/login");
                }
            })
        }
        // navigate(path);
    }

    const [fullName, setFullName] = useState("");
    const [nameMenuElement, setNameMenuElement] = React.useState<null | HTMLElement>(null);
    const openDashName = Boolean(nameMenuElement);
    const nameClick = (event: React.MouseEvent<HTMLElement>) => {
        setNameMenuElement(event.currentTarget);
    };
    const nameClose = () => {
        setNameMenuElement(null);
    };

    const getShortName = (name: string) => {
        let tempNameArray = name.split(' ');
        if (tempNameArray.length > 1) {
            return {
                children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
            };
        } else if (tempNameArray.length === 1) {
            return {
                children: `${name.split(' ')[0][0]}${name.split(' ')[0][1]}`,
            };

        } else {
            return {
                children: ``,
            };
        }
    }
    const [passwordModalOpen, setPasswordModalOpen] = useState(false);

    useEffect(() => {
        setFullName(userLocalData.getvalue('recrFullName'));
    }, [])

    return <>

        <Avatar
            {...getShortName(fullName)}
            id="dash-name-button"
            aria-controls={openDashName ? 'dash-name-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openDashName ? 'true' : undefined}
            onClick={nameClick}
            className={openDashName ? 'opened' : ''}
        ></Avatar>
        <Menu
            id="dash-name-menu"
            aria-labelledby="dash-name-button"
            anchorEl={nameMenuElement}
            open={openDashName}
            onClose={nameClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
        >
            <MenuItem onClick={nameClose} className='fullName'>{fullName}</MenuItem>
            <Divider className='my-0' />
            {/* <MenuItem onClick={nameClose}>My account</MenuItem> */}

            {/* <MenuItem onClick={() => { goToRefer(); nameClose(); }} >
        <ListItemIcon>
            <BoltIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Refer</ListItemText>
    </MenuItem> */}
            <Divider className='my-0' />
            {/* <MenuItem onClick={nameClose}>My account</MenuItem> */}
            <Divider className='my-0' />
            <MenuItem onClick={() => {
                setPasswordModalOpen(true);
                setNameMenuElement(null);
            }}>
                <ListItemIcon>
                    <LockIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Change Password</ListItemText>
            </MenuItem>
            {
                userLocalData.isChromeExtensionEnabled() ?
                    <MenuItem onClick={() => {
                        window.open('https://chromewebstore.google.com/detail/curatelyai/bllnefaigeffjgfhpgkpacnlbbldbblm');
                    }}>
                        <ListItemIcon>
                            <ExtensionOutlinedIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Install Chrome Extension</ListItemText>
                    </MenuItem>
                    :
                    null
            }

            <MenuItem onClick={signOut} >
                <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Sign Out</ListItemText>
                {/* <Button startIcon={<LogoutIcon />} onClick={logout}>Sign Out</Button> */}
            </MenuItem>
        </Menu>

        {
            (passwordModalOpen) ?
                <ChangePassword
                    open={passwordModalOpen}
                    closePopup={() => setPasswordModalOpen(false)}
                /> : null
        }
    </>
}


export default ProfileMenu;