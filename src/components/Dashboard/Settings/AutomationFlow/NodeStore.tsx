import { createWithEqualityFn } from 'zustand/traditional';
import {
    Connection,
    Edge,
    EdgeChange,
    Node,
    NodeChange,
    addEdge,
    OnNodesChange,
    OnEdgesChange,
    OnConnect,
    applyNodeChanges,
    applyEdgeChanges,
} from 'reactflow';
import DnsOutlinedIcon from '@mui/icons-material/DnsOutlined';

// import initialNodes from './nodes';
// import initialEdges from './edges';

export interface Stage {
    name: string;
    type: string;
    id: string;
    stageId: string;
    duplicateId: string;
    icon: JSX.Element;
}


export type NODE_STATE = {
    nodes: Node[];
    edges: Edge[];
    customStagesList: Stage[];

    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
    setNodes: (nodes: Node[]) => void;
    setEdges: (edges: Edge[]) => void;
    addNode: (node: Node) => void;
    addMultipleNode: (nodes: Node[]) => void;
    addMultipleEdges: (edges: Edge[]) => void;
    updateNode: (id: string, editedNode: Node) => void;
    updateLabel: (id: string, stageLabel: string) => void;
    updateNodeData: (id: string, data: any) => void;
    removeNode: (id: string) => void;


    setCustomStages: (stages: Stage[]) => void;
    addCustomStage: (stage: Stage) => void;
    addMultipleCustomStage: (stages: Stage[]) => void;
    updateCustomStage: (id: string, editedStage: Stage) => void;
    removeCustomStage: (id: string) => void;
};

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useStore = createWithEqualityFn<NODE_STATE>((set, get) => ({
    nodes: [],
    edges: [],
    customStagesList: [],

    onNodesChange: (changes: NodeChange[]) => {
        set({
            nodes: applyNodeChanges(changes, get().nodes),
        });
    },
    onEdgesChange: (changes: EdgeChange[]) => {
        set({
            edges: applyEdgeChanges(changes, get().edges),
        });
    },
    onConnect: (connection: Connection) => {
        set({
            edges: addEdge(connection, get().edges),
        });
    },
    setNodes: (nodes: Node[]) => {
        set({ nodes });
    },
    setEdges: (edges: Edge[]) => {
        set({ edges });
    },
    addNode(node: Node) {
        set({
            nodes: [...get().nodes, node],
        });
    },
    addMultipleNode(nodes: Node[]) {
        set({
            nodes: [...get().nodes, ...nodes],
        });
    },
    addMultipleEdges(edges: Edge[]) {
        set({
            edges: [...get().edges, ...edges]
        })
    },
    updateNode(id: string, editedNode: Node) {
        set({
            nodes: get().nodes.map((node) => {
                if (node.id === id) {
                    return { ...editedNode };
                }
                return node;
            }),
        });
    },
    updateLabel(id: string, stageLabel: string) {
        set({
            nodes: get().nodes.map((node) => {
                if (node.id === id) {
                    return { ...node, data: { ...node.data, stageLabel } };
                }
                return node;
            }),
        });
    },
    updateNodeData(id: string, dataPassed: { stageLabel: string, formJsonData: any, isFormEnabled: boolean, stageId: string }) {
        const filteredStage = get().customStagesList.find(i => i.id === id);
        if (filteredStage?.id) {
            set({
                nodes: get().nodes.map((node) => {
                    if ((node.id === id) || (node.data.duplicateId === id)) {
                        return { ...node, data: { ...node.data, ...dataPassed } };
                    }
                    return node;
                }),
                customStagesList: get().customStagesList.map((i) => {
                    if (i.duplicateId === id) {
                        return {
                            ...{
                                ...i,
                                name: dataPassed.stageLabel
                            }
                        };
                    }
                    return i;
                }),
            });
        } else {
            set({
                nodes: get().nodes.map((node) => {
                    if (node.id === id) {
                        return { ...node, data: { ...node.data, ...dataPassed } };
                    }
                    return node;
                }),
                customStagesList: [...get().customStagesList, {
                    id: id,
                    stageId: dataPassed.stageId,
                    duplicateId: id,
                    name: dataPassed.stageLabel,
                    type: "default",
                    icon: <DnsOutlinedIcon />
                }],
            });
        }
        // set({
        //     nodes: get().nodes.map((node) => {
        //         if (node.id === id) {
        //             return { ...node, data: { ...node.data, ...dataPassed } };
        //         }
        //         return node;
        //     }),
        // });
    },
    removeNode(id: string) {
        set({
            nodes: get().nodes.filter((node) => {
                return node.id !== id;
            }),
        });
    },



    setCustomStages: (stages: Stage[]) => {
        set({ customStagesList: stages });
    },
    addCustomStage(stage: Stage) {
        const filteredStage = get().customStagesList.find(i => i.id === stage.id);
        if (filteredStage?.id) {
            set({
                customStagesList: get().customStagesList.map((i) => {
                    if (i.id === stage.id) {
                        return { ...stage };
                    }
                    return i;
                }),
            });
        } else {
            set({
                customStagesList: [...get().customStagesList, stage],
            });
        }
    },
    addMultipleCustomStage(stages: Stage[]) {
        set({
            customStagesList: [...get().customStagesList, ...stages],
        });
    },
    updateCustomStage(id: string, editedStage: Stage) {
        set({
            customStagesList: get().customStagesList.map((stage) => {
                if (stage.id === id) {
                    return { ...editedStage };
                }
                return stage;
            }),
        });
    },
    removeCustomStage(id: string) {
        set({
            customStagesList: get().customStagesList.filter((stage) => {
                return stage.id !== id;
            }),
        });
    },
}));

export default useStore;