import React from 'react';
import styles from './Members.module.css';
import { useAuth } from '../../components/Hooks/Auth';
import { ReactComponent as EditProfileIcon } from '../../assets/icons/setting.svg';
import { ReactComponent as LinkedinIcon } from '../../assets/icons/linkedin.svg';
import profilePic from '../../assets/images/profile.jpg';
import { ReactComponent as EmailIcon } from '../../assets/icons/email.svg';
import Loader from '../../components/Loader/Loader';
import Users from '../../components/Users/Users';

function Members() {
  const { currentUser } = useAuth();
  if (!currentUser) return <Loader />;

  return (
    <div className={styles.members}>
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
            {currentUser.admissionYear} {currentUser.batchName}-{currentUser.subBatch}
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
      </div>
      <div className={styles.main}>
        <Users isAdmin={false} />
      </div>
    </div>
  );
}

export default Members;
