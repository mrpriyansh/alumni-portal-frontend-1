import React, { useRef, useState } from 'react';
import styles from './Dropzone.module.css';
import { ReactComponent as UploadIcon } from '../../assets/icons/uploadIcon.svg';

function Dropzone({ setFileName, active }) {
  console.log(active);
  const [highlight, setHighlight] = useState(false);
  const fileInputRef = useRef();
  const openFileDialog = () => {
    active && fileInputRef.current.click();
  };
  const fileListToArray = list => {
    const array = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < list.length; ++i) {
      setFileName(oldArray => [...oldArray, list.item(i)]);
      array.push(list.item(i));
    }
    return array;
  };
  const onFilesAdded = event => {
    const { files } = event.target;
    console.log(files);
    const array = fileListToArray(files);
    console.log('aa', array);
    // return array;
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
      console.log(files);
      const array = fileListToArray(files);

      console.log('aa', array);
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
      {/* <img
        alt="upload"
        className={styles.icon}
        src="https://lh3.googleusercontent.com/proxy/ASa6qJYljWSVYiJKdbraZ3WCdGJgAo9O_MzBS008vMaXKMAt3c8MKwLt8Z6tVewfTjCYbqfVab5UawP8cB4g3sl3ncslr-6W1tGNP6Zz_5BEJRDXgEOgd4k"
      /> */}
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
