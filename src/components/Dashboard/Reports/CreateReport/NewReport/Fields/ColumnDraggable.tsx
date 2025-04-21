import { useDraggable } from "@dnd-kit/core";
import { FC } from "react";
import styles from "./ColumnDraggable.module.css";
import { CSS } from "@dnd-kit/utilities";
import { DndProvider, useDrag, useDrop } from 'react-dnd';
// import Accordion from '@mui/material/Accordion';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import Typography from '@mui/material/Typography';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface IColumnDraggable {
  children: string;
}


const ColumnDraggable: React.FC<IColumnDraggable> = (props) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'LIST_ITEM',
    item: { id: props.children, data: { title: props.children } },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
      opacity: 1
    }),

  });

  return (
    <div
      ref={drag}
      className={styles["Column-item"]}
      style={{
        cursor: 'move',
        // padding: "2px",
        // paddingBottom:'8px',
        // marginTop: '4px',
        //  border :'1px solid lightgray',
        // marginBottom: '4px',
        // cursor: 'move',
        // marginBottom: 8,
        // padding: 8,
      }}
    >
      {props.children}
    </div>
  );
};


export default ColumnDraggable;