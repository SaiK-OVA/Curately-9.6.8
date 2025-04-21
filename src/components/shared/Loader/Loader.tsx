// import React from 'react';
import { usePromiseTracker } from 'react-promise-tracker';

// import loaderImage from './../../../assets/images/CuratelyNetworkLoader.svg';
// import loaderImage from './../../../assets/images/CuratelyBubblePop.svg';

import './Loader.scss';
import { CircularProgress } from '../../../shared/modules/MaterialImports/CircularProgress';

export const Loader = () => {
    const { promiseInProgress } = usePromiseTracker();
    return (
        <span>
            {/* <img src={loaderImage} alt="" className="loaderImage"></img> */}
            {/* <object type="image/svg+xml" data={loaderImage} className='loaderImage centered'>svg-animation</object> */}
            {
                promiseInProgress ?
                    // <object type="image/svg+xml" data={loaderImage} className='loaderImage centered'>svg-animation</object>
                    <CircularProgress className="centered" />
                    // <div className="loader">
                    //     <div></div>
                    //     <div></div>
                    //     <div></div>
                    //     <div></div>
                    // </div> 
                    :
                    null
            }
        </span>
    );
};

