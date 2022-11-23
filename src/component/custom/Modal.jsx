import { useEffect, useRef, useState } from "react";
import './Modal.css';

const Modal = ({ closeModal }) => {

    return (
        <>
            <div className="modal-container" >
                <div className="modal-box border rounded shadow-lg mx-auto">
                    <div className="d-flex justify-content-between">
                        <h5 className="modal-title">Title</h5>
                        <button onClick={() => closeModal(false)}>X</button>
                    </div>
                    <hr />
                    <div className="modal-main">
                        <p>Hello 500 AE</p>
                        <p>Hello 500 AE</p>
                        <p>Hello 500 AE</p>
                        <p>Hello 500 AE</p>
                        <p>Hello 500 AE</p>
                        <p>Hello 500 AE</p>
                        <p>Hello 500 AE</p>
                        <p>Hello 500 AE</p>
                        <p>Hello 500 AE</p>
                        <p>Hello 500 AE</p>
                        <p>Hello 500 AE</p>
                        <p>Hello 500 AE</p>
                        <p>Hello 500 AE</p>
                        <p>Hello 500 AE</p>
                        <p>Hello 500 AE</p>
                        <p>Hello 500 AE</p>
                        <p>Hello 500 AE</p>
                    </div>
                    <hr />
                    <div className="modal-footer">
                        <button>Cancel</button>
                        <button>Accept</button>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Modal;