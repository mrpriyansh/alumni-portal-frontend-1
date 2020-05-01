import React from 'react';
import styles from './Modal.module.css';
import UploadPopUp from '../../components/UploadPopUp/UploadPopUp';

function Modal({ setOpenModal, Child, changePost, fileName, setFileName }) {
  return (
    <div className={styles.modal}>
      <Child
        setOpenModal={setOpenModal}
        changePost={changePost}
        fileName={fileName}
        setFileName={setFileName}
      />
    </div>
  );
}

export default Modal;
