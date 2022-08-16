import { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import { Feedback } from '../pages/[hotel]/views/27';
import api from '../pages/api';

export default ({ onSubmit }) => {
  const [openModal, setOpenModal] = useState(false);
  const closeModal = () => setOpenModal(false);
  useEffect(() => {
    const init = async () => {
      const res = await api.feedback.checkUserFeedback();
      if (!res.data) {
        setTimeout(() => setOpenModal(true), 10000);
      }
    };
    init();
  }, []);
  const handleSubmit = (req) => {
    console.log(req);
    onSubmit(req);
    closeModal();
  };
  return (
    <Popup
      open={openModal}
      closeOnDocumentClick
      onClose={closeModal}
      modal
      className="popup-modal-feedback"
    >
      <div className="py-5 px-9 md:p-11">
        <Feedback
          modal={true}
          textColor={'#523922'}
          onSubmit={handleSubmit}
          onCloseModal={closeModal}
        />
      </div>
    </Popup>
  );
};
