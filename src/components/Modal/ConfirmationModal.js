import React from 'react';

const ConfirmationModal = ({title, message, modalData, successAction, successActionName, closeModal}) => {
    return (
        <section>
            <input type="checkbox" id="confirmation-modal" className="modal-toggle" />
            <div className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">{title}</h3>
                <p className="py-4">{message}</p>
                <div className="modal-action">
                    <label onClick={() => successAction(modalData)} htmlFor="confirmation-modal" className="btn btn-sm bg-red-600 text-white border-none">{successActionName}</label>
                    <button onClick={closeModal} className="btn btn-sm btn-outline border-none">Cancel</button>
                </div>
            </div>
            </div>
        </section>
    );
};

export default ConfirmationModal;