// import { ReactFlowProvider } from 'reactflow';
// import AddNodeOnEdgeDrop from './AddNodeOnEdgeDrop/AddNodeOnEdgeDrop';
import DragAndDrop from './DragAndDrop/DragAndDrop';

import './AutomationFlow.scss';
import { useEffect } from 'react';
import ApiService from '../../../../shared/api/api';



const AutomationFlow = () => {

    const saveAuditLog = (id: number) => {
        ApiService.saveAuditLog(id);
    }

    useEffect(() => {
        saveAuditLog(4294);
    }, []);

    return <div id="AutomationFlow">

        {/* <ReactFlowProvider> */}
        {/* <AddNodeOnEdgeDrop /> */}
        <DragAndDrop />
        {/* </ReactFlowProvider> */}
    </div>
}

export default AutomationFlow;