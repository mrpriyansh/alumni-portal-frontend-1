import React from 'react';
import useSWR, { useSWRPages } from 'swr';
import styles from './ShowPosts.module.css';
// import Loader from '../Loader/Loader';
import PostLoader from '../Loader/PostLoader';
import fetcher from '../../services/fetcher';
import config from '../../services/config';
import Post from '../Post/Post';
import { useAuth } from '../Hooks/Auth';

function ShowPosts({ activeTab }) {
  const { pages, isLoadingMore, isReachingEnd, loadMore } = useSWRPages(
    `posts`,
    ({ offset, withSWR }) => {
      const { data, error } = withSWR(
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useSWR(`${config.apiUrl}/api/fetchposts/?type=${activeTab}&offset=${offset || 0}`, fetcher)
      );
      if (error) return <p> Failed to Load!</p>;
      // if (!data) return <PostLoader />;
      if (!data) return <PostLoader width="100%" height="100%" />;
      // if (data)
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
        !isLoadingMore && (
          <button
            onClick={loadMore}
            className={styles.load_more}
            disabled={isLoadingMore || isReachingEnd}
          >
            {' '}
            Load More
          </button>
        )
      )}
    </div>
  );
}

export default ShowPosts;
