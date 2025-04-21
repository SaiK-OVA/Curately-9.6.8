import {
    Handle,
    Node,
    Position
} from 'reactflow';
import { MouseEvent} from 'react';
import {  useState } from './../../../../../shared/modules/React';


import useStore, { NODE_STATE } from '../NodeStore';
import { shallow } from 'zustand/shallow';
import {Grid, IconButton} from './../../../../../shared/modules/commonImports';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Tooltip } from './../../../../../shared/modules/MaterialImports/ToolTip';
import { confirmDialog } from '../../../../shared/ConfirmDialog/ConfirmDialog';
// import HorizontalRuleOutlinedIcon from '@mui/icons-material/HorizontalRuleOutlined';
import {Menu, MenuItem} from './../../../../../shared/modules/MaterialImports/Menu';
import {ListItemText, ListItemIcon} from './../../../../../shared/modules/MaterialImports/List';

import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import NodeModal from './NodeModal/NodeModal';
// import masterNodesList from '../Stages';
import AddNodesModal from './AddNodeModal/AddNodeModal';
import DnsOutlinedIcon from '@mui/icons-material/DnsOutlined';
import masterNodesList from '../Stages';

import './CustomNode.scss';


const selector = (state: NODE_STATE) => ({
    // updateLabel: state.updateLabel,
    removeNode: state.removeNode
});

const CustomNode = ({ data, isConnectable }: { data: Node["data"], isConnectable: boolean }) => {
    const { removeNode } = useStore(selector, shallow);

    const [openEdit, setOpenEdit] = useState(false);
    const [openAddPop, setOpenAddPop] = useState(false);
    // console.log(data);


    const [nodeMenuElement, setNodeMenuElement] = useState<null | HTMLElement>(null);
    const open = Boolean(nodeMenuElement);
    const openNodeMenu = (event: MouseEvent<HTMLButtonElement>) => {
        setNodeMenuElement(event.currentTarget);
    };


    const closeNodeMenu = () => {
        setNodeMenuElement(null);
    };

    const selectedIcon = masterNodesList.find((i) => i.stageId === data.stageId)?.stageId ? masterNodesList.find((i) => i.stageId === data.stageId)?.icon : <DnsOutlinedIcon />;
    // console.log(selectedIcon);


    return (
        <div id="CustomNode" className={`${data.customStage ? 'customStage' : ''} ${data.hideNode ? 'd-none' : ''}`}>
            <Tooltip title={data.stageLabel ? data.stageLabel : data.stageName} placement='bottom' >
                <div className="text-updater-node">
                    {
                        ((data.type === "default") || (data.type === "output")) ?
                            <Handle type="target" position={Position.Left} isConnectable={isConnectable} />
                            :
                            null
                    }
                    <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        className='centerNodeGrid'
                    >
                        <span className='customDragHandle'><DragIndicatorIcon /></span>
                        {/* <label htmlFor="text">Text:</label> */}
                        <span className='nodeIcon'>{selectedIcon}</span>
                        <span className='nodeName'>{data.stageLabel}</span>
                        {/* <input id="text" name="text" onChange={labelInputUpdate} value={data.stageLabel} /> */}
                        <IconButton
                            id="node-menu-button"
                            aria-controls={open ? 'node-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={openNodeMenu}
                            className={`${(data.stageLabel === "Trigger") ? 'd-none' : ''}`}
                        >
                            <MoreHorizOutlinedIcon />
                        </IconButton >
                        {/* <div className='horizontalRule'></div>
                        <IconButton
                            id="node-add-button"
                            className="node-add-button"
                            aria-controls={open ? 'node-add' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={() => { setOpenAddPop(true); }}
                        >
                            <AddIcon />
                        </IconButton > */}
                        <Menu
                            id="node-add"
                            anchorEl={nodeMenuElement}
                            open={open}
                            onClose={closeNodeMenu}
                            MenuListProps={{
                                'aria-labelledby': 'node-button',
                            }}
                        >
                            <MenuItem onClick={() => {
                                closeNodeMenu();
                                confirmDialog(`Are you sure you want to remove - ${data.stageLabel}`, () => removeNode(data.id), 'warning');
                            }}>
                                <ListItemIcon>
                                    <DeleteOutlineOutlinedIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Delete</ListItemText>
                            </MenuItem>
                            {
                                data.customStage ?
                                    null
                                    :
                                    <MenuItem onClick={() => {
                                        closeNodeMenu();
                                        setOpenEdit(true);
                                    }}>
                                        <ListItemIcon>
                                            <EditOutlinedIcon fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText>Edit</ListItemText>
                                    </MenuItem>

                            }
                        </Menu>
                    </Grid>
                    {/* <Handle
                        type="source"
                        position={Position.Bottom}
                        id="a"
                        style={handleStyle}
                        isConnectable={isConnectable}
                    /> */}
                    {
                        (((data.type === "input") || (data.type === "default") && !data.customStage)) ?
                            <Handle type="source" position={Position.Right} id="b" isConnectable={isConnectable} />
                            :
                            null
                    }
                </div>
            </Tooltip>

            {
                openEdit && (
                    <NodeModal
                        open={openEdit}
                        closePopup={() => { setOpenEdit(false) }}
                        nodeData={data}
                    />
                )
            }
            {
                openAddPop && (
                    <AddNodesModal
                        open={openAddPop}
                        closePopup={() => { setOpenAddPop(false) }}
                        nodeData={data}
                    />
                )
            }
        </div>
    )
}

export default CustomNode;