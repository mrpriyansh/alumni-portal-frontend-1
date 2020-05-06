import React from 'react';
import useSWR, { useSWRPages } from 'swr';
import styles from './ShowPosts.module.css';
import Loader from '../Loader/Loader';
import fetcher from '../../utils/fetcher';
import Post from '../Post/Post';

function ShowPosts({ activeTab }) {
  // const RenderComment = post => {
  //   const { data, error } = useSWR(`http://127.0.0.1:4000/api/posts/${post._id}/comments`, fetcher);
  //   if (error) return <p> Faild to Load </p>;
  //   if (!data) return <p> Loading </p>;
  //   return data.map(comment => {
  //     return (
  //       <>
  //         <img src={profilePic} className={styles.comment_profile_pic} alt="profile pic" />
  //         <div className={styles.comment_text}>
  //           <Link to={`/profile/${comment.userId}`} className={styles.comment_name}>
  //             {' '}
  //             {comment.userName}{' '}
  //           </Link>
  //           <span>{comment.commentText} </span>
  //         </div>
  //       </>
  //     );
  //   });
  // };
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
        return <Post post={post} />;
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
