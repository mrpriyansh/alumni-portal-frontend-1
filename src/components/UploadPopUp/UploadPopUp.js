/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState } from 'react';
import styles from './UploadPop.module.css';
import { useAuth } from '../Hooks/Auth';
import Dropzone from '../Dropzone/Dropzone';

function UploadPopUp({ setOpenModal, changePost, fileName, setFileName }) {
  const { authToken } = useAuth();
  const [uploadProgress, setUploadProgress] = useState({});
  const [successfullUploaded, setSuccessfullUploaded] = useState(false);
  const [url, changeURL] = useState([]);
  const [uploading, setUploading] = useState(false);
  const renderProgressBar = file => {
    const progress = uploadProgress[file.name];
    return (
      <div className={styles.progress_wrapper}>
        <div className={styles.progress_bar}>
          {progress ? (
            <div className={styles.progress} style={{ width: `${progress}%` }}></div>
          ) : null}
        </div>
        {/* <CancelSVG fill="#C81616" width="1em" height="1em" className={styles.cancel_icon} /> */}
      </div>
    );
  };
  const uploadFile = file => {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();
      // setUploadProgress({ ...uploadProgress, file: {} });
      req.upload.addEventListener('progress', event => {
        if (event.lengthComputable) {
          const copy = uploadProgress;
          copy[file.name] = { state: 'pending', percentage: (event.loaded / event.total) * 100 };
          setUploadProgress(copy);
        }
      });

      req.upload.addEventListener('load', event => {
        const copy = uploadProgress;
        copy[file.name] = { state: 'done', percentage: 100 };
        setUploadProgress(copy);
        resolve(req.response);
      });

      req.upload.addEventListener('error', event => {
        const copy = uploadProgress;
        copy[file.name] = { state: 'error', percentage: 0 };
        setUploadProgress(copy);
        reject(req.response);
      });

      const formData = new FormData();
      formData.append('file', file, file.name);
      req.open('POST', 'http://localhost:4000/api/uploadimage');
      req.setRequestHeader('Authorization', `Bearer ${authToken}`);
      req.send(formData);
      // eslint-disable-next-line func-names
      req.onreadystatechange = function() {
        if (req.readyState === XMLHttpRequest.DONE) {
          const response = JSON.parse(req.response);
          // changeImageURLArray(oldImageURL => [...oldImageURL, {fileName:file.name, url: response.data }]);
          changeURL(oldImageURL => [
            ...oldImageURL,
            { fileName: file.name, uid: response.data, type: file.type.split('/')[0] },
          ]);
        }
      };
    });
  };
  const handleProceed = event => {
    event.preventDefault();
    changePost({ target: { name: 'fileUrls', value: url } });
    setOpenModal(false);
  };

  const handleCancel = event => {
    event.preventDefault();
    changePost({ target: { name: 'fileUrls', value: [] } });
    setFileName([]);
    setOpenModal(false);
  };

  const handleUpload = async event => {
    event.preventDefault();
    setUploading(true);
    const promises = [];
    fileName.forEach(file => {
      promises.push(uploadFile(file));
    });
    try {
      await Promise.all(promises);
      setSuccessfullUploaded(true);
      setUploading(false);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
    // setOpenModal(false);
  };
  return (
    <div className={styles.pop_up_box}>
      <div className={styles.heading}>Upload Files</div>
      <div className={styles.content}>
        <div className={styles.dropzone}>
          <Dropzone setFileName={setFileName} active={!uploading && !successfullUploaded} />
        </div>
        <div className={styles.filezone}>
          <p className={styles.filezone_heading}>
            {' '}
            Files{' '}
            {fileName.length === 0 ? (
              <span className={styles.not_selected}> ( No File Selected )</span>
            ) : null}
          </p>
          <hr className={styles.line}></hr>
          {fileName.map(file => {
            return (
              <div className={styles.file}>
                <div className={styles.file_name}> {file.name}</div>
                {renderProgressBar(file)}
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.footer}>
        <button onClick={handleCancel} className={styles.cancel}>
          Cancel
        </button>
        {/* eslint-disable-next-line no-nested-ternary */}
        {uploading || successfullUploaded ? (
          fileName.length !== url.length ? (
            <button
              disabled={fileName.length !== url.length}
              className={fileName.length !== url.length ? `${styles.disabled}` : `${styles.submit}`}
            >
              {' '}
              Processing{' '}
            </button>
          ) : (
            <button
              onClick={handleProceed}
              disabled={uploading || fileName.length !== url.length}
              className={
                uploading || fileName.length !== url.length
                  ? `${styles.disabled}`
                  : `${styles.submit}`
              }
            >
              Proceed
            </button>
          )
        ) : (
          <button
            onClick={handleUpload}
            disabled={fileName.length <= 0}
            className={fileName.length <= 0 ? `${styles.disabled}` : `${styles.submit}`}
          >
            {' '}
            Upload
          </button>
        )}
      </div>
    </div>
  );
}

export default UploadPopUp;
