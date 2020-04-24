import React from 'react';
import styles from './ShowPosts.module.css';
import { ReactComponent as LikeIcon } from '../../assets/svgs/like.svg';
import { ReactComponent as ShareIcon } from '../../assets/svgs/share.svg';
import profilePic from '../../assets/images/profile.jpg';
import photo1 from '../../assets/images/photo1.png';
import photo2 from '../../assets/images/photo2.png';
import photo3 from '../../assets/images/photo3.png';

function ShowPosts() {
  return (
    <div className={styles.show_posts}>
      <div className={styles.post}>
        <div className={styles.profile}>
          <img className={styles.profile_pic} src={profilePic} alt="Profile" />
          <div className={styles.info}>
            <p className={styles.name}> Prem Kumar</p>
            <p className={styles.position}> Dev-OPS, Google </p>
          </div>
        </div>
        <p className={styles.post_text}>
          Anim sunt mollit dolore eiusmod tempor nulla consequat ex consectetur. Sit nostrud Lorem
          deserunt sint. Cillum minim tempor elit ipsum nostrud laborum et tempor minim sunt nulla
          mollit. Sit nostrud sint Lorem cupidatat consectetur. Fugiat nulla nostrud elit velit non
          reprehenderit eu ullamco commodo. Non nostrud magna commodo sint amet eiusmod nostrud
          adipisicing nisi esse proident officia laborum.
        </p>
        <div className={styles.images}>
          <img className={styles.photo} src={photo1} alt="photo1" />
          <img className={styles.photo} src={photo2} alt="photo1" />
          <img className={styles.photo} src={photo3} alt="photo1" />
        </div>
        <div className={styles.reactions}>
          <span>
            <LikeIcon height="1em" width="1em" fill="#FF046B" /> Like{' '}
          </span>{' '}
          <span>
            <ShareIcon height="1em" width="1em" /> Share
          </span>
        </div>
        <input className={styles.add_comment} type="text" placeholder="Add Comment" />
      </div>
      <hr className={styles.line}></hr>
      <div className={styles.post}>
        <div className={styles.profile}>
          <img className={styles.profile_pic} src={profilePic} alt="Profile" />
          <div className={styles.info}>
            <p className={styles.name}> Prem Kumar</p>
            <p className={styles.position}> Dev-OPS, Google </p>
          </div>
        </div>
        <p className={styles.post_text}>
          Anim sunt mollit dolore eiusmod tempor nulla consequat ex consectetur. Sit nostrud Lorem
          deserunt sint. Cillum minim tempor elit ipsum nostrud laborum et tempor minim sunt nulla
          mollit. Sit nostrud sint Lorem cupidatat consectetur. Fugiat nulla nostrud elit velit non
          reprehenderit eu ullamco commodo. Non nostrud magna commodo sint amet eiusmod nostrud
          adipisicing nisi esse proident officia laborum.
        </p>
        <div className={styles.images}>
          <img className={styles.photo} src={photo1} alt="photo1" />
          <img className={styles.photo} src={photo2} alt="photo1" />
          <img className={styles.photo} src={photo3} alt="photo1" />
        </div>
        <div className={styles.reactions}>
          <span>
            <LikeIcon height="1em" width="1em" fill="#FF046B" /> Like{' '}
          </span>{' '}
          <span>
            <ShareIcon height="1em" width="1em" /> Share
          </span>
        </div>
        <input className={styles.add_comment} type="text" placeholder="Add Comment" />
      </div>
      <hr className={styles.line}></hr>
      <div className={styles.post}>
        <div className={styles.profile}>
          <img className={styles.profile_pic} src={profilePic} alt="Profile" />
          <div className={styles.info}>
            <p className={styles.name}> Prem Kumar</p>
            <p className={styles.position}> Dev-OPS, Google </p>
          </div>
        </div>
        <p className={styles.post_text}>
          Anim sunt mollit dolore eiusmod tempor nulla consequat ex consectetur. Sit nostrud Lorem
          deserunt sint. Cillum minim tempor elit ipsum nostrud laborum et tempor minim sunt nulla
          mollit. Sit nostrud sint Lorem cupidatat consectetur. Fugiat nulla nostrud elit velit non
          reprehenderit eu ullamco commodo. Non nostrud magna commodo sint amet eiusmod nostrud
          adipisicing nisi esse proident officia laborum.
        </p>
        <div className={styles.images}>
          <img className={styles.photo} src={photo1} alt="photo1" />
          <img className={styles.photo} src={photo2} alt="photo1" />
          <img className={styles.photo} src={photo3} alt="photo1" />
        </div>
        <div className={styles.reactions}>
          <span>
            <LikeIcon height="1em" width="1em" fill="#FF046B" /> Like{' '}
          </span>{' '}
          <span>
            <ShareIcon height="1em" width="1em" /> Share
          </span>
        </div>
        <input className={styles.add_comment} type="text" placeholder="Add Comment" />
      </div>
    </div>
  );
}

export default ShowPosts;
