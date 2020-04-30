import React from 'react';
import styles from './Modal.module.css';
import UploadPopUp from '../../components/UploadPopUp/UploadPopUp';

function Modal({ setOpenModal, Child, changePost }) {
  return (
    <div className={styles.modal}>
      <Child setOpenModal={setOpenModal} changePost={changePost} />
    </div>
  );
}

export default Modal;
