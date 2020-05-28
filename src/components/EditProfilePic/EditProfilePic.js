/* eslint-disable no-unused-expressions */
import React, { useRef, useState, useCallback, useEffect } from 'react';
import Cropper from 'react-easy-crop';
import styles from './EditProfilePic.module.css';
import config from '../../utils/config';
import { triggerAlert } from '../../utils/getAlert/getAlert';
import { useAuth } from '../Hooks/Auth';
import { ReactComponent as ReloadSVG } from '../../assets/icons/reload.svg';
import getCroppedImg from './cropImage';

function EditProfilePic({ setOpenModal, userInfo }) {
  const { currentUser, setCurrentUser } = useAuth();
  const [active, setActive] = useState(true);
  const [activeSave, setActiveSave] = useState(false);
  const [tempUrl, changetempUrl] = useState(userInfo.imageUrl);
  const imageInputRef = useRef();
  // for file operation
  const [fileOperation, setFileOperation] = useState(false);
  const [inputFile, changeInputFile] = useState();
  const [zoom, setZoom] = useState(1);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const handleRejectButton = () => {
    setOpenModal(false);
  };
  window.addEventListener('message', event => {
    if (event.data && event.data.type === 'profile') {
      if (event.data.profile.profilePicture) {
        changetempUrl(
          event.data.profile.profilePicture['displayImage~'].elements[3].identifiers[0].identifier
        );
        setFileOperation(false);
        setActiveSave(true);
      } else {
        triggerAlert({ icon: 'info', title: 'No DP found!' });
      }
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

  function dataURLtoFile(dataurl, filename) {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    // eslint-disable-next-line no-plusplus
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }
  const handleUploadButton = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(inputFile, croppedAreaPixels, 0);
      setActive(false);
      const file = dataURLtoFile(croppedImage, 'profile');
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
          setFileOperation(false);
          setActiveSave(true);
        });
    } catch (e) {
      triggerAlert({ icon: 'error', title: 'Please Try Again!' });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [croppedAreaPixels]);

  const handleSaveButton = () => {
    setActiveSave(false);
    fetch(`${config.apiUrl}/api/updateprofile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ data: { profilePicUrl: tempUrl } }),
    })
      .then(response => response.json())
      .then(res => {
        setOpenModal(false);
        setCurrentUser({ ...currentUser, profilePicUrl: tempUrl });
        triggerAlert(res);
      });
  };
  const handleChooseFile = () => {
    imageInputRef.current.click();
  };
  function readFile(file) {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.addEventListener('load', () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  }
  const handleChangeInut = async event => {
    if (event.target.files) {
      const file = event.target.files[0];
      console.log(file);
      if (file.type.split('/')[0] !== 'image') {
        triggerAlert({ icon: 'error', title: 'Please upload image only' });
        setActive(true);
      } else {
        setFileOperation(true);
        const image = await readFile(file);
        changeInputFile(image);
      }
    }
  };
  const handleReload = () => {
    setFileOperation(false);
    setActiveSave(false);
  };
  // eslint-disable-next-line no-shadow
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);
  return (
    <div className={styles.edit_profile_pic}>
      <div className={styles.content}>
        <p className={styles.header}>Upload Profile Picture</p>
        {!fileOperation ? (
          <img className={styles.pic} src={tempUrl} alt="profile" />
        ) : (
          <div className={styles.crop_wrapper}>
            <Cropper
              image={inputFile}
              crop={crop}
              zoom={zoom}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              cropSize={{ width: 150, height: 150 }}
              cropShape="round"
              showGrid={false}
              classes={{
                containerClassName: `${styles.crop_container}`,
                cropAreaClassName: `${styles.crop_area}`,
              }}
            />
            <div className={styles.slider_wrapper}>
              <ReloadSVG
                width="1em"
                height="1em"
                className={styles.reload}
                onClick={handleReload}
              />
              <input
                type="range"
                min="1"
                max="3"
                step="0.1"
                className={styles.slider}
                value={zoom}
                onChange={e => {
                  setZoom(e.target.value);
                }}
              />
            </div>
          </div>
        )}
        <div className={styles.optionsbuttons}>
          {!fileOperation ? (
            <button className={styles.choose_button} onClick={handleChooseFile} disabled={!active}>
              {' '}
              <input
                ref={imageInputRef}
                type="file"
                className={styles.upload_input}
                accept="image/*"
                onChange={handleChangeInut}
                disabled={!active}
              />{' '}
              Pick Image{' '}
            </button>
          ) : (
            <button
              className={styles.upload_button}
              onClick={handleUploadButton}
              disabled={!active}
            >
              {' '}
              Upload{' '}
            </button>
          )}
          <button
            className={styles.linkedin_button}
            onClick={handleLinkedinButton}
            disabled={!active}
          >
            {' '}
            Via Linkedin{' '}
          </button>
        </div>
        {console.log(!active && activeSave)}
        <hr className={styles.line} />
        <div className={styles.footer}>
          <button className={styles.reject_button} onClick={handleRejectButton}>
            Reject
          </button>
          <button
            className={styles.save_button}
            disabled={!activeSave && tempUrl === currentUser.profilePicUrl}
            onClick={handleSaveButton}
          >
            Save{' '}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfilePic;
