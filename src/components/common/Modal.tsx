import React, { ReactNode, useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

interface DarkThemedModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onSubmit?: (inputValue: string) => void;
  onCancel?: () => void;
  children: ReactNode;
}

const DarkThemedModal: React.FC<DarkThemedModalProps> = ({ isOpen, onClose, title, onSubmit, onCancel, children }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = () => {
    onSubmit && onSubmit(inputValue);
    onClose();
  };

  const handleCancel = () => {
    onCancel && onCancel();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Dark Themed Modal"
      className="dark-theme-modal"
      overlayClassName="dark-theme-overlay"
    >
      <h2>{title}</h2>
      {children && <div>{children}</div>}
      <label>
        Input:
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </label>
      <div>
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </Modal>
  );
};

export default DarkThemedModal;
