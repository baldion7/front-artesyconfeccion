import React from "react";
import {Button} from "../ui/button.tsx";

export const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, itemName }) => {
    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>¿Estás seguro?</h2>
                    <button className="close-button" onClick={onClose}>
                        &times;
                    </button>
                </div>
                <div className="modal-body">
                    <p>
                        Esta acción no se puede deshacer.<br/> Se eliminará permanentemente{" "}
                        <strong>{itemName || "este elemento"}</strong>.
                    </p>
                </div>
                <div className="modal-footer">
                    <button className="btn confirm" onClick={onConfirm}>
                        Eliminar
                    </button>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                            onClose();
                        }}
                    >
                        Cancelar
                    </Button>

                </div>
            </div>
        </div>
    );
};
