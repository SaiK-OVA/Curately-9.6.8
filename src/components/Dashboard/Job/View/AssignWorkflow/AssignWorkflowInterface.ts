
export interface AssignWorkflowInterface {
    assignWorkflow(jobId: string): void;
    checkIsValid(): boolean;
    isWorkflowSelected(): boolean;
}