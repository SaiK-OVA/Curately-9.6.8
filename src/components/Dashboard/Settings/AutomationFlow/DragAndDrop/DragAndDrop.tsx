import { useState, useRef, useCallback, useEffect } from '../../../../../shared/modules/React';
import ReactFlow, {
    // ReactFlowProvider,
    // addEdge,
    // useNodesState,
    // useEdgesState,
    Controls,
    ReactFlowInstance,
    getIncomers,
    getOutgoers,
    getConnectedEdges,
    Edge,
    // ConnectionLineType,
    ProOptions,
    // Connection,
} from 'reactflow';
import { shallow } from 'zustand/shallow';

import Sidebar from './Sidebar';

import masterNodesList from '../Stages';
import CustomNode from '../CustomNode/CustomNode';
import { v4 as uuidv4 } from 'uuid';

import useStore, { NODE_STATE, Stage } from '../NodeStore';
import CustomEdge from '../CustomEdge/CustomEdge';

import ApiService from '../../../../../shared/api/api';
import { userLocalData } from '../../../../../shared/services/userData';
import { trackPromise } from '../../../../../shared/modules/PromiseTrackter';
import { showToaster } from '../../../../shared/SnackBar/SnackBar';

import DnsOutlinedIcon from '@mui/icons-material/DnsOutlined';
import { debounce } from 'lodash'

import 'reactflow/dist/style.css';
import './DragAndDrop.scss';

const nodeSelector = (state: NODE_STATE) => ({
    nodes: state.nodes,
    edges: state.edges,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    onConnect: state.onConnect,
    setNodes: state.setNodes,
    setEdges: state.setEdges,
    addNode: state.addNode,
    addMultipleNode: state.addMultipleNode,
    customStagesList: state.customStagesList,
    setCustomStages: state.setCustomStages
});



// const initialNodes: {
//     name: string;
//     stageLabel: string;
//     formJsonData: any;
//     type: string;
//     id: number;
// }[] = [
//         // {
//         //     id: '1',
//         //     type: 'input',
//         //     data: { stageLabel: 'input node' },
//         //     position: { x: 250, y: 5 },
//         // },
//     ];

// let id = 0;
// const getId = () => `dndnode_${id++}`;
const nodeTypes = {
    input: CustomNode,
    default: CustomNode,
    output: CustomNode,

};
const edgeTypes = {
    buttonedge: CustomEdge,
};


