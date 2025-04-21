import { useEffect, useState } from "./../../../../../../shared/modules/React";
import { Button } from "./../../../../../../shared/modules/MaterialImports/Button";
import { Grid } from "../../../../../../shared/modules/MaterialImports/Grid2";
import { Dialog, DialogContent, DialogTitle } from "./../../../../../../shared/modules/MaterialImports/Dialog";


import { shallow } from 'zustand/shallow';
import useStore, { NODE_STATE } from "../../NodeStore";
import { Edge, Node, Position } from "reactflow";

import { v4 as uuidv4 } from 'uuid';

// import FormLabel from '@mui/material/FormLabel';
// import FormControl from '@mui/material/FormControl';
// import FormGroup from '@mui/material/FormGroup';
import {FormControlLabel} from '../../../../../../shared/modules/MaterialImports/FormInputs';
// import FormHelperText from '@mui/material/FormHelperText';
// import Switch from '@mui/material/Switch';
import {Checkbox} from '../../../../../../shared/modules/MaterialImports/FormElements';

import masterNodesList from "../../Stages";

import './AddNodeModal.scss';

const nodeSelector = (state: NODE_STATE) => ({
    nodes: state.nodes,
    edges: state.edges,
    addMultipleNode: state.addMultipleNode,
    addMultipleEdges: state.addMultipleEdges
});

const AddNodeModal = (
    { open, closePopup, nodeData }: {
        open: boolean;
        closePopup: (refresh: boolean) => void;
        nodeData: Node["data"];
    }
) => {
    // const { updateLabel } = useStore(nodeSelector, shallow);
    const { nodes, addMultipleNode, addMultipleEdges } = useStore(nodeSelector, shallow);

    const [currentNode, setCurrentNode] = useState<Node>({
        id: "",
        position: {
            x: (screen.width / 2) - 200,
            y: 70,
        },
        data: {}
    });

    const [nodesList, setNodesList] = useState(
        {
            "10": false,
            "100": false,
            "200": false,
            "300": false,
            "400": false,
            "500": false,
            "600": false,
            "700": false,
            "800": false,
            "900": false,
        }
        // masterNodesList.reduce((acc, curr) => (acc[curr] = '', acc), {})
        // masterNodesList.reduce((obj, item) => Object.assign(obj, { id: item.id, selected: false }), {})
    );



    const updateNode = () => {
        // @ts-ignore
        const selectedIds = Object.keys(nodesList).filter((key) => nodesList[key] === true);

        let tempNodes: Node[] = [];
        let tempEdges: Edge[] = [];
        let xPosition = currentNode.position.x - (Math.floor(selectedIds.length / 2) * 350);
        const autoIds = nodes.map(node => node.data.autoId);
        let maxAutoId = Math.max.apply(Math, autoIds);
        if (maxAutoId % 1000 === 0) {
            maxAutoId = maxAutoId + 1000;
        } else {
            maxAutoId = Math.ceil(maxAutoId / 1000) * 1000;
        }

        for (let tn = 0; tn < selectedIds.length; tn++) {
            let nodeToAdd = masterNodesList.find((item) => "" + item.id === "" + selectedIds[tn]);
            if (nodeToAdd && nodeToAdd.name) {
                const type = nodeToAdd.type;
                // let id = getId();
                let id = uuidv4();
                const newNode = {
                    id: id,
                    type,
                    sourcePosition: Position.Right,
                    targetPosition: Position.Left,
                    position: {
                        x: xPosition,
                        y: (215 * (Math.floor(maxAutoId / 1000) - 1))
                    },
                    data: {
                        stageId: `${nodeToAdd.id}`, // static
                        id: `${id}`, // Random ID
                        stageName: `${nodeToAdd.name}`, // static
                        stageLabel: `${nodeToAdd.name}`,
                        isFormEnabled: false,
                        formJsonData: [],
                        nextStagesList: [],
                        type,
                        autoId: maxAutoId
                    },
                    dragHandle: ".customDragHandle"
                };
                // console.log(maxAutoId);
                xPosition += 350;
                maxAutoId++;

                tempNodes.push(newNode);

                let edgeUniqueId = uuidv4();
                const newEdge = {
                    id: "reactflow__edge-" + nodeData.id + edgeUniqueId + "-" + id,
                    source: nodeData.id,
                    sourceHandle: edgeUniqueId,
                    target: id,
                    targetHandle: null,
                    type: "buttonedge",
                };
                tempEdges.push(newEdge);


            }

        }
        addMultipleNode(tempNodes);
        addMultipleEdges(tempEdges);

        closePopup(false);
    }

    useEffect(() => {
        let selectedNode = nodes.find((i) => i.data?.id === nodeData.id);
        if (selectedNode?.id) {
            setCurrentNode(selectedNode);
            // console.log(selectedNode);
        }
        // setNodesList(masterNodesList.reduce(
        //     (obj, item) => Object.assign(obj, { id: item.id, selected: false }), {}))
    }, []);


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
        setNodesList({
            ...nodesList,
            [id]: event.target.checked,
        });
    };


    return <Dialog
        maxWidth={'sm'}
        fullWidth={true} open={open} id='AddNodeModal'>
        <DialogTitle
            className='py-2'
        >
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <span className='addHeader'>
                    {nodeData.stageName}
                </span>
                <div>
                    <Grid
                        container
                        direction="row"
                        justifyContent="end"
                        alignItems="center"
                    >
                        <Button variant="outlined"
                            type='button'
                            color="secondary"
                            className='mr-2'
                            onClick={() => closePopup(false)}
                        >Cancel</Button>
                        <Button variant="contained"
                            type='button'
                            color="primary"
                            onClick={updateNode}
                        >Add Selected</Button>
                    </Grid>
                </div>
            </Grid>
        </DialogTitle>
        <DialogContent className='py-5 my-5' sx={{
            // height: 'calc(100vh - 60px)'
        }}>
            <Grid container>
                {
                    masterNodesList.map((node) => {
                        return <Grid sm={6} key={node.id} className='mb-2'>
                            <FormControlLabel
                                control={
                                    // @ts-ignore
                                    <Checkbox checked={Boolean(nodesList[node.id])} onChange={(e) => handleChange(e, node.id)} name={node.id} />
                                    // // @ts-ignore
                                    // <Switch checked={Boolean(nodesList[node.id])} onChange={(e) => handleChange(e, node.id)} name={node.id} />
                                }
                                label={node.name}
                            />
                        </Grid>
                    })
                }
            </Grid>
        </DialogContent>
    </Dialog>
}

export default AddNodeModal;