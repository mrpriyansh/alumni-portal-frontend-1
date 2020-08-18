import React from 'react';
import { ReactComponent as SpinnerIcon } from '../../assets/icons/Spinner.svg';
import { ReactComponent as HomeLoader } from '../../assets/icons/home_loader.svg';
import styles from './Loader.module.css';

const Loader = ({ background, color, size }) => {
  return (
    <div className={styles.loader}>
      <HomeLoader height={size} width={size} fill={color} stroke={color} />
    </div>
  );
};

Loader.defaultProps = {
  color: '#10116E',
  size: '100px',
};

export default Loader;
