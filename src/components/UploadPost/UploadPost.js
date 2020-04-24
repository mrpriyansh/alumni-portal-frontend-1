import React from 'react';
import styles from './UploadPost.module.css';

function UploadPost() {
  const handleChoiceButton = event => {
    event.preventDefault();
  };
  const handleUpload = event => {
    event.preventDefault();
  };
  const handlePost = event => {
    event.preventDefault();
  };
  return (
    <div className={styles.upload_posts}>
      <p className={styles.heading}> Share something!</p>
      <textarea className={styles.text_area} name="text" placeholder="Write something here" />
      <p className={styles.category_text}>Choose Category</p>
      <div className={styles.buttons}>
        <div className={styles.left_buttons}>
          <button onClick={handleChoiceButton} className={styles.button}>
            Jobs/Intern
          </button>
          <button onClick={handleChoiceButton} className={styles.button}>
            Ask Referal
          </button>
          <button onClick={handleChoiceButton} className={styles.button}>
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
