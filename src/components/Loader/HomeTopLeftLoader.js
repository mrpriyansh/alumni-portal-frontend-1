import React from 'react';
import { ReactComponent as HomeTopLeftSVG } from '../../assets/icons/home_top_left.svg';
import styles from './Loader.module.css';

const HomeTopLeftLoader = ({ width, height }) => {
  return (
    <div className={styles.loader}>
      <HomeTopLeftSVG width={width} height={height} />
    </div>
  );
};

// PostLoader.defaultProps = {
//   color: '#10116E',
//   size: '44px',
// };

export default HomeTopLeftLoader;
