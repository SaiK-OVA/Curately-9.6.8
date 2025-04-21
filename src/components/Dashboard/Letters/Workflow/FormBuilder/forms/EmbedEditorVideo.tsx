import {React} from '../../../../../../shared/modules/React';

interface VideoProps {
    videoSrc: string;
}

const EmbedEditorVideo: React.FC<VideoProps> = ({ videoSrc }) => {

    const youtubeURL = videoSrc;
    const videoId = youtubeURL.split("v=")[1];

    return (
        <iframe src={`https://www.youtube.com/embed/${videoId}`}
            title='EmbedVideo'
            style={{
                height: '400px',
                width: '100%',
                borderStyle: 'none'
            }}

        />
    )
}

export default EmbedEditorVideo