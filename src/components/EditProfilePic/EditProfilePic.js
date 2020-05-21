import React, { useRef, useState } from 'react';
import styles from './EditProfilePic.module.css';
import config from '../../utils/config';
import { triggerAlert } from '../../utils/getAlert/getAlert';
import { useAuth } from '../Hooks/Auth';

function EditProfilePic({ setOpenModal, userInfo }) {
  const { currentUser, setCurrentUser } = useAuth();
  const [active, setActive] = useState(true);
  const [tempUrl, changetempUrl] = useState(userInfo.imageUrl);
  const imageInputRef = useRef();
  const handleRejectButton = () => {
    setOpenModal(false);
  };
  const handleUploadButton = () => {
    imageInputRef.current.click();
  };
  window.addEventListener('message', event => {
    if (event.data && event.data.type === 'profile') {
      event.data.profile.profilePicture
        ? changetempUrl(
            event.data.profile.profilePicture['displayImage~'].elements[3].identifiers[0].identifier
          )
        : triggerAlert({ icon: 'info', title: 'No DP found!' });
    }
    setActive(true);
  });
  const handleLinkedinButton = () => {
    setActive(false);
    const url = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=86sj8qwrm6zlvy&redirect_uri=${config.apiUrl}/api/linkedinauth&state=bajrang&scope=r_liteprofile%20r_emailaddress%20w_member_social`;
    const width = 400;
    const height = 1000;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    window.open(
      url,
      'Linkedin',
      `menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=${width}, height=${height}, top=${top}, left=${left}`
    );
  };
  const uploadImage = event => {
    setActive(false);
    if (event.target.files) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file, file.name);
      fetch(`${config.apiUrl}/api/uploadimage`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        body: formData,
      })
        .then(response => response.json())
        .then(res => {
          setActive(true);
          changetempUrl(res.data);
        });
    }
  };
  const handleSaveButton = () => {
    fetch(`${config.apiUrl}/api/changeProfilePic`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ url: tempUrl }),
    })
      .then(response => response.json())
      .then(res => {
        setOpenModal(false);
        setCurrentUser({ ...currentUser, profilePicUrl: tempUrl });
        triggerAlert(res);
      });
  };
  return (
    <div className={styles.edit_profile_pic}>
      <div className={styles.content}>
        <p className={styles.header}>Upload Profile Picture</p>
        <img className={styles.pic} src={tempUrl} alt="profile" />
        <div className={styles.optionsbuttons}>
          <button className={styles.upload_button} onClick={handleUploadButton} disabled={!active}>
            {' '}
            <input
              ref={imageInputRef}
              type="file"
              className={styles.upload_input}
              accept="image/*"
              onChange={uploadImage}
              disabled={!active}
            />{' '}
            Upload{' '}
          </button>
          <button
            className={styles.linkedin_button}
            onClick={handleLinkedinButton}
            disabled={!active}
          >
            {' '}
            Via Linkedin{' '}
          </button>
        </div>
        <hr className={styles.line} />
        <div className={styles.footer}>
          <button className={styles.reject_button} onClick={handleRejectButton}>
            Reject
          </button>
          <button className={styles.save_button} disabled={!active} onClick={handleSaveButton}>
            Save{' '}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfilePic;
