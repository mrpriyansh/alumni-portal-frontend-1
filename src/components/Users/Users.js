/* eslint-disable no-nested-ternary */
import React, { useState, useRef } from 'react';
import useSWR, { mutate } from 'swr';
import profilePic from '../../assets/images/profile.jpg';
import styles from './User.module.css';
import Loader from '../Loader/Loader';
import fetcher from '../../utils/fetcher';
import { ReactComponent as MailSVG } from '../../assets/icons/email.svg';
import { triggerAlert } from '../../utils/getAlert/getAlert';
import { ReactComponent as TickSVG } from '../../assets/icons/tick.svg';
import { useForm } from '../Hooks/handleInputs';
import config from '../../utils/config';

function Users({ isAdmin }) {
  const date = new Date();
  const currentYear = date.getFullYear();
  const julyFlag = Number(date.getMonth() <= 7);
  const [memberKey, setMemberKey] = useState(1);
  const [filterDetails, changeFilterDetails] = useState({
    admissionYear: '2019',
    batchName: 'IPG',
  });
  const [tempDetails, changeTempDetails] = useForm({ admissionYear: '2019', batchName: 'IPG' });
  const inputRef = useRef();

  const handleSearchButton = () => {
    let flag = 0;
    if (
      tempDetails.batchName === 'PGDMIT' &&
      +filterDetails.admissionYear >= 1998 &&
      +tempDetails.admissionYear <= 1999
    )
      flag = 1;
    else if (
      tempDetails.batchName === 'PGDIT' &&
      +tempDetails.admissionYear >= 1999 &&
      +tempDetails.admissionYear <= 2001
    )
      flag = 1;
    else if (tempDetails.batchName === 'BCS' && +tempDetails.admissionYear >= 2017) flag = 1;
    else if (
      (tempDetails.batchName === 'IPG' ||
        tempDetails.batchName === 'MTech' ||
        tempDetails.batchName === 'MBA' ||
        tempDetails.batchName === 'PhD') &&
      +tempDetails.admissionYear >= 2000 &&
      +tempDetails.admissionYear <= currentYear - julyFlag
    )
      flag = 1;
    setMemberKey(flag);
    if (flag === 0) {
      changeTempDetails({ target: { name: 'admissionYear', value: filterDetails.admissionYear } });
      changeTempDetails({ target: { name: 'batchName', value: filterDetails.batchName } });
      triggerAlert({ icon: 'error', title: 'Enter valid Admission Year and Course' });
    } else changeFilterDetails(tempDetails);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };
  const handleAdminButton = async (type, userId) => {
    const res = await fetcher(`${config.apiUrl}/api/admin/${type}/${userId}`);
    mutate(`${config.apiUrl}/api/users/?queryType=admin`, data);
    triggerAlert(res);
  };
  const { data, error } = useSWR(
    isAdmin
      ? `${config.apiUrl}/api/users/?queryType=admin`
      : memberKey
      ? `${config.apiUrl}/api/users/?queryType=members&admissionYear=${filterDetails.admissionYear}&batchName=${filterDetails.batchName}`
      : null,
    fetcher,
    { dedupingInterval: 0 }
  );
  if (error) return <p> Error in fetching </p>;
  return (
    <div className={styles.users}>
      <div className={styles.heading_box}>
        <span className={styles.main_heading}>
          {isAdmin ? `Waiting for approval` : `ABV-IIITM Faternity`}
        </span>
        {isAdmin ? (
          <div className={styles.header_buttons}>
            <button>Posts</button>
            <button className={styles.active_button}>Users</button>
          </div>
        ) : (
          <div className={styles.filter}>
            <input
              ref={inputRef}
              onChange={e => {
                setMemberKey(0);
                changeTempDetails(e);
              }}
              className={styles.batch_year}
              type="number"
              min="1998"
              max={currentYear - julyFlag}
              placeholder="Admission Year"
              value={tempDetails.admissionYear}
              name="admissionYear"
            />
            <select
              onChange={e => {
                setMemberKey(0);
                changeTempDetails(e);
              }}
              name="batchName"
              value={tempDetails.batchName}
              className={styles.batch_name}
            >
              <option value="IPG">IPG</option>
              <option value="BCS">BCS</option>
              <option value="MTech">M.Tech</option>
              <option value="MBA">MBA</option>
              <option value="PhD">PhD</option>
              <option value="PGDIT">PGDIT</option>
              <option value="PGDMIT">PGDMIT</option>
            </select>
            <button onClick={handleSearchButton} className={styles.search_button}>
              Search
            </button>
          </div>
        )}
      </div>
      <hr></hr>
      <div className={styles.content}>
        {!data ? (
          <Loader />
        ) : data.length ? (
          <>
            {data.map(user => {
              return (
                <div className={styles.user}>
                  <div className={styles.profile}>
                    <img className={styles.profile_pic} src={profilePic} alt="Profile" />
                    <div className={styles.info}>
                      <p className={styles.name}> {user.name} </p>
                      <p className={styles.position}>
                        {' '}
                        {user.designation} at {user.company}{' '}
                      </p>
                    </div>
                    <div className={styles.profile_icon}>
                      <a
                        href={`https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${user.email}`}
                        // eslint-disable-next-line react/jsx-no-target-blank
                        target="_blank"
                        className={styles.atag}
                      >
                        <MailSVG width="1.5em" height="1.5em" fill="#10116E" />
                      </a>
                      {isAdmin && user.isEmailVerified ? (
                        <TickSVG width="1em" height="1em" fill="#1E9F0F" />
                      ) : null}
                    </div>
                  </div>
                  <div className={styles.details}>
                    <div className={styles.dob}>
                      <span className={styles.field}> DOB: </span>
                      <span className={styles.value}> {user.dob}</span>
                    </div>
                    <div className={styles.batch}>
                      <span className={styles.field}> Batch: </span>
                      <span className={styles.value}>
                        {' '}
                        {user.admissionYear} {user.batchName}{' '}
                        {user.subBatch !== 'NA' ? `- ${user.subBatch}` : null}
                      </span>
                    </div>
                    <div className={styles.mobile_no}>
                      <span className={styles.field}> Mobile No: </span>
                      <span className={styles.value}> 9936794955</span>
                    </div>
                    <div className={styles.graduation_year}>
                      <span className={styles.field}> Graduation Year: </span>
                      <span className={styles.value}>{user.graduationYear}</span>
                    </div>
                    <div className={styles.joined_on}>
                      <span className={styles.field}> Joined On: </span>
                      <span className={styles.value}>
                        {user.timestamp.split(' ')[2]} {user.timestamp.split(' ')[1]}{' '}
                        {user.timestamp.split(' ')[3]}
                      </span>
                    </div>
                  </div>
                  {isAdmin ? (
                    <div className={styles.profile_buttons}>
                      <button
                        onClick={() => {
                          handleAdminButton('confirm', user._id);
                        }}
                        className={styles.accept_button}
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => {
                          handleAdminButton('delete', user._id);
                        }}
                        className={styles.reject_button}
                      >
                        Reject
                      </button>
                    </div>
                  ) : null}
                </div>
              );
            })}
            {[...Array(3 - (data.length % 3))].map(arr => {
              return <div className={`${styles.user} ${styles.visibilty}`}> sdfa</div>;
            })}
          </>
        ) : (
          <p>
            No one registered from {filterDetails.admissionYear} {filterDetails.batchName} batch.
            Invite them!
          </p>
        )}
      </div>
    </div>
  );
}

export default Users;
