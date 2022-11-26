import { useEffect, useRef, useState } from "react";
import './Modal.css';

const Modal = ({ closeModal, title, content, onCancel, onSubmit }) => {

    return (
        <>
            <div className="modal-container" >
                <div className="modal-box border rounded shadow-lg mx-auto">
                    <div className="d-flex justify-content-between">
                        <h5 className="modal-title">{title}</h5>
                        <button type="button" className="btn-close" aria-label="Close"
                            onClick={() => closeModal(false)}
                        ></button>
                    </div>
                    <hr />
                    <div className="modal-main">
                        {content}
                    </div>
                    <hr />
                </div>
            </div>
        </>
    )
};

export default Modal;
