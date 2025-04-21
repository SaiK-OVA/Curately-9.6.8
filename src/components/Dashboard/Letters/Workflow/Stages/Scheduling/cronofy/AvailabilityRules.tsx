import { useEffect, useState } from "react";
// @ts-ignore
import * as CronofyElements from "cronofy-elements";

import './AvailabilityRules.scss';

const AvailabilityRules = ({ options }: { options: any }) => {
    const [element, setElement] = useState<any>(null);

    useEffect(() => {
        if (!element) {
            setElement(
                CronofyElements.AvailabilityRules(options)
            );
        }
    }, []);

    useEffect(() => {
        if (element) {
            element?.update(options);
        }
    }, [options]);

    return <div id="cronofy-availability-rules-div" />;
};

export default AvailabilityRules;