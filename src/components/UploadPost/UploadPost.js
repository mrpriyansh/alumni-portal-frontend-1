import React, { useState, useEffect } from 'react';
import styles from './UploadPost.module.css';
import { useForm } from '../Hooks/handleInputs';
import UploadPopUp from '../UploadPopUp/UploadPopUp';
import Modal from '../../containers/Modal/Modal';
import { urlValidation } from '../../utils/validateData';
import { triggerAlert } from '../../utils/getAlert/getAlert';
import { useAuth } from '../Hooks/Auth';
import config from '../../utils/config';

function UploadPost() {
  const { authToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [post, changePost] = useForm({
    type: '',
    text: '',
    url: '',
    fileUrls: [],
    currentComment: '',
  });
  const [activeTab, changeActiveTab] = useState('tab1');
  const [fileName, setFileName] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    changePost({ target: { name: 'type', value: activeTab } });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);
  const handleChoiceButton = (event, tab) => {
    event.preventDefault();
    changeActiveTab(tab);
  };
  const handleUpload = event => {
    event.preventDefault();
    changePost({ target: { name: 'fileUrls', value: [] } });
    setFileName([]);
    setOpenModal(true);
  };
  const handlePost = event => {
    setLoading(true);
    event.preventDefault();
    if (post.url.length && !urlValidation(post.url)) {
      triggerAlert({ icon: 'error', title: 'URL is not valid! Try to add http:// or https://' });
      setLoading(false);
    } else if (!post.text.length) {
      triggerAlert({ icon: 'error', title: 'Post cannot be empty!' });
      setLoading(false);
    } else {
      fetch(`${config.apiUrl}/api/uploadPost`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authToken}` },
        body: JSON.stringify(post),
      })
        .then(response => response.json())
        .then(res => {
          changePost({ target: { name: 'text', value: '' } });
          changePost({ target: { name: 'url', value: '' } });
          changePost({ target: { name: 'fileUrls', value: [] } });
          setFileName([]);
          setLoading(false);
          triggerAlert(res);
        });
    }
  };
  return (
    <div className={styles.upload_posts}>
      {openModal ? (
        <Modal
          setOpenModal={setOpenModal}
          childName={'UploadPost'}
          Child={UploadPopUp}
          changePost={changePost}
          fileName={fileName}
          setFileName={setFileName}
        />
      ) : null}
      <p className={styles.heading}> Share something!</p>
      <textarea
        onChange={changePost}
        className={styles.text_area}
        name="text"
        placeholder="Write something here"
        value={post.text}
      />
      <div className={styles.link}>
        <input
          onChange={changePost}
          type="url"
          name="url"
          placeholder="Related URL"
          value={post.url}
        />
      </div>
      <p className={styles.category_text}>Choose Category</p>
      <div className={styles.buttons}>
        <div className={styles.left_buttons}>
          <button
            onClick={event => {
              handleChoiceButton(event, 'tab1');
            }}
            className={
              activeTab === 'tab1' ? `${styles.button} ${styles.active}` : `${styles.button}`
            }
          >
            Jobs/Intern
          </button>
          <button
            onClick={event => {
              handleChoiceButton(event, 'tab2');
            }}
            className={
              activeTab === 'tab2' ? `${styles.button} ${styles.active}` : `${styles.button}`
            }
          >
            Ask Referal
          </button>
          <button
            onClick={event => {
              handleChoiceButton(event, 'tab3');
            }}
            className={
              activeTab === 'tab3' ? `${styles.button} ${styles.active}` : `${styles.button}`
            }
          >
            Activities
          </button>
        </div>
        <div className={styles.right_buttons}>
          <button onClick={handleUpload} className={styles.upload_button}>
            Upload Media
          </button>
          <button
            onClick={handlePost}
            disabled={post.fileUrls.length !== fileName.length || loading}
            className={
              post.fileUrls.length !== fileName.length || loading
                ? `${styles.post_button} ${styles.disabled}`
                : `${styles.post_button}`
            }
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default UploadPost;
