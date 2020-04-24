import React from 'react';
import styles from './Home.module.css';
import Navbar from '../Navbar/Navbar';
import { ReactComponent as EditProfileIcon } from '../../assets/svgs/setting.svg';
import { ReactComponent as LinkedinIcon } from '../../assets/svgs/linkedin.svg';
import { ReactComponent as EmailIcon } from '../../assets/svgs/email.svg';
import { ReactComponent as TickIcon } from '../../assets/svgs/tick.svg';
import profilePic from '../../assets/images/profile.jpg';
import Timeline from '../../components/Timeline/Timeline';
import { ReactComponent as UploadIcon } from '../../assets/svgs/upload.svg';
import { ReactComponent as PostIcon } from '../../assets/svgs/post.svg';
import { ReactComponent as LikeIcon } from '../../assets/svgs/like.svg';

function Home() {
  return (
    <div>
      <Navbar />
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
        <div className={styles.middle}>
          <Timeline />
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
    </div>
  );
}

export default Home;
