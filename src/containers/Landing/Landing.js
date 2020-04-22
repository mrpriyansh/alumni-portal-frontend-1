import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styles from './Landing.module.css';
import LandingLeft from '../../components/LandingLeft/LandingLeft';
import Login from '../../components/Login/Login';
import Register from '../../components/Register/Register';

function Landing() {
  return (
    <div className={styles.landing}>
      <div className={styles.left}>
        <LandingLeft />
      </div>
      <div className={styles.right}>
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
