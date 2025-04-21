import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Dnd from './React-Dnd';

const Wrapper = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Dnd />
    </DndProvider>
  );
};

export default Wrapper;
