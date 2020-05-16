import React from 'react';
import { Link } from 'react-router-dom';
import useSWR, { useSWRPages } from 'swr';
import styles from './Post.module.css';
import { ReactComponent as LikeIcon } from '../../assets/icons/like.svg';
import { ReactComponent as ShareIcon } from '../../assets/icons/share.svg';
import profilePic from '../../assets/images/profile.jpg';
import { useAuth } from '../Hooks/Auth';
import { triggerAlert } from '../../utils/getAlert/getAlert';
import fetcher from '../../utils/fetcher';
import config from '../../utils/config';

function Post({ post }) {
  const { currentUser, authToken } = useAuth();
  const { pages, pageSWRs, isReachingEnd, loadMore } = useSWRPages(
    `comments${post._id}`,
    ({ offset, withSWR }) => {
      const { data, error } = withSWR(
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useSWR(`${config.apiUrl}/api/posts/${post._id}/comments?&offset=${offset || 0}`, fetcher, {
          refreshInterval: 30000,
        })
      );
      if (error) {
        return <p></p>;
      }
      if (!data) return <p></p>;
      return data.comments.map(comment => {
        return (
          <div className={styles.show_comments}>
            <img src={profilePic} className={styles.comment_profile_pic} alt="profile pic" />
            <div className={styles.comment_text_container}>
              <div className={styles.comment_text_wrapper}>
                <Link to={`/profile/${comment.userId}`} className={styles.comment_name}>
                  {comment.userName}
                </Link>
                <span className={styles.comment_text}>{comment.commentText}</span>
              </div>
            </div>
          </div>
        );
      });
    },
    ({ data }) => {
      return data.offset;
    },
    [post._id]
  );
  //   const { data, error } = useSWR(
  //     `http://localhost:4000/api/posts/${post.postId}/comments`,
  //     fetcher
  //   );
  //   if (error) return <p>Error in Loading Comments</p>;
  //   if (!data) return <p> Comments are loading</p>;
  const handleCommentSubmit = (event, postId) => {
    event.preventDefault();
    const data = new FormData(event.target);
    fetch(`${config.apiUrl}/api/posts/${postId}/comment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authToken}` },
      body: JSON.stringify({
        userId: currentUser._id,
        userName: currentUser.name,
        postId,
        commentText: data.get(postId),
      }),
    })
      .then(response => response.json())
      .then(res => {
        triggerAlert(res);
        if (res.icon === 'success') {
          document.getElementById(postId).value = '';
          pageSWRs.map(page => {
            page.revalidate();
          });
        }
      });
  };
  return (
    <React.Fragment key={post._id}>
      <div key={post._id} className={styles.post}>
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
          // eslint-disable-next-line react/jsx-no-target-blank
          <a href={post.url} target="_blank" className={styles.url}>
            Related Url
          </a>
        )}
        <div className={styles.file_urls_container}>
          {post.fileUrls
            .filter(file => file.type === 'application')
            .map(file => {
              return (
                // eslint-disable-next-line react/jsx-no-target-blank
                <a href={file.uid} key={file.uid} target="_blank" className={styles.url}>
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
                return <img key={file.uid} className={styles.photo} src={file.uid} alt="photo1" />;
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
        <form
          className={styles.add_comment}
          onSubmit={e => {
            handleCommentSubmit(e, post._id);
          }}
        >
          <img src={profilePic} className={styles.comment_profile_pic} alt="profile pic" />
          <textarea id={post._id} name={post._id} placeholder="Add Comment" />
          <button>Comment</button>
        </form>
        {/* <input onChange={e=>{changeComments({target:{name:post._id,value: e.target.value}})}} className={styles.add_comment} value={comments[post._id]}  type="text" placeholder="Add Comment" /> */}
      </div>
      {pages}
      <p
        className={isReachingEnd ? `${styles.invisible}` : `${styles.load_more_comments}`}
        onClick={loadMore}
      >
        Load More Comments
      </p>
      <hr className={styles.line}></hr>
    </React.Fragment>
  );
}

export default Post;
