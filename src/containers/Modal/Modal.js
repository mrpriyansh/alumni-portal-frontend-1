import React from 'react';
import styles from './Modal.module.css';

function Modal({ setOpenModal, childName, Child, changePost, fileName, setFileName, userInfo }) {
  return (
    <div className={styles.modal}>
      {childName === 'EditProfilePic' && <Child setOpenModal={setOpenModal} userInfo={userInfo} />}
      {childName === 'UploadPost' && (
        <Child
          setOpenModal={setOpenModal}
          changePost={changePost}
          fileName={fileName}
          setFileName={setFileName}
        />
      )}
    </div>
  );
}

export default Modal;
