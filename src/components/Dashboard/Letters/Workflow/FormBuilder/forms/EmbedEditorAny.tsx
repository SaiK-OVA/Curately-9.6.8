import {Box} from '../../../../../../shared/modules/MaterialImports/Box'
import {React} from '../../../../../../shared/modules/React'
import { Tweet } from 'react-twitter-widgets';
import './form.scss'

interface FileProps {
    fileSrc: string
}
const EmbedEditorAny: React.FC<FileProps> = ({ fileSrc }) => {


    let anySourceContent

    if (fileSrc.endsWith('.pdf')) {
        anySourceContent = <iframe src={fileSrc} allowFullScreen loading="lazy"
            className='emd-pdf'
            title='emd-pdf'
        />
    } else if (fileSrc.startsWith('https://www.youtube.com/')) {
        const youtubeURL = fileSrc;
        const videoId = youtubeURL.split("v=")[1];
        anySourceContent = <iframe src={`https://www.youtube.com/embed/${videoId}`} allowFullScreen loading="lazy"
            className='emd-video '
            title='emd-video'
        />
    } else if ((fileSrc.endsWith('.mp3') || fileSrc.endsWith('.ogg') || fileSrc.endsWith('.wav'))) {
        anySourceContent = <Box><audio controls className='emb-audio '>
            <source src={fileSrc} type="audio/mpeg" />
        </audio>
        </Box>
    } else if (fileSrc.startsWith('https://www.figma.com/')) {
        anySourceContent =
            <iframe
                src={`https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(fileSrc)}`}
                allowFullScreen
                loading="lazy"
                className='emd-figma'
                title='emd-figma'
            />

    } else if (fileSrc.startsWith('https://www.twitter.com/') || fileSrc.startsWith('https://twitter.com/')) {
        const tweetId: any = fileSrc.split('/').pop();
        anySourceContent = <Tweet tweetId={tweetId} options={{ width: 300, height: 200 }} />

    } else if (
        fileSrc.endsWith('.jpg') ||
        fileSrc.endsWith('.jpeg') ||
        fileSrc.endsWith('.png') ||
        fileSrc.endsWith('.gif') ||
        fileSrc.startsWith('https://picsum.photos/')
    ) {
        anySourceContent = (
            <img src={fileSrc} alt="fileImage" className='emd-image' />
        );
    } else if (fileSrc.startsWith('https://calendly.com/')) {
        // Handle Calendly URL
        anySourceContent = (
            <iframe
                src={fileSrc}
                className='emd-calendly'
                loading="lazy"
                title="Calendly Embed"
            />
        );
    } else {
        anySourceContent =
            <Box className='google-maps'>
                <Box dangerouslySetInnerHTML={{ __html: fileSrc }} />
            </Box>

    }


    return (
        <>
            {anySourceContent}
        </>
    )
}

export default EmbedEditorAny