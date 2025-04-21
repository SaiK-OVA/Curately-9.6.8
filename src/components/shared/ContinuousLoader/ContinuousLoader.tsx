
import { CircularProgress } from '../../../shared/modules/MaterialImports/CircularProgress';
import './ContinuousLoader.scss'

export const ContinuousLoader = () => {
    return (
        <span id="ContinuousLoader">
            <CircularProgress className="centered" />
            {/* <div className="loader">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div> */}
        </span>
    );
};

