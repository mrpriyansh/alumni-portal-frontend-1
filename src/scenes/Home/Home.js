import React, { useState } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import styles from './Home.module.css';
import Timeline from '../../components/Timeline/Timeline';
import { useAuth } from '../../components/Hooks/Auth';
import Loader from '../../components/Loader/Loader';
import HomeLeft from '../../components/HomeLeft/HomeLeft';
import HomeRight from '../../components/HomeRight/HomeRight';

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
          isEditProfilePic={true}
        />
      </div>
      <div className={styles.middle}>
        <Timeline activeTab={activeTab} />
      </div>
      <div className={styles.right}>
        <HomeRight />
      </div>
    </div>
  );
}

export default Home;
