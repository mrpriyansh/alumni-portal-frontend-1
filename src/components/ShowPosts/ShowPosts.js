import React from 'react';
import useSWR, { useSWRPages } from 'swr';
import styles from './ShowPosts.module.css';
import Loader from '../Loader/Loader';
import fetcher from '../../utils/fetcher';
import config from '../../utils/config';
import Post from '../Post/Post';

function ShowPosts({ activeTab }) {
  const { pages, isLoadingMore, isReachingEnd, loadMore } = useSWRPages(
    `posts`,
    ({ offset, withSWR }) => {
      const { data, error } = withSWR(
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useSWR(
          `${config.apiUrl}/api/fetchposts/ALL?type=${activeTab}&offset=${offset || 0}`,
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
