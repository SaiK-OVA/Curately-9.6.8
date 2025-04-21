import { ChangeEvent, useContext } from "react";
import { useCallback, useEffect, useState } from "../../../../../../shared/modules/React";
import { Grid, Button } from "../../../../../../shared/modules/commonImports";
import { Dialog, DialogTitle, DialogContent } from "../../../../../../shared/modules/MaterialImports/Dialog";
import { TextField, FormControlLabel, FormControl } from "../../../../../../shared/modules/MaterialImports/FormInputs";
import { Switch } from "../../../../../../shared/modules/MaterialImports/Switch";


import { shallow } from 'zustand/shallow';
import useStore, { NODE_STATE } from "../../NodeStore";
import { Node } from "reactflow";
// import FormContainer from "../../../Workflow/FormBuilder/forms/FormContainer";
import { FormStore } from "../../../../../../App";
// import DnsOutlinedIcon from '@mui/icons-material/DnsOutlined';



// const formBuilderSelector = (state: FORMBUILDER_STATE) => ({
//     formData: state.formData,
//     setFormData: state.setFormData
// });


import './NodeModal.scss';
import { showToaster } from "../../../../../shared/SnackBar/SnackBar";
// import useFormBuilderStore, { FORMBUILDER_STATE } from "../../../../../../shared/store/FormBuilderStore";
import FormContainer from "../../../../Letters/Workflow/FormBuilder/forms/FormContainer";
import { Select } from "../../../../../../shared/modules/MaterialImports/FormElements";
import { MenuItem } from "../../../../../../shared/modules/MaterialImports/Menu";
import { userLocalData } from "../../../../../../shared/services/userData";

const nodeSelector = (state: NODE_STATE) => ({
    nodes: state.nodes,
    updateLabel: state.updateLabel,
    updateNodeData: state.updateNodeData,
    removeNode: state.removeNode,
    addCustomStage: state.addCustomStage
});

const formsList: { value: string; name: string; clientName: string; }[] = [
    { value: "BMS_InternalSubmission", name: "Internal Submission", clientName: "bms" },
    { value: "BMS_ClientSubmission", name: "Client Submission", clientName: "bms" },
    { value: "BMS_Interview", name: "Interview", clientName: "bms" },
    { value: "BMS_Assignment", name: "Assignment", clientName: "bms" },
    { value: "AGILEONE_InternalSubmission", name: "Internal Submission", clientName: "agileoneaxalta" },
]


const NodeModal = (
    { open, closePopup, nodeData }: {
        open: boolean;
        closePopup: (refresh: boolean) => void;
        nodeData: Node["data"];
    }
) => {
    // const { updateLabel } = useStore(nodeSelector, shallow);
    const { updateNodeData, nodes } = useStore(nodeSelector, shallow);

    const [nodeLabel, setNodeLabel] = useState(nodeData.stageLabel);

    const [customForm, setCustomForm] = useState(false);
    const [clientFormsList, setClientFormsList] = useState<{ value: string; name: string; clientName: string; }[]>([]);
    const [selectedForm, setSelectedForm] = useState("");

    const updateNode = () => {
        // updateLabel(nodeData.id, nodeLabel);
        let tempNode = nodes.find((i) => ((i.id !== nodeData.id) && (i.data.stageLabel === nodeLabel) && (i.data.duplicateId === "")));
        if (!(tempNode && tempNode.id)) {
            updateNodeData(nodeData.id, { stageLabel: nodeLabel, formJsonData: formData, isFormEnabled: isFormBuilderEnabled, stageId: nodeData.stageId, isCustomForm: customForm, customFormId: selectedForm });
            closePopup(false);
        } else {
            showToaster('Name already exists', 'error');
        }
    }
    const labelInputUpdate = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
        // console.log(evt.currentTarget.value);
        setNodeLabel(evt.currentTarget.value);
    }, []);

    const [isFormBuilderEnabled, setIsFormBuilderEnabled] = useState(nodeData.isFormEnabled);

    const updateFormBuilderSwitch = (event: ChangeEvent<HTMLInputElement>) => {
        setIsFormBuilderEnabled(event.target.checked);
    };

    const formbuilderCancel = () => {
        // console.log("formbuilderCancel");
    }
    const saveFormBuilderData = (formJsonData: any) => {

    }

    const handleCustomFormSwitch = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setIsFormBuilderEnabled(false);
        }
        setCustomForm(e.target.checked);
    }


    const [formData, setFormData] = useContext(FormStore);
    // const { formData, setFormData } = useFormBuilderStore(formBuilderSelector, shallow); 


    useEffect(() => {
        // userLocalData.getvalue('clientId')
        setClientFormsList(formsList.filter((i) => i.clientName === userLocalData.getvalue('clientName')));
        // console.log(nodeData)
        setFormData(nodeData.formJsonData);
        return () => {
            setFormData([]);
        }
    }, []);

    useEffect(() => {
        if (nodeData.isCustomForm) {
            setCustomForm(nodeData.isCustomForm);
        }
        if (nodeData.customFormId) {
            setSelectedForm(nodeData.customFormId)
        }
    }, [nodeData]);

    return <Dialog
        maxWidth={'sm'}
        fullWidth={true} open={open} id='NodeModal'>
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
                        >Update</Button>
                    </Grid>
                </div>
            </Grid>
        </DialogTitle>
        <DialogContent className='py-5 my-5' sx={{
            height: 'calc(100vh - 60px)'
        }}>
            <Grid>
                <label className="input-label">Label Name</label>
                <TextField size="small" fullWidth id="text" name="text" onChange={labelInputUpdate} value={nodeLabel} />
                <FormControlLabel control={
                    <Switch
                        checked={isFormBuilderEnabled}
                        onChange={updateFormBuilderSwitch}
                        inputProps={{ 'aria-label': 'controlled' }}
                        disabled={customForm}
                    />} label="Enable Form Builder"
                    className="my-3"
                />

                {
                    <FormControlLabel control={
                        <Switch
                            checked={customForm}
                            onChange={(e) => handleCustomFormSwitch(e)}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />} label="Custom Form"
                        className="my-3"
                    />
                }

                {
                    customForm &&
                    <FormControl fullWidth className="mb-2">
                        <label className="input-label mb-0">Select Form</label>
                        <Select
                            id="BMS-form"
                            size="small"
                            value={selectedForm}
                            onChange={(e) => setSelectedForm(e.target.value)}
                        >
                            {
                                clientFormsList.map((item) => {
                                    return <MenuItem key={item.value} value={item.value}>{item.name}</MenuItem>
                                })
                            }
                            {/* <MenuItem value="BMS_InternalSubmission">Internal Submission</MenuItem> */}
                        </Select>
                    </FormControl>
                }


                {
                    isFormBuilderEnabled ?
                        <FormContainer callParentSave={saveFormBuilderData} cancelClicked={formbuilderCancel} formIdPassed={""} formNamePassed={nodeLabel} isFormBuilder={false} showCancel={false} showSave={false} generateDataKey={true} />
                        :
                        null
                }
            </Grid>
        </DialogContent>
    </Dialog>
}

export default NodeModal;