const DnDFlow = () => {

    const { nodes, edges, onNodesChange, onEdgesChange, onConnect, addNode, addMultipleNode, setNodes, setEdges, customStagesList, setCustomStages } = useStore(nodeSelector, shallow);

    const triggerAdded = useRef(false);
    const proOptions: ProOptions = { account: 'paid-pro', hideAttribution: true };

    // const customStagesList = useStore((state) => state.customStagesList);

    const reactFlowWrapper = useRef(null);
    // const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    // const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance>();
    // const [maxAutoId, setMaxAutoId] = useState(1);

    // const onConnect = useCallback(
    //     (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    //     [],
    // );

    // useEffect(() => {
    //     console.log(nodes);
    // }, [nodes]);
    // useEffect(() => {
    //     console.log(edges);
    // }, [edges]);
    // useEffect(() => {
    //     console.log(customStagesList);
    // }, [customStagesList]);
    useEffect(() => {
        getNodesList();
        // addDefaultNode();
    }, []);

    const getNodesList = useCallback(debounce(() => {
        trackPromise(
            ApiService.getById('admin', 'getshortListBar', userLocalData.getvalue('clientId')).then((resp) => {
                if (resp.data.List?.length) {
                    if (resp.data.List[0]?.reactflowJSON && resp.data.List[0]?.reactflowJSON && JSON.parse(resp.data.List[0]?.reactflowJSON)?.nodes) {
                        let tempNodes = JSON.parse(resp.data.List[0]?.reactflowJSON)?.nodes;
                        console.log(JSON.parse(resp.data.List[0]?.reactflowJSON)?.nodes);
                        setNodes(tempNodes);
                        setEdges(JSON.parse(resp.data.List[0]?.reactflowJSON)?.edges);
                        // const max = tempNodes.reduce((prev: { data: { autoId: number } }, current: { data: { autoId: number } }) => {
                        //     return (prev && current.data.autoId && prev.data.autoId && prev.data.autoId > current.data.autoId) ? prev : current
                        // });
                        let checkMaxAuto = [...tempNodes].filter((o: { data: { autoId: number } }) => Number(o.data.autoId) < 6000);
                        const max = Math.max(...checkMaxAuto.map((o: { data: { autoId: number } }) => o.data.autoId), 0);
                        // setMaxAutoId(max);
                        // setMaxAutoId(JSON.parse(resp.data.List[0]?.reactflowJSON)?.maxAutoId || 1);

                        // setTimeout(() => {
                        //     if (JSON.parse(resp.data.List[0]?.reactflowJSON)?.nodes.length > 4) {
                        //         reactFlowInstance?.fitView();
                        //     }
                        // }, 2000);
                        let tempHiddenStages = [];
                        for (let tn = 0; tn < tempNodes.length; tn++) {
                            if (tempNodes[tn]?.data.hideNode || tempNodes[tn]?.data?.hasOwnProperty("customStage")) {
                                tempHiddenStages.push({
                                    id: tempNodes[tn].id,
                                    stageId: tempNodes[tn].data.stageId,
                                    duplicateId: tempNodes[tn].id,
                                    name: tempNodes[tn].data.stageLabel,
                                    type: "default",
                                    icon: <DnsOutlinedIcon />
                                });
                            }
                        }
                        if (tempHiddenStages.length) {
                            setCustomStages(tempHiddenStages);
                        }
                    } else {
                        addDefaultNode();
                    }
                } else {
                    addDefaultNode();
                }
            })
        )
    }, 600),
        []
    );

    // const csl = customStagesList;


    const onDragOver = useCallback((event: { preventDefault: () => void; dataTransfer: { dropEffect: string; }; }) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    // const getAllStages = () => {
    //     return [...masterNodesList, ...customStagesList]
    // }

    const onDrop = useCallback(
        (event: { preventDefault: () => void; dataTransfer: { getData: (arg0: string) => any; }; clientX: any; clientY: any; }, list: Stage[]) => {
            event.preventDefault();

            const tempId = event.dataTransfer.getData('application/reactflow');
            const isCustomStage = Boolean(Number(event.dataTransfer.getData('isCustomStage')));

            // check if the dropped element is valid
            if (typeof tempId === 'undefined' || !tempId) {
                return;
            }
            var nodeToAdd = [...masterNodesList].find((item) => "" + item.stageId === "" + tempId);
            if (nodeToAdd && nodeToAdd.name) {
            } else {
                nodeToAdd = [...list].find((item) => "" + item.id === "" + tempId);
            }
            if (nodeToAdd && nodeToAdd.name) {

                // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
                // and you don't need to subtract the reactFlowBounds.left/top anymore
                // details: https://reactflow.dev/whats-new/2023-11-10
                if (reactFlowInstance?.screenToFlowPosition) {
                    const position = reactFlowInstance?.screenToFlowPosition({
                        x: event.clientX,
                        y: event.clientY,
                    });
                    const type = nodeToAdd.type;
                    // let id = getId();
                    let id = uuidv4();
                    const newNode = {
                        id: id,
                        type,
                        position,
                        data: {
                            duplicateId: nodeToAdd?.duplicateId ? nodeToAdd.duplicateId : "",
                            customStage: isCustomStage,
                            stageId: `${nodeToAdd.stageId}`, // static
                            id: `${id}`, // Random ID
                            stageName: `${nodeToAdd.name}`, // static
                            stageLabel: `${nodeToAdd.name}`,
                            isFormEnabled: false,
                            formJsonData: [],
                            nextStagesList: [],
                            type,
                            isCustomForm: false,
                            customFormId: ""
                        },
                        dragHandle: ".customDragHandle"
                    };

                    addNode(newNode);
                    // setNodes((nds) => nds.concat(newNode));
                    // setNodes((nds) => { ...nds, nodes: nds.nodes.concat(newNodes) })
                }
            } else {
                return
            }
        },
        [reactFlowInstance],
    );

    const onNodesDelete = useCallback(
        (deleted: any) => {
            setEdges(
                deleted.reduce((acc: any, node: any) => {
                    const incomers = getIncomers(node, nodes, edges);
                    const outgoers = getOutgoers(node, nodes, edges);
                    const connectedEdges = getConnectedEdges([node], edges);

                    const remainingEdges = acc.filter((edge: Edge) => !connectedEdges.includes(edge));

                    const createdEdges = incomers.flatMap(({ id: source }) =>
                        outgoers.map(({ id: target }) => ({ id: `${source}->${target}`, source, target }))
                    );

                    return [...remainingEdges, ...createdEdges];
                }, edges)
            );
        },
        [nodes, edges]
    );
    // const addNewNode = useCallback(() => {
    //     const newNode: Node<NodeData> = {
    //         id: `${getUniqueId(10)}`,
    //         data: { color: `red` },
    //         type: "customInput",
    //         position: {
    //             x: 100,
    //             y: 100,
    //         },
    //         style: {
    //             width: 150,
    //         },
    //     };
    //     addNode(newNode);
    // }, [addNode]);

    const saveFlow = () => {
        let tempNodes = [...nodes];
        // let isDuplicateName = tempNodes.some((el) => el.data.stageName === el.data.stageLabel);

        // const unique = [...tempNodes].filter(
        //     (obj, index) =>
        //         tempNodes.findIndex((item) => item.data.stageLabel === obj.data.stageLabel) === index
        // );
        // console.log(unique);


        tempNodes = tempNodes.filter(
            (obj) => !obj.data.duplicateId
        )

        console.log(tempNodes);

        const notUnique = [...tempNodes].filter(
            (obj, index) =>
                tempNodes.findIndex((item) => item.data.stageLabel === obj.data.stageLabel) !== index
        );
        console.log(notUnique);
        if (notUnique.length) {
            showToaster(`Node Name must be unique. Please update ${notUnique[0].data.stageLabel}`, 'error');
        } else {
            // if (edges.length) {
            let tempAutos = [];
            for (let el = 0; el < tempNodes.length; el++) {
                if (Number(tempNodes[el].data.autoId) > 900) {
                    tempNodes[el].data.autoId = "";
                }
            }
            let autoIdNumber = 1000;
            for (let el = 0; el < tempNodes.length; el++) {
                // if (!tempNodes[el].data.autoId) {
                //     autoIdNumber = Math.ceil(autoIdNumber / 1000) * 1000;
                // }
                if (!tempNodes[el].data.autoId) {
                    tempNodes[el].data.autoId = autoIdNumber;
                    tempAutos.push({ autoId: autoIdNumber, name: tempNodes[el].data.stageLabel });
                    autoIdNumber = autoIdNumber + 1;
                }
                let filteredEdges = edges.filter((edge: Edge) => edge.source === tempNodes[el].id);


                // if (filteredEdges.length) {
                //     if (autoIdNumber % 1000 === 0) {
                //         autoIdNumber = autoIdNumber + 1000;
                //     } else {
                //         autoIdNumber = Math.ceil(autoIdNumber / 1000) * 1000;
                //     }
                // }
                for (let fe = 0; fe < filteredEdges.length; fe++) {
                    let sourceIndex = tempNodes.findIndex((node) => node.id === filteredEdges[fe].target)
                    if (sourceIndex !== -1) {
                        if (!tempNodes[sourceIndex].data.autoId) {
                            tempAutos.push({ autoId: autoIdNumber, name: tempNodes[sourceIndex].data.stageLabel });
                            tempNodes[sourceIndex].data.autoId = autoIdNumber;
                            autoIdNumber = autoIdNumber + 1;
                        }
                    }
                }

                tempNodes[el].data.nextStagesList = filteredEdges.map((edge: Edge) => edge.target);


            }
            // setMaxAutoId(autoIdNumber);
            // console.log(JSON.stringify(tempNodes));
            console.log(tempAutos);

            let tempStages: {
                stageId: number;
                nodeId: string;
                statusId: number;
                label: string;
                isForm: boolean;
            }[] = [];
            for (let tn = 0; tn < tempNodes.length; tn++) {
                tempStages.push({
                    "stageId": Number(tempNodes[tn].data.stageId),
                    "nodeId": tempNodes[tn].id,
                    "statusId": tempNodes[tn].data.autoId,
                    "label": tempNodes[tn].data.stageLabel,
                    "isForm": tempNodes[tn].data.isFormEnabled
                });
            }
            // let tempEdges = [...edges];
            // for (let te = 0; te < tempEdges.length; te++) {
            //     tempEdges[te].type = "buttonedge";
            // }
            // console.log(nodes);
            // console.log(JSON.stringify({
            //     reactflowJSON: JSON.stringify({ nodes, edges }),
            //     userJSON: JSON.stringify({ nodes: tempNodes }),
            //     createBy: userLocalData.getvalue('recrId'),
            //     clientId: userLocalData.getvalue('clientId')
            // }));
            // console.log("tempStages");
            // console.log(tempStages);
            // return;
            trackPromise(
                ApiService.postWithData('admin', 'shortlistBarStages', {
                    "clientId": userLocalData.getvalue('clientId'),
                    "shortlistBarStages": tempStages
                }).then((response) => {
                    if (response.data.Success) {
                        trackPromise(
                            ApiService.postWithData('admin', 'shortlistbardetails', {
                                reactflowJSON: JSON.stringify({ nodes, edges }),
                                userJSON: JSON.stringify({ nodes: tempNodes }),
                                createBy: userLocalData.getvalue('recrId'),
                                clientId: userLocalData.getvalue('clientId')
                            }).then((res) => {
                                if (res.data.Success) {
                                    showToaster("Flow saved successfully", "success");
                                    saveAuditLog(4295);
                                } else {
                                    showToaster(res.data.Message, "error");
                                }

                            })
                        )
                    } else {
                        showToaster(response.data.Message, "error");
                    }

                })
            );
        }
    }
    const defaultEdgeOptions = {
        animated: false,
        type: 'buttonedge'
        // type: ConnectionLineType.SmoothStep,
        // type: ConnectionLineType.Step,
    };

    const addDefaultNode = () => {
        // let id = uuidv4();
        const stagesToAdd = [
            {
                id: "-1",
                name: "New",
                stageTypeButton: false,
                hideNode: true,
                autoId: -1
            },
            {
                id: "1",
                name: "View",
                stageTypeButton: false,
                hideNode: true,
                autoId: 1
            },
            {
                id: "10",
                name: "Shortlist",
                stageTypeButton: true,
                hideNode: false,
                autoId: 10
            },
            {
                id: "50",
                name: "Not Qualified",
                stageTypeButton: true,
                hideNode: true,
                autoId: 50
            },
        ];
        let nodesToAdd = [];
        let customStagesToAdd = [];
        for (let nn = 0; nn < stagesToAdd.length; nn++) {
            nodesToAdd.push({
                id: stagesToAdd[nn].id,
                type: "input",
                position: {
                    x: 70,
                    y: (screen.height / 2) - 150,
                },
                data: {
                    stageId: stagesToAdd[nn].id, // static
                    id: `${stagesToAdd[nn].id}`, // Random ID
                    stageName: stagesToAdd[nn].name, // static
                    stageLabel: stagesToAdd[nn].name,
                    isFormEnabled: false,
                    formJsonData: [],
                    nextStagesList: [],
                    type: "input",
                    autoId: stagesToAdd[nn].autoId,
                    hideNode: stagesToAdd[nn].hideNode,
                    stageTypeButton: stagesToAdd[nn].stageTypeButton
                },
                dragHandle: ".customDragHandle",
            });
            if (stagesToAdd[nn].hideNode) {
                customStagesToAdd.push({
                    id: stagesToAdd[nn].id,
                    stageId: stagesToAdd[nn].id,
                    duplicateId: stagesToAdd[nn].id,
                    name: stagesToAdd[nn].name,
                    type: "default",
                    icon: <DnsOutlinedIcon />
                });
            }

        }
        // let idShortlist = "10";
        // const newNode = { id: idShortlist, type: "input", position: { x: 70, y: (screen.height / 2) - 150, }, data: {        stageId: 10, // static id: `${idShortlist}`, // Random ID stageName: `Shortlist`, // static stageLabel: `Shortlist`, isFormEnabled: false, formJsonData: [], nextStagesList: [], type: "input", autoId: 1000, hideNode: false, stageTypeButton: true     },    dragHandle: ".customDragHandle",};
        if (!triggerAdded.current) {
            addMultipleNode(nodesToAdd);
            setCustomStages(customStagesToAdd);
        }
        triggerAdded.current = true;
    }

    useEffect(() => {

        // addDefaultNode();
        if (reactFlowInstance?.fitView && nodes.length > 3) {
            reactFlowInstance?.fitView();
        }
    }, [reactFlowInstance]);

    const saveAuditLog = (id: number) => {
        ApiService.saveAuditLog(id);
    }

    return (
        <div className="dndflow">
            {/* <ReactFlowProvider> */}
            {/* {
                customStagesList.map((i) => {
                    return <div>{i.name}</div>
                })
            } */}
            <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onNodesDelete={onNodesDelete}
                    onConnect={onConnect}
                    onInit={setReactFlowInstance}
                    onDrop={(e) => onDrop(e, customStagesList)}
                    onDragOver={onDragOver}
                    fitView={false}
                    nodeTypes={nodeTypes}
                    edgeTypes={edgeTypes}
                    // dir=''
                    // connectionLineType={ConnectionLineType.Straight}
                    defaultEdgeOptions={defaultEdgeOptions}
                    proOptions={proOptions}
                >
                    <Controls />
                </ReactFlow>
            </div>
            <Sidebar saveFlow={saveFlow} />
            {/* </ReactFlowProvider> */}
        </div>
    );
};

export default DnDFlow;
