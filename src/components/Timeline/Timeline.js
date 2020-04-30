import React from 'react';
import UploadPost from '../UploadPost/UploadPost';
import ShowPost from '../ShowPosts/ShowPosts';
import styles from './Timeline.module.css';

function Timeline({ activeTab }) {
  return (
    <div className={styles.timeline}>
      <div className={styles.upload_post}>
        <UploadPost />
      </div>
      <div className={styles.show_posts}>
        <ShowPost activeTab={activeTab} />
      </div>
    </div>
  );
}

export default Timeline;
