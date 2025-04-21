// import React from 'react';
import { Dialog, DialogTitle, CloseIcon } from "../../../shared/modules/MaterialImports/Dialog";
import { List, ListItem, ListItemText }  from "../../../shared/modules/MaterialImports/List";

import { masterDashboardList } from './cardsData';
import './SideMenu.scss';
import {Grid, IconButton} from '../../../shared/modules/commonImports';
// import Slide from '@mui/material/Slide';
// import { TransitionProps } from '@mui/material/transitions';

export interface SimpleDialogProps {
    open: boolean;
    onClose: (value: any) => void;
}
function SideMenu(props: SimpleDialogProps) {
    const { onClose, open } = props;

    const handleClose = () => {
        onClose('');
    };

    const handleListItemClick = (value: string) => {
        onClose(value);
    };
    // const Transition = React.forwardRef(function Transition(
    //     props: TransitionProps & {
    //       children: React.ReactElement<any, any>;
    //     },
    //     ref: React.Ref<unknown>,
    //   ) {
    //     return <Slide direction="left" ref={ref} {...props} />;
    //   });

    return (
        <div className='sideMenu'>
            <Dialog onClose={handleClose} open={open} PaperProps={{ sx: { position: "fixed", top: 108, right: 0, m: 0 } }} >
                {/* TransitionComponent={Transition} */}
                <DialogTitle sx={{ padding: '0px' }}>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        className='headerGrid p-2 pl-5'
                    >

                        <span className='addHeader pl-2'>Manage Card</span>
                        <IconButton
                            aria-label="close"
                            onClick={handleClose}
                            className="closeBtn"
                        >
                            <CloseIcon />
                        </IconButton>
                    </Grid>
                </DialogTitle>

                <List sx={{ pt: 1, height: 'calc(100vh - 168px)', overflow: 'auto'}}>
                    {masterDashboardList.map((dashCard: any) => (
                        <div className='sideMenu'>
                            <ListItem button onClick={() => handleListItemClick(dashCard)} key={dashCard.id}>
                                <ListItemText primary={dashCard.title} />
                            </ListItem>
                        </div>
                    ))}
                </List>

            </Dialog>
        </div>
    );
}

export default SideMenu;