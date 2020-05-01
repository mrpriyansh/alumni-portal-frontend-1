import React, { useEffect, useState } from 'react';
import styles from './ShowPosts.module.css';
import { ReactComponent as LikeIcon } from '../../assets/icons/like.svg';
import { ReactComponent as ShareIcon } from '../../assets/icons/share.svg';
import profilePic from '../../assets/images/profile.jpg';
import photo1 from '../../assets/images/photo1.png';
import photo2 from '../../assets/images/photo2.png';
import photo3 from '../../assets/images/photo3.png';
import { useAuth } from '../Hooks/Auth';
import Loader from '../Loader/Loader';

function ShowPosts({ activeTab }) {
  const { authToken } = useAuth();
  const [postsData, setpostsData] = useState([]);
  useEffect(() => {
    console.log('aa');
    fetch(`http://localhost:4000/api/fetchposts/ALL?type=${activeTab}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authToken}` },
    })
      .then(response => response.json())
      .then(res => {
        setpostsData(res);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);
  if (!postsData) return <Loader />;
  const posts = postsData.map(post => {
    return (
      <>
        <div className={styles.post}>
          <div className={styles.profile}>
            <img className={styles.profile_pic} src={profilePic} alt="Profile" />
            <div className={styles.info}>
              <p className={styles.name}> {post.userName}</p>
              <p className={styles.position}>
                {' '}
                {post.designation}, {post.company}
              </p>
            </div>
          </div>
          <p className={styles.post_text}>{post.text}</p>
          {post.url && (
            <a href={post.url} target="_blank" className={styles.url}>
              Related Url
            </a>
          )}
          <div className={styles.file_urls_container}>
            {post.fileUrls
              .filter(file => file.type === 'application')
              .map(file => {
                return (
                  <a href={file.uid} target="_blank" className={styles.url}>
                    {file.fileName}
                  </a>
                );
              })}
          </div>
          <div className={`${styles.images} ${styles.slider}`}>
            <div className={styles.slide}>
              {post.fileUrls
                .filter(file => file.type === 'image')
                .map(file => {
                  return <img className={styles.photo} src={file.uid} alt="photo1" />;
                })}
            </div>
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
      </>
    );
  });
  return (
    <div className={styles.show_posts}>
      {posts}
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
        <div className={`${styles.images} ${styles.slider}`}>
          <div className={styles.slide}>
            <img className={styles.photo} src={photo1} alt="photo1" />
            <img className={styles.photo} src={photo2} alt="photo1" />
            <img className={styles.photo} src={photo3} alt="photo1" />
            <img className={styles.photo} src={photo2} alt="photo1" />
            <img className={styles.photo} src={photo1} alt="photo1" />
            <img className={styles.photo} src={photo3} alt="photo1" />
          </div>
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
