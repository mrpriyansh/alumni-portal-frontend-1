import React from 'react';
import styles from './Profile.module.css';
import Navbar from '../Navbar/Navbar';
import Timeline from '../../components/Timeline/Timeline';
import { ReactComponent as EditProfileIcon } from '../../assets/svgs/setting.svg';
import { ReactComponent as LinkedinIcon } from '../../assets/svgs/linkedin.svg';
import { ReactComponent as EmailIcon } from '../../assets/svgs/email.svg';
import { ReactComponent as TickIcon } from '../../assets/svgs/tick.svg';
import profilePic from '../../assets/images/profile.jpg';

function Profile() {
  return (
    <div>
      <Navbar />
      <div className={styles.profile}>
        <div className={styles.left}>
          <div className={styles.left_top}>
            <EditProfileIcon
              className={styles.edit_profile_icon}
              width="1em"
              height="1em"
              fill="#10116E"
            />
            <img className={styles.profile_pic} src={profilePic} alt="Profile" />
            <p className={styles.name}> Priyansh Gaharana</p>
            <p className={styles.batch}> 2017 IPG(MBA)</p>
            <hr className={styles.line}></hr>
            <p className={styles.position}> CEO, Google LLC</p>
            <div className={styles.profile_icons}>
              <LinkedinIcon width="1.2em" height="1.2em" fill="#10116E" />
              <EmailIcon width="1.2em" height="1.2em" fill="#10116E" />
            </div>
          </div>
          <div className={styles.left_bottom}>
            <p className={styles.left_heading}> Filters</p>
            <div className={styles.filter_item}>
              <TickIcon className={styles.tick_icon} width="0.8em" height="0.8em" fill="#DCDCDC" />
              <p className={styles.filter_text}> Job Opportunities</p>
            </div>
            <hr className={styles.line}></hr>
            <div className={styles.filter_item}>
              <TickIcon className={styles.tick_icon} width="0.8em" height="0.8em" fill="#DCDCDC" />
              <p className={styles.filter_text}>Asked Referals</p>
            </div>
            <hr className={styles.line}></hr>
            <div className={styles.filter_item}>
              <TickIcon className={styles.tick_icon} width="0.8em" height="0.8em" fill="#DCDCDC" />
              <p className={styles.filter_text}> Activities</p>
            </div>
          </div>
        </div>
        <div className={styles.main}>
          <Timeline />
        </div>
      </div>
    </div>
  );
}

export default Profile;
