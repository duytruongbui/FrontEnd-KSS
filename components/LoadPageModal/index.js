import React from 'react';
import { Modal } from 'reactstrap';

const LoadPageModal = ({ isOpen }) => {
  return (
    <Modal
      isOpen={isOpen}
      centered={true}
      modalClassName="modal-coming"
      className="modal-coming modal-dialog-centered"
      id="comingSoonModal"
    >
      <div className="circle-loading"></div>
    </Modal>
  );
};

export default LoadPageModal;
