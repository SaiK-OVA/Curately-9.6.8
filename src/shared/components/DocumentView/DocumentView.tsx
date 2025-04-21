

import { create } from 'zustand';

// import { DialogContent, DialogTitle, } from './../../modules/MaterialImports/Dialog';
import { Dialog } from 'primereact/dialog';
// import { Grid } from './../../modules/MaterialImports/Grid';
import { Divider } from './../../modules/MaterialImports/Divider';
import { Document, Page } from 'react-pdf';
// import CloseIcon from '@mui/icons-material/Close';
import * as pdfjs from 'pdfjs-dist';
// import type { DocumentProps } from 'react-pdf';


import type { PDFDocumentProxy } from 'pdfjs-dist';
import { useResizeObserver } from '@wojtekmaj/react-hooks';
import { SyntheticEvent, useCallback, useState } from 'react';
// import PDFViewer from 'pdf-viewer-reactjs'

import './DocumentView.scss';

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//     'pdfjs-dist/build/pdf.worker.min.mjs',
//     import.meta.url,
// ).toString();

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;


const options = {
    cMapUrl: '/cmaps/',
    standardFontDataUrl: '/standard_fonts/',
};


type DocumentViewStore = {
    url: string;
    title: string;
    open: boolean;
    close: () => void;
};

const useDocumentViewStore = create<DocumentViewStore>((set: any) => ({
    url: "",
    title: '',
    open: false,
    // onSubmit: undefined,
    close: () => set({ open: false }),
}));

export const OpenDocumentView = (url: string, title: string) => {
    useDocumentViewStore.setState({
        url,
        title,
        open: true
    });
};




const resizeObserverOptions = {};

const maxWidth = 800;


export const DocumentViewDialog = () => {

    const { url, open, title, close } = useDocumentViewStore();

    const closePopup = (event?: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            // return;
        }

        close();
    };
    const [numPages, setNumPages] = useState<number>();

    const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);

    const [containerWidth, setContainerWidth] = useState<number>();

    const onResize = useCallback<ResizeObserverCallback>((entries) => {
        const [entry] = entries;

        if (entry) {
            setContainerWidth(entry.contentRect.width);
        }
    }, []);

    useResizeObserver(containerRef, resizeObserverOptions, onResize);

    function onDocumentLoadSuccess({ numPages: nextNumPages }: PDFDocumentProxy): void {
        setNumPages(nextNumPages);
    }

    return (
        <Dialog dismissableMask={true} visible={open} position={'right'} style={{ width: '80vw', height: '100vh', maxHeight: '100vh', margin: 0 }} onHide={() => closePopup()} draggable={false} resizable={false}
            header={
                <span className='addHeader'>
                    {title}
                </span>
            }
            id='DocumentView'
        >
            <Divider />
            {/* {
                url ?
                    <PDFViewer
                        document={{
                            url: "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf"
                        }}
                    />
                    :
                    null
            } */}
            {
                url ?
                    <div className="Example__container__document" ref={setContainerRef}>
                        {/* <Document file={"https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf"} onLoadSuccess={onDocumentLoadSuccess} options={options}> */}
                        <Document file={url} onLoadSuccess={onDocumentLoadSuccess} options={options}>
                            {Array.from(new Array(numPages), (el, index) => (
                                <Page
                                    key={`page_${index + 1}`}
                                    pageNumber={index + 1}
                                    width={containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth}
                                />
                            ))}
                        </Document>
                    </div>
                    :
                    null
            }
        </Dialog>
    );
}
