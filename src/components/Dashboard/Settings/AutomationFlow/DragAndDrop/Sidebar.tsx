import {Chip} from "../../../../../shared/modules/MaterialImports/Chip";
import masterNodesList from "../Stages";
import {Button} from "../../../../../shared/modules/MaterialImports/Button";
import { shallow } from "zustand/shallow";
import useStore, { NODE_STATE } from "../NodeStore";


const nodeSelector = (stage: NODE_STATE) => ({
    customStagesList: stage.customStagesList
});

const SideBar = ({ saveFlow }: { saveFlow: () => void }) => {
    const onDragStart = (event: any, id: string, isCustomStage: 0 | 1) => {
        event.dataTransfer.setData('application/reactflow', id);
        event.dataTransfer.setData('isCustomStage', isCustomStage);
        event.dataTransfer.effectAllowed = 'move';
    };

    const { customStagesList } = useStore(nodeSelector, shallow);


    return (
        <aside className="">
            {/* <div className="description">You can drag these nodes to the pane on the right.</div> */}
            <div className="py-2">
                <div className="">
                    <Button onClick={saveFlow} variant="outlined" color="secondary">Save</Button>
                </div>
                {/* dndnode ${item.type} */}
                {
                    masterNodesList.map((item) => {
                        return (
                            <Chip className={`cursor-pointer w-100 mt-5`} color={`${(item.type === 'default') ? 'primary' : (item.type === 'input') ? 'success' : 'error'}`} variant={`outlined`} onDragStart={(event) => onDragStart(event, `${item.stageId}`, 0)} draggable label={item.name} key={`${item.stageId + item.name}`} icon={item.icon} sx={{ paddingLeft: '20px', justifyContent: 'flex-start' }} />
                        )
                    })
                }
                <div className="mt-3">
                    {
                        customStagesList.map((item) => {
                            return (
                                <Chip className={`cursor-pointer w-100 mt-5`} color={`${(item.type === 'default') ? 'warning' : (item.type === 'input') ? 'success' : 'error'}`} variant={`outlined`} onDragStart={(event) => onDragStart(event, `${item.id}`, 1)} draggable label={item.name} key={`${item.id + item.name}`} icon={item.icon} sx={{ paddingLeft: '20px', justifyContent: 'flex-start' }} />
                            )
                        })
                    }
                </div>
            </div>
            {/* <div className="dndnode input mt-5" onDragStart={(event) => onDragStart(event, 'input')} draggable>
                Input Node
            </div>
            <div className="dndnode" onDragStart={(event) => onDragStart(event, 'default')} draggable>
                Default Node
            </div>
            <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'output')} draggable>
                Output Node
            </div> */}
        </aside>
    );
};

export default SideBar;