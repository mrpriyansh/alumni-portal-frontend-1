import React from 'react';
import { Link } from 'react-router-dom';
import useSWR from 'swr';
import styles from './HomeRight.module.css';
import profilePic from '../../assets/images/profile.jpg';
import fetcher from '../../utils/fetcher';
import Loader from '../Loader/Loader';
import config from '../../utils/config';

function HomeRight() {
  const { data, error } = useSWR(`${config.apiUrl}/api/latestusers`, fetcher);
  if (error) return <p>Failed to Load</p>;
  if (!data) return <Loader />;
  return (
    <div className={styles.home_right}>
      <div className={styles.right_box}>
        <p className={styles.right_heading}> New Members </p>
        {data.map(user => {
          return (
            <>
              <div className={styles.member}>
                <img
                  className={styles.right_profile_pic}
                  src={user.profilePicUrl}
                  alt="Profile Pic"
                />
                <p className={styles.name}> {user.name} </p>
                <p className={styles.batch}>
                  {' '}
                  {user.admissionYear} {user.batchName}{' '}
                  {user.subBatch !== 'NA' ? `- ${user.subBatch}` : ''}
                </p>
              </div>
              <hr className={styles.line}></hr>
            </>
          );
        })}

        <Link to="/members" className={styles.right_footer}>
          All Members
        </Link>
      </div>
    </div>
  );
}

export default HomeRight;
