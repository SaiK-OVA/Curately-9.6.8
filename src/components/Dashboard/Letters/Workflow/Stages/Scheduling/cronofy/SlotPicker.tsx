import { useEffect, useState } from "react";
// @ts-ignore
import * as CronofyElements from "cronofy-elements";

const SlotPicker = ({ options }: { options: any }) => {
    const [element, setElement] = useState<any>(null);

    useEffect(() => {
        if (!element) {
            setElement(
                CronofyElements.SlotPicker(options)
            );
        }
    }, []);

    useEffect(() => {
        if (element) {
            element?.update(options);
        }
    }, [options]);

    return <div id="cronofy-slot-picker-div" />;
};

export default SlotPicker;