import React from 'react';
import { ReactComponent as SpinnerIcon } from '../../assets/icons/Spinner.svg';
import styles from './Loader.module.css';

const Loader = ({ background, color, size }) => {
  return (
    <div className={styles.loader}>
      <SpinnerIcon height={size} width={size} fill={color} stroke={color} />
    </div>
  );
};

Loader.defaultProps = {
  color: '#10116E',
  size: '44px',
};

export default Loader;
