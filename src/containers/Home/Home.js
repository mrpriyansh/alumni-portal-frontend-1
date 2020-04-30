import React, { useState, useRef, useEffect } from 'react';
import styles from './Home.module.css';
import { ReactComponent as EditProfileIcon } from '../../assets/icons/setting.svg';
import { ReactComponent as LinkedinIcon } from '../../assets/icons/linkedin.svg';
import { ReactComponent as EmailIcon } from '../../assets/icons/email.svg';
import { ReactComponent as TickIcon } from '../../assets/icons/tick.svg';
import profilePic from '../../assets/images/profile.jpg';
import Timeline from '../../components/Timeline/Timeline';
import { useAuth } from '../../components/Hooks/Auth';
import Loader from '../../components/Loader/Loader';

function Home() {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('tab1');
  const handleTabChange = tab => {
    setActiveTab(tab);
  };
  if (!currentUser) return <Loader />;
  return (
    <div className={styles.home}>
      <div className={styles.left}>
        <div className={styles.left_top}>
          <EditProfileIcon
            className={styles.edit_profile_icon}
            width="1em"
            height="1em"
            fill="#10116E"
          />
          <img className={styles.profile_pic} src={profilePic} alt="Profile" />
          <p className={styles.name}>{currentUser.name.split(' ')[0]}</p>
          <p className={styles.batch}>
            {' '}
            {currentUser.admissionYear} {currentUser.batchName}-{currentUser.subBatch}{' '}
          </p>
          <hr className={styles.line}></hr>
          <p className={styles.position}>
            {' '}
            {currentUser.designation} at {currentUser.company}{' '}
          </p>
          <div className={styles.profile_icons}>
            <LinkedinIcon width="1.2em" height="1.2em" fill="#10116E" />
            <EmailIcon width="1.2em" height="1.2em" fill="#10116E" />
          </div>
        </div>
        <div className={styles.left_bottom}>
          <p className={styles.left_heading}> Filters</p>
          <div onClick={() => handleTabChange('tab1')} className={styles.filter_item}>
            <TickIcon
              className={styles.tick_icon}
              width="0.8em"
              height="0.8em"
              fill={activeTab === 'tab1' ? '10116E' : '#DCDCDC'}
            />
            <p
              className={
                activeTab === 'tab1' ? `${styles.active_filter_text}` : `${styles.filter_text}`
              }
            >
              {' '}
              Job Opportunities
            </p>
          </div>
          <hr className={styles.line}></hr>
          <div onClick={() => handleTabChange('tab2')} className={styles.filter_item}>
            <TickIcon
              className={styles.tick_icon}
              width="0.8em"
              height="0.8em"
              fill={activeTab === 'tab2' ? '10116E' : '#DCDCDC'}
            />
            <p
              className={
                activeTab === 'tab2' ? `${styles.active_filter_text}` : `${styles.filter_text}`
              }
            >
              Asked Referals
            </p>
          </div>
          <hr className={styles.line}></hr>
          <div onClick={() => handleTabChange('tab3')} className={styles.filter_item}>
            <TickIcon
              className={styles.tick_icon}
              width="0.8em"
              height="0.8em"
              fill={activeTab === 'tab3' ? '10116E' : '#DCDCDC'}
            />
            <p
              className={
                activeTab === 'tab3' ? `${styles.active_filter_text}` : `${styles.filter_text}`
              }
            >
              {' '}
              Activities
            </p>
          </div>
        </div>
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
        </div>
      </div>
    </div>
  );
}

export default Home;
