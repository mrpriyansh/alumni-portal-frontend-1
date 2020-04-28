import React from 'react';
import styles from './Admin.module.css';
import Navbar from '../Navbar/Navbar';
import { ReactComponent as EditProfileIcon } from '../../assets/icons/setting.svg';
import { ReactComponent as LinkedinIcon } from '../../assets/icons/linkedin.svg';
import { ReactComponent as EmailIcon } from '../../assets/icons/email.svg';
import { ReactComponent as TickIcon } from '../../assets/icons/tick.svg';
import profilePic from '../../assets/images/profile.jpg';
import Users from '../../components/Users/Users';

function Admin() {
  return (
    <div>
      <Navbar />
      <div className={styles.admin}>
        <div className={styles.left}>
          <p className={styles.left_heading}>Admin Portal</p>
          <div className={styles.left_top}>
            <EditProfileIcon
              className={styles.edit_profile_icon}
              width="1em"
              height="1em"
              fill="#10116E"
            />
            <img className={styles.profile_pic} src={profilePic} alt="Profile" />
            <p className={styles.name}> Anuj Ashok Kumar</p>
            <p className={styles.batch}> 2017 IPG(MBA)</p>
            <hr className={styles.line}></hr>
            <p className={styles.position}> CEO, Google LLC</p>
            <div className={styles.profile_icons}>
              <LinkedinIcon width="1.2em" height="1.2em" fill="#10116E" />
              <EmailIcon width="1.2em" height="1.2em" fill="#10116E" />
            </div>
          </div>
        </div>
        <div className={styles.main}>
          <div className={styles.heading_box}>
            <span className={styles.main_heading}>Waiting for approval</span>
            <div className={styles.buttons}>
              <button>Posts</button>
              <button className={styles.active_button}>Users</button>
            </div>
            <div className={styles.search_box}>
              <input className={styles.search} type="text" placeholder="Search User" />
            </div>
          </div>
          <hr></hr>
          <div className={styles.content}>
            <Users />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
