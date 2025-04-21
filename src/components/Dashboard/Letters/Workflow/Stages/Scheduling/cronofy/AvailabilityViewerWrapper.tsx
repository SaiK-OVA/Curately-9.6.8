import { useEffect, useState } from "react";
// @ts-ignore
import * as CronofyElements from "cronofy-elements";

const AvailabilityViewerWrapper = ({ options }: { options: any }) => {
    const [element, setElement] = useState<any>(null);

    useEffect(() => {
        if (!element) {
            setElement(
                CronofyElements.AvailabilityViewer(options)
            );
        }
    }, []);

    useEffect(() => {
        if (element) {
            element?.update(options);
        }
    }, [options]);

    return <div id="cronofy-availability-viewer-div" />;
};

export default AvailabilityViewerWrapper;