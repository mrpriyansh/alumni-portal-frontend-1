import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useSWR, { useSWRPages } from 'swr';
import styles from './Post.module.css';
import { ReactComponent as ShareIcon } from '../../assets/icons/share.svg';
import { ReactComponent as PostLoader } from '../../assets/icons/single_post_loader.svg';
import { useAuth } from '../Hooks/Auth';
import { triggerAlert } from '../../services/getAlert/getAlert';
import fetcher from '../../services/fetcher';
import config from '../../services/config';

function Post({ post }) {
  const { currentUser, authToken } = useAuth();
  const [loading, setLoading] = useState(false); // for comment button
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
            <img
              src={comment.profilePicUrl}
              className={styles.comment_profile_pic}
              alt="profile pic"
            />
            <div className={styles.comment_text_container}>
              <div className={styles.comment_text_wrapper}>
                <Link to={`/profile/${comment.userId}`} className={styles.comment_name}>
                  {comment.name}
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
  if (!currentUser) return <PostLoader width="100%" height="100%" />;

  const handleCommentSubmit = (event, postId) => {
    setLoading(true);
    event.preventDefault();
    const data = new FormData(event.target);
    if (!data.get(postId).length) {
      triggerAlert({ icon: 'error', title: 'Comment Cannot be empty!' });
      setLoading(false);
      return;
    }
    fetch(`${config.apiUrl}/api/posts/${postId}/comment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authToken}` },
      body: JSON.stringify({
        userId: currentUser._id,
        postId,
        commentText: data.get(postId),
      }),
    })
      .then(response => response.json())
      .then(res => {
        triggerAlert(res);
        if (res.icon === 'success') {
          document.getElementById(postId).value = '';
          // eslint-disable-next-line array-callback-return
          pageSWRs.map(page => {
            page.revalidate();
          });
        }
        setLoading(false);
      });
  };
  return (
    <React.Fragment key={post._id}>
      <div key={post._id} className={styles.post}>
        <div className={styles.profile}>
          <img className={styles.profile_pic} src={post.profilePicUrl} alt="Profile" />
          <div className={styles.info}>
            <Link to={`profile/${post.userId}`} className={styles.name}>
              {' '}
              {post.name}
            </Link>
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
            .filter(file => file.type !== 'image')
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
          {/* <span>
            <LikeIcon height="1em" width="1em" fill="#FF046B" /> Like{' '}
          </span>{' '} */}
          <span>
            <ShareIcon height="1.5em" width="1.5em" /> Share
          </span>
        </div>
        <form
          className={styles.add_comment}
          onSubmit={e => {
            handleCommentSubmit(e, post._id);
          }}
        >
          <img
            src={currentUser.profilePicUrl}
            className={styles.comment_profile_pic}
            alt="profile pic"
          />
          <textarea id={post._id} name={post._id} placeholder="Add Comment" />
          <button disabled={loading}>Comment</button>
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
