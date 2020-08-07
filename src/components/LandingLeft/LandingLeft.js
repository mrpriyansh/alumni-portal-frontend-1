import React from 'react';
import styles from './LandingLeft.module.css';

function LandingLeft() {
  return (
    <div className={styles.landing_left}>
      <div className={styles.top}></div>
      <div className={styles.middle}>
        <div className={styles.middle_left}></div>
        <div className={styles.middle_right}></div>
      </div>
      <div className={styles.bottom}></div>
    </div>
  );
}

export default LandingLeft;
