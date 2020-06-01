import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './HomeLeft.module.css';
import profilePic from '../../assets/images/profile.jpg';
import { ReactComponent as EditProfileIcon } from '../../assets/icons/setting.svg';
import { ReactComponent as LinkedinIcon } from '../../assets/icons/linkedin.svg';
import { ReactComponent as EmailIcon } from '../../assets/icons/email.svg';
import { ReactComponent as TickIcon } from '../../assets/icons/tick.svg';
import Modal from '../../containers/Modal/Modal';
import EditProfilePic from '../EditProfilePic/EditProfilePic';

function HomeLeft({ user, handleTabChange, activeTab, isBottom, isEditProfilePic }) {
  const [openModal, setOpenModal] = useState(false);
  const handleEditProfilePic = () => {
    setOpenModal(true);
  };
  return (
    <div className={styles.home_left}>
      {openModal && (
        <Modal
          childName={'EditProfilePic'}
          Child={EditProfilePic}
          setOpenModal={setOpenModal}
          userInfo={{ id: user._id, imageUrl: user.profilePicUrl }}
        />
      )}
      <div className={styles.left_top}>
        {/* {isEditProfilePic && (
          <EditProfileIcon
            className={styles.edit_profile_icon}
            width="1em"
            height="1em"
            fill="#10116E"
            onClick={handleEditProfilePic}
          />
        )} */}
        <div className={styles.wrapper_profile_pic}>
          {isEditProfilePic && (
            <span className={styles.dp_hover} onClick={handleEditProfilePic}>
              Upload DP
            </span>
          )}
          <img
            className={
              isEditProfilePic
                ? `${styles.profile_pic} ${styles.canClick}`
                : `${styles.profile_pic}`
            }
            onClick={handleEditProfilePic}
            src={user.profilePicUrl}
            alt="Profile"
          />
        </div>
        <Link to={`/profile/${user._id}`}>
          <p className={styles.name}>{user.name.split(' ')[0]}</p>
        </Link>
        <p className={styles.batch}>
          {user.admissionYear} {user.batchName} {user.subBatch !== 'NA' ? `- ${user.subBatch}` : ''}
        </p>
        <hr className={styles.line}></hr>
        <p className={styles.position}>
          {' '}
          {user.designation} at {user.company}{' '}
        </p>
        {!isEditProfilePic && (
          <div className={styles.profile_icons}>
            {user.links.linkedin.lenght && (
              <a href={user.links.linkedin} target="_blank">
                <LinkedinIcon width="1.2em" height="1.2em" fill="#10116E" />
              </a>
            )}
            <a href={`mailto:${user.email}`}>
              <EmailIcon width="1.2em" height="1.2em" fill="#10116E" />
            </a>
          </div>
        )}
      </div>
      {isBottom && (
        <div className={styles.left_bottom}>
          <p className={styles.left_heading}> Filters</p>
          <div onClick={() => handleTabChange('tab1')} className={styles.filter_item}>
            <TickIcon
              className={styles.tick_icon}
              width="0.8em"
              height="0.8em"
              fill={activeTab === 'tab1' ? '#10116E' : '#DCDCDC'}
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
              fill={activeTab === 'tab2' ? '#10116E' : '#DCDCDC'}
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
              fill={activeTab === 'tab3' ? '#10116E' : '#DCDCDC'}
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
      )}
    </div>
  );
}

export default HomeLeft;
