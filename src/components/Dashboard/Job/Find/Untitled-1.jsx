import React, { useState } from "react";


function Example() {
    const [boxes, setBoxes] = useState([]);

    function handleChange(e) {
        const {
            parentNode: { children }
        } = e.target;

        const index = [...children].indexOf(e.target);

        const newState = [...boxes];

        newState[index] = !newState[index];

        setBoxes(newState);
    }

    function isDisabled() {
        const len = boxes.filter((box) => box).length;
        return len === 0 || len > 1;
    }

    return (
        <div className="App">
            <button disabled={isDisabled()}>Click Me</button>
            <table>
                <thead>
                    <th>One</th>
                    <th>Two</th>
                    <th>Three</th>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <input type="checkbox" onChange={handleChange} />
                        </td>
                        <td> two data</td>
                        <td> three data</td>
                    </tr>
                    <tr>
                        <td>
                            <input type="checkbox" onChange={handleChange} />
                        </td>
                        <td> two data</td>
                        <td> three data</td>
                    </tr>
                    <tr>
                        <td>
                            <input type="checkbox" onChange={handleChange} />
                        </td>
                        <td> two data</td>
                        <td> three data</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Example;

