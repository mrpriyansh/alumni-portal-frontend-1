import React, { useState } from 'react';
import useSWR, { mutate } from 'swr';
import profilePic from '../../assets/images/profile.jpg';
import styles from './User.module.css';
import Loader from '../Loader/Loader';
import fetcher from '../../utils/fetcher';
import { ReactComponent as MailSVG } from '../../assets/icons/email.svg';
import { triggerAlert } from '../../utils/getAlert/getAlert';
import { ReactComponent as TickSVG } from '../../assets/icons/tick.svg';

function Users({ isAdmin }) {
  const date = new Date();
  const currentYear = date.getFullYear();
  const julyFlag = Number(date.getMonth() <= 7);
  const [fetchingKey, setFetchingKey] = useState();
  if (isAdmin && fetchingKey !== 'admin') setFetchingKey('admin');
  const handleButton = async (type, userId) => {
    console.log(type, userId);
    const res = await fetcher(`http://localhost:4000/api/admin/${type}/${userId}`);
    mutate(`http://localhost:4000/api/users/?queryType=admin`, data);
    triggerAlert(res);
  };
  const { data, error } = useSWR(
    isAdmin ? `http://localhost:4000/api/users/?queryType=admin` : null,
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
        <div className={styles.header_buttons}>
          <button>Posts</button>
          <button className={styles.active_button}>Users</button>
        </div>
        <div className={styles.filter}>
          {isAdmin ? null : (
            <>
              <input
                className={styles.batch_year}
                type="number"
                min="1998"
                max={currentYear - julyFlag}
                placeholder="Admission Year"
              />
              <select className={styles.batch_name}>
                <option value="IPG">IPG</option>
                <option value="BCS">BCS</option>
                <option value="MTech">M.Tech</option>
                <option value="MBA">MBA</option>
                <option value="PhD">PhD</option>
                <option value="PGDIT">PGDIT</option>
                <option value="PGDMIT">PGDMIT</option>
              </select>
              <button className={styles.search_button}>Search</button>
            </>
          )}
        </div>
      </div>
      <hr></hr>
      <div className={styles.content}>
        {!data ? (
          <Loader />
        ) : (
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
                  <div className={styles.profile_buttons}>
                    <button
                      onClick={() => {
                        handleButton('confirm', user._id);
                      }}
                      className={styles.accept_button}
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => {
                        handleButton('delete', user._id);
                      }}
                      className={styles.reject_button}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              );
            })}
            {[...Array(3 - (data.length % 3))].map(arr => {
              return <div className={`${styles.user} ${styles.visibilty}`}> sdfa</div>;
            })}
          </>
        )}
      </div>
    </div>
  );
}

export default Users;
