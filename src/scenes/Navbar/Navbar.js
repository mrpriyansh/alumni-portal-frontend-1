import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import instituteLogo from '../../assets/images/instituteLogo.png';
import styles from './Navbar.module.css';
import { ReactComponent as NotificationBell } from '../../assets/icons/notification_bell.svg';
import { ReactComponent as HelpIcon } from '../../assets/icons/help.svg';
// import helpIcon from '../../assets/icons/help_navbar.svg';
// import SearchIcon from '../../assets/icons/search.svg';
import { useAuth } from '../../components/Hooks/Auth';

function Navbar() {
  const { authToken, setAuthToken, setCurrentUser } = useAuth();
  const history = useHistory();
  const handleLogout = () => {
    setAuthToken(null);
    localStorage.removeItem('token');
    setCurrentUser(null);
    history.replace('/');
  };
  const handleLogin = () => {
    history.push('/');
  };
  return (
    <div className={styles.navbar}>
      <div className={styles.left}>
        <Link to="/">
          <img className={styles.institute_logo} src={instituteLogo} alt="logo" />
        </Link>
        <div className={styles.title}>
          <p className={styles.institute_name}>ABV-IIITM's</p>
          <p className={styles.portal_name}>Alumni Association Portal</p>
        </div>
      </div>
      {/* <div className={styles.middle}>
        <div className={styles.search_box}>
          <input className={styles.search_text} type="text" placeholder="Search" name="search" />
        </div>
      </div> */}
      <div className={styles.right}>
        <NotificationBell width="2em" height="2em" fill="#10116E" />
        {authToken ? (
          <button onClick={handleLogout} className={styles.logout_button}>
            {' '}
            Logout{' '}
          </button>
        ) : (
          <button onClick={handleLogin} className={styles.logout_button}>
            {' '}
            Login{' '}
          </button>
        )}
        <hr className={styles.line}></hr>
        <HelpIcon fill="#878787" />
        {/* <img className={styles.help} src={helpIcon} alt="help" /> */}
      </div>
    </div>
  );
}

export default Navbar;
