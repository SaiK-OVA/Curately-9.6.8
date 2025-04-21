import {React} from '../../../../../../shared/modules/React';
// import { Store } from '../MainComponent/MainComponent'

interface ImageProps {
    imgSrc: string;
}

const EmbedEditorImg: React.FC<ImageProps> = ({ imgSrc }) => {
    // const [propsData] = useContext(Store)

    return (
        <>

            <img src={imgSrc}
                alt="img"
                style={{
                    height: '400px',
                    width: '100%'
                }}
            />


        </>
    )
}

export default EmbedEditorImg