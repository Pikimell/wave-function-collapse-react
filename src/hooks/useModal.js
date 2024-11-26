import { useState } from 'react';

export const useModal = () => {
  const [modalState, setModalState] = useState(false);

  const openModal = () => {
    setModalState(true);
  };
  const closeModal = () => {
    setModalState(false);
  };

  return [modalState, openModal, closeModal];
};
