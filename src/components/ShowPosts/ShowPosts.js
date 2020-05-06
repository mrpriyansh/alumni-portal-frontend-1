import React from 'react';
import useSWR, { useSWRPages } from 'swr';
import styles from './ShowPosts.module.css';
import { ReactComponent as LikeIcon } from '../../assets/icons/like.svg';
import { ReactComponent as ShareIcon } from '../../assets/icons/share.svg';
import profilePic from '../../assets/images/profile.jpg';
import Loader from '../Loader/Loader';
import fetcher from '../../utils/fetcher';

function ShowPosts({ activeTab }) {
  const { pages, isLoadingMore, isReachingEnd, loadMore } = useSWRPages(
    `posts`,
    ({ offset, withSWR }) => {
      const { data, error } = withSWR(
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useSWR(
          `http://localhost:4000/api/fetchposts/ALL?type=${activeTab}&offset=${offset || 0}`,
          fetcher
        )
      );
      if (error) return <p> Failed to Load!</p>;
      if (!data) return <Loader />;
      return data.posts.map(post => {
        return (
          <>
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
                      return (
                        <img key={file.uid} className={styles.photo} src={file.uid} alt="photo1" />
                      );
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
    },

    ({ data }) => {
      return data.offset;
    },
    [activeTab]
  );
  return (
    <div className={styles.show_posts}>
      {pages}
      {isReachingEnd ? (
        <p className={styles.no_more_posts}> No more posts</p>
      ) : (
        <button
          onClick={loadMore}
          className={styles.load_more}
          disabled={isLoadingMore || isReachingEnd}
        >
          {' '}
          Load More
        </button>
      )}
    </div>
  );
}

export default ShowPosts;
