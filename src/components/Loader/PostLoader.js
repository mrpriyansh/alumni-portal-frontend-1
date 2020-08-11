import React from 'react';
import { ReactComponent as PostLoaderSVG } from '../../assets/icons/post_loader.svg';
import styles from './Loader.module.css';

const PostLoader = ({ width, height }) => {
  console.log(width);
  return (
    <div className={styles.loader}>
      <PostLoaderSVG width={width} height={height} />
    </div>
  );
};

// PostLoader.defaultProps = {
//   color: '#10116E',
//   size: '44px',
// };

export default PostLoader;
