import React from 'react';
import instituteLogo from '../../assets/images/instituteLogo.png';
import styles from './Navbar.module.css';

function Navbar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.left}>
        <img className={styles.institute_logo} src={instituteLogo} alt="logo" />
        <div>
          <p>ABV-IIITM's</p>
          <p>Alumni Association Portal</p>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
