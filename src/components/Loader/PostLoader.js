import React from 'react';
import { ReactComponent as SpinnerIcon } from '../../assets/icons/postLoader.svg';
import styles from './Loader.module.css';

const PostLoader = ({ width, height }) => {
  console.log(width);
  return (
    <div className={styles.loader}>
      <SpinnerIcon width={width} height={height} />
    </div>
  );
};

// PostLoader.defaultProps = {
//   color: '#10116E',
//   size: '44px',
// };

export default PostLoader;
