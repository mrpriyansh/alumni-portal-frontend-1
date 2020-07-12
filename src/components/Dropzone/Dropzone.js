import React, { useRef, useState } from 'react';
import styles from './Dropzone.module.css';
import { ReactComponent as UploadIcon } from '../../assets/icons/uploadIcon.svg';
import { triggerAlert } from '../../services/getAlert/getAlert';

function Dropzone({ setFileName, active }) {
  const [highlight, setHighlight] = useState(false);
  const fileInputRef = useRef();
  const openFileDialog = () => {
    active && fileInputRef.current.click();
  };
  const fileListToArray = list => {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < list.length; ++i) {
      if (list.item(i).size > 20971520)
        triggerAlert({ icon: 'warning', title: 'You cannot add files bigger than 20MB.' });
      else setFileName(oldArray => [...oldArray, list.item(i)]);
    }
  };
  const onFilesAdded = event => {
    const { files } = event.target;
    fileListToArray(files);
  };
  const onDragOver = event => {
    event.preventDefault();
    active && setHighlight(true);
  };
  const onDragLeave = event => {
    event.preventDefault();
    setHighlight(false);
  };
  const onDrop = event => {
    event.preventDefault();
    if (active) {
      const { files } = event.dataTransfer;
      fileListToArray(files);
      setHighlight(false);
    }
  };
  return (
    <div
      onClick={openFileDialog}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={
        // eslint-disable-next-line no-nested-ternary
        !active
          ? `${styles.disabled} ${styles.dropzone}`
          : highlight
          ? `${styles.dropzone} ${styles.highlight}`
          : `${styles.dropzone}`
      }
    >
      <UploadIcon fill={active ? '#10116E' : 'DCDCDC'} className={styles.icon} />
      <input
        ref={fileInputRef}
        className={styles.file_input}
        type="file"
        multiple
        onChange={onFilesAdded}
        disabled={!active}
      />
      <span className={styles.upload_text}>Upload Files</span>
    </div>
  );
}
export default Dropzone;
