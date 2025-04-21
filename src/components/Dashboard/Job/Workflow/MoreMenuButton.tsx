import { useState } from 'react';
import { Button } from '../../../../shared/modules/MaterialImports/Button';
import { Menu, MenuItem } from '../../../../shared/modules/MaterialImports/Menu';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
const MoreMenuButton = ({ moreMenuData, moveToStage }: { moreMenuData: any, moveToStage: (nextStageId: string) => void }) => {


    const [moreMenuAnchorEl, setMoreMenuAnchorEl] = useState<null | HTMLElement>(null)
    const moreMenuOpen = Boolean(moreMenuAnchorEl);
    const openMoreMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setMoreMenuAnchorEl(event.currentTarget);
    };

    const closeMoreMenu = () => {
        setMoreMenuAnchorEl(null);
    };
    return <>
        <Button
            size='small'
            id={`more-button-${moreMenuData.candid}`}
            aria-controls={moreMenuOpen ? `more-menu-${moreMenuData.candid}` : undefined}
            aria-haspopup="true"
            aria-expanded={moreMenuOpen ? "true" : undefined}
            onClick={openMoreMenu}
        >
            <MoreHorizIcon className='fs-16' />
        </Button>
        <Menu
            id={`more-menu-${moreMenuData.candid}`}
            anchorEl={moreMenuAnchorEl}
            open={moreMenuOpen}
            onClose={closeMoreMenu}
            MenuListProps={{
                'aria-labelledby': `more-button-${moreMenuData.candid}`,
            }}
        >
            {
                moreMenuData.nextStageList.map((stage: any) => {
                    return <MenuItem
                        key={stage.stageId}
                        onClick={() => {
                            closeMoreMenu();
                            moveToStage(stage.stageId);
                        }}
                    >
                        {(stage.title) ? stage.title : stage.name}
                    </MenuItem>
                })
            }
        </Menu>
    </>
}
export default MoreMenuButton;