// import React from 'react';
import './custom.scss';
import './../../assets/font-segoe/_font.scss';
import { lazy, useEffect, useState } from '../modules/React';

const Font = lazy(() => import('../../assets/font-segoe/Font'));
const BootstrapCSS = lazy(() => import('./BootstrapCSS'));
const ColorCSS = lazy(() => import('./ColorCSS'));
const BorderCSS = lazy(() => import('./BorderCSS'));
const TextCSS = lazy(() => import('./TextCSS'));
const QuillCSS = lazy(() => import('./QuillCSS'));
const PrimeReactCSS = lazy(() => import('./PrimeReactCSS'));


function CustomCss() {
    // const [stylePath] = useState(
    //     "https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css"
    // );

    const [loadCss, setLoadCss] = useState(false);

    useEffect(() => {
        setLoadCss(true);
    }, [])

    return (
        <div style={{ display: "none" }}>
            {
                loadCss ?
                    <>
                        <Font />
                        <BootstrapCSS />
                        <ColorCSS />
                        <BorderCSS />
                        <TextCSS />
                        <QuillCSS />
                        <PrimeReactCSS />
                    </>
                    :
                    null
            }
            {/* <link rel="stylesheet" type="text/css" href={stylePath} /> */}
        </div >
    );
}

export default CustomCss;
