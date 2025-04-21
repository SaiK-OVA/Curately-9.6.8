import { useParams } from "react-router-dom";
import ViewCandidate from "./ViewCandidate";

const CandidateView = () => {

    const { candidateId, jobId } = useParams();
    return <ViewCandidate candidateId={candidateId ? candidateId : ""} jobId={jobId ? jobId : ""} />;
};
export default CandidateView;