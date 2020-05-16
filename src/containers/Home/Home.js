import React, { useState } from 'react';
import { Redirect, useLocation, Link } from 'react-router-dom';
import profilePic from '../../assets/images/profile.jpg';
import styles from './Home.module.css';
import Timeline from '../../components/Timeline/Timeline';
import { useAuth } from '../../components/Hooks/Auth';
import Loader from '../../components/Loader/Loader';
import HomeLeft from '../../components/HomeLeft/HomeLeft';

function Home() {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('tab1');
  const location = useLocation();
  const referer = location.state && location.state.referer ? location.state.referer : '/';
  if (referer !== '/') {
    return <Redirect to={referer} />;
  }
  const handleTabChange = tab => {
    setActiveTab(tab);
  };
  if (!currentUser) return <Loader />;

  return (
    <div className={styles.home}>
      <div className={styles.left}>
        <HomeLeft
          user={currentUser}
          activeTab={activeTab}
          handleTabChange={handleTabChange}
          isBottom={true}
        />
      </div>
      <div className={styles.middle}>
        <Timeline activeTab={activeTab} />
      </div>
      <div className={styles.right}>
        <div className={styles.right_box}>
          <p className={styles.right_heading}> New Members </p>
          <div className={styles.member}>
            <img className={styles.right_profile_pic} src={profilePic} alt="Profile Pic" />
            <p className={styles.name}> Priyansh </p>
            <p className={styles.batch}> 2017 IPG Mtech</p>
          </div>
          <hr className={styles.line}></hr>
          <div className={styles.member}>
            <img className={styles.right_profile_pic} src={profilePic} alt="Profile Pic" />
            <p className={styles.name}> Anuj </p>
            <p className={styles.batch}> 2017 IPG Mtech</p>
          </div>
          <hr className={styles.line}></hr>
          <div className={styles.member}>
            <img className={styles.right_profile_pic} src={profilePic} alt="Profile Pic" />
            <p className={styles.name}> Siddarth </p>
            <p className={styles.batch}> 2017 IPG Mtech</p>
          </div>
          <hr className={styles.line}></hr>
          <Link to="/members" className={styles.right_footer}>
            All Members
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
