import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import styles from './Landing.module.css';
import LandingLeft from '../../components/LandingLeft/LandingLeft';
import Login from '../../components/Login/Login';
import Register from '../../components/Register/Register';
import instituteLogo from '../../assets/images/instituteLogo.png';
import { ReactComponent as HelpSVG } from '../../assets/icons/help.svg';

function Landing() {
  return (
    <div className={styles.landing}>
      <div className={styles.left}>
        <LandingLeft />
      </div>
      <div className={styles.right}>
        <div className={styles.top}>
          <Link to="/">
            <img className={styles.institute_logo} src={instituteLogo} alt="logo" />
          </Link>
          <div className={styles.help}>
            <HelpSVG className={styles.help_logo} fill="#10116E" />
            {/* <span className={styles.help_text}>Help</span> */}
          </div>
        </div>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Landing;
