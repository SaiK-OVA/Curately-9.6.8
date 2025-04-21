import React from 'react';
import './style.css';


export default function Modal() {
    const modalData = {
        title: 'My Title From Parent',
        body: ['Apple', 'Ipple', 'Opple', 'Upple', 'Epple']
    };
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openFromParent() {
        setIsOpen(true);
    }

    function handleCloseModal(event, data) {
        console.log(event, data);
        console.log(JSON.stringify(data));
        setIsOpen(false);
    }

    function handleAfterOpen(event, data) {
        console.log(event, data);
    }
    function MyModalComponent(props) {
        function afterOpenModal(e) {
            props.onAfterOpen(e, 'After Modal Opened');
        }

        function onModalClose(event) {
            let data = { name: 'example', type: 'closed from child' };
            props.onCloseModal(event, data);
        }

        return (
            <div>
                <h1>
                    React-Modal Example - Pass Data and Open from Parent Functional
                    Component
                </h1>

                <MyModalComponent>
                    <div>
                        <Modal
                            isOpen={props.IsModalOpened}
                            onAfterOpen={e => afterOpenModal(e)}
                            ariaHideApp={false}
                        >
                            <h2>{props.dynData.title}</h2>
                            <button onClick={e => onModalClose(e)}>close</button>
                            <div>
                                <ul>
                                    {props.dynData.body.map(fr => (
                                        <li>{fr}</li>
                                    ))}
                                </ul>
                            </div>
                            dynData={modalData}
                            IsModalOpened={modalIsOpen}
                            onCloseModal={handleCloseModal}
                            onAfterOpen={handleAfterOpen}
                        </Modal>
                    </div>
                </MyModalComponent>
                <button onClick={openFromParent}>Open Modal</button>
            </div>
        );
    }
}
