import React, { ReactNode, useState } from "react";

interface DarkThemedModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    mainHeading: string;
}

export const Modal: React.FC<DarkThemedModalProps> = ({
    isOpen,
    onClose,
    mainHeading,
    children,
}) => {
    const handleDeactivate = () => {
        // Handle the deactivate logic
        console.log("Deactivating account...");
        onClose(); // Close the modal
    };

    const handleCancel = () => {
        // Handle the cancel logic
        console.log("Cancelled deactivation");
        onClose(); // Close the modal
    };

    return (
        <div>
            {isOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity">
                    <div className="fixed inset-0 w-screen overflow-y-auto">
                        <div className="flex min-h-full y-overflow-hidden y-overflow-y-scroll items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <div className="relative transform max-h-96 overflow-hidden overflow-scroll rounded-lg bg-gray-900 text-left shadow-xl transition-all sm:my-2 sm:w-full sm:max-w-lg">
                                <div className="bg-gray-900 p-5">
                                    <div className="">
                                        {/* <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                      </svg>
                    </div> */}
                                        <div className="mt-3 text-center sm:mt-0">
                                            <h3
                                                className="text-base mt-2 font-semibold leading-6 text-gray-100 text-center"
                                                id="modal-title"
                                            >
                                                {mainHeading || "Add Employee"}
                                            </h3>
                                            <div className=" flex flex-col justify-center">
                                                {children}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    onClick={handleDeactivate}
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                  >
                    Deactivate
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  >
                    Cancel
                  </button>
                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const InteractiveModalExample = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <button onClick={openModal}>Open Modal</button>
            <Modal
                isOpen={isModalOpen}
                mainHeading="Heading"
                onClose={closeModal}
                children={undefined}
            />
        </div>
    );
};

export default InteractiveModalExample;
