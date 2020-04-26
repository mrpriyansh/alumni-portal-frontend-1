import React from 'react';
import instituteLogo from '../../assets/images/instituteLogo.png';
import styles from './Navbar.module.css';
import { ReactComponent as NotificationBell } from '../../assets/svgs/notification_bell.svg';
import { ReactComponent as HelpIcon } from '../../assets/svgs/help.svg';
import helpIcon from '../../assets/svgs/help_navbar.svg';
import SearchIcon from '../../assets/svgs/search.svg';
import { useAuth } from '../../components/Hooks/Auth';

function Navbar() {
  const authToken = useAuth();
  return (
    <div className={styles.navbar}>
      <div className={styles.left}>
        <img className={styles.institute_logo} src={instituteLogo} alt="logo" />
        <div className={styles.title}>
          <p className={styles.institute_name}>ABV-IIITM's</p>
          <p className={styles.portal_name}>Alumni Association Portal</p>
        </div>
      </div>
      <div className={styles.middle}>
        <div className={styles.search_box}>
          <input className={styles.search_text} type="text" placeholder="Search" name="search" />
        </div>
      </div>
      <div className={styles.right}>
        {console.log(authToken)}
        <NotificationBell width="2em" height="2em" fill="#10116E" />
        {authToken ? (
          <button className={styles.logout_button}> Logout </button>
        ) : (
          <button className={styles.logout_button}> Login </button>
        )}
        <hr className={styles.line}></hr>
        <HelpIcon fill="#878787" />
        {/* <img className={styles.help} src={helpIcon} alt="help" /> */}
      </div>
    </div>
  );
}

export default Navbar;
