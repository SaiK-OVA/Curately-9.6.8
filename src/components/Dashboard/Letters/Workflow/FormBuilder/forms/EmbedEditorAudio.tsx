import {React} from '../../../../../../shared/modules/React';

interface AudioProps {
    audioSrc: string;
}
const EmbedEditorAudio: React.FC<AudioProps> = ({ audioSrc }) => {
    return (
        <audio controls style={{
            width: 500,
            height: 50
        }}>
            <source src={audioSrc} type="audio/mpeg" />
        </audio>
    )
}

export default EmbedEditorAudio