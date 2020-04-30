import React, { useState, useEffect } from 'react';
import styles from './UploadPost.module.css';
import { useForm } from '../Hooks/handleInputs';
import UploadPopUp from '../UploadPopUp/UploadPopUp';
import Modal from '../../containers/Modal/Modal';
import { urlValidation } from '../../utils/validateData';
import { triggerAlert } from '../../utils/getAlert/getAlert';
import { useAuth } from '../Hooks/Auth';

function UploadPost() {
  const { authToken } = useAuth();
  const [post, changePost] = useForm({ type: '', text: '', url: '', fileUrls: [] });
  const [activeTab, changeActiveTab] = useState('tab1');
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    changePost({ target: { name: 'type', value: activeTab } });
  }, [activeTab, changePost]);
  const handleChoiceButton = (event, tab) => {
    event.preventDefault();
    changeActiveTab(tab);
  };
  const handleUpload = event => {
    event.preventDefault();
    changePost({ target: { name: 'fileUrls', value: [] } });
    setOpenModal(true);
  };
  const handlePost = event => {
    event.preventDefault();
    if (post.url.length && !urlValidation(post.url)) {
      triggerAlert({ icon: 'error', title: 'URL is not valid' });
    } else if (!post.text.length) {
      triggerAlert({ icon: 'error', title: "Post canno't be empty!" });
    } else {
      fetch('http://localhost:4000/api/uploadPost', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authToken}` },
        body: JSON.stringify(post),
      })
        .then(response => response.json())
        .then(res => {
          // changePost({ ...post, text: '', fileUrl: '' });
          triggerAlert(res);
        });
    }
  };
  useEffect(() => {
    console.log(post);
  }, [post]);
  return (
    <div className={styles.upload_posts}>
      {openModal ? (
        <Modal setOpenModal={setOpenModal} Child={UploadPopUp} changePost={changePost} />
      ) : null}
      <p className={styles.heading}> Share something!</p>
      <textarea
        onChange={changePost}
        className={styles.text_area}
        name="text"
        placeholder="Write something here"
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
            Upload Photo/Video
          </button>
          <button onClick={handlePost} className={styles.upload_Post}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default UploadPost;
