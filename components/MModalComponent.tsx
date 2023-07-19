
import React from "react";

type ModalProps = {
    children: React.ReactNode;
    onClose: () => void;
};



const ModalComponent = ({ children, onClose }: ModalProps) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                {children}
                <button
                    className="block w-full px-4 py-2 mt-4 text-center text-white bg-red-500 hover:bg-red-600 rounded"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default ModalComponent;
