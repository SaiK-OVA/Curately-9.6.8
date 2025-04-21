


import { SortableList } from "./SortableList";
import { useState } from "react";
import { ReactComponent as DragIcon } from "./drag_indicator.svg";

// import DragHandleIcon from '@mui/icons-material/DragHandle';

import './DndKit.scss';


const DndKit = (
  { stages }: { stages: any }
) => {
  /* -------------------------
      STATE
  ------------------------- */

  const [items, setItems] = useState(stages);

  /* -------------------------
      RENDER
  ------------------------- */

  return (
    <div className="DndKit">
      <ul className="StageList" style={{ overflow: "auto" }}>
        <SortableList
          items={items}
          getItemId={(stage: any) => stage.stageId}
          isDisabled={(stage: any) => stage.number === "1"}
          renderItem={({
            item,
            isActive,
            isDragged,
            ref,
            props,
            handleProps
          }) => {
            let className = "StageCard";
            if (isActive) className += " isActive";
            if (isDragged) className += " isDragged";

            return (
              <li ref={ref} key={item.stageId} className={className} {...props}>
                {/* @ts-ignore */}
                <DragIcon className="handle" {...handleProps} />
                {(item.title) ? item.title : item.name}
              </li>
            );
          }}
          onSort={(oldIndex, newIndex) => {
            const newItems = items.slice();
            newItems.splice(newIndex, 0, newItems.splice(oldIndex, 1)[0]);
            setItems(newItems);
          }}
        />
      </ul>
    </div>
  );
}

export default DndKit;
