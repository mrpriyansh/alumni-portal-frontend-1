/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import useSWR, { mutate } from 'swr';
import profilePic from '../../assets/images/profile.jpg';
import styles from './hell.module.css';
import Loader from '../Loader/Loader';
import fetcher from '../../utils/fetcher';
import { ReactComponent as MailSVG } from '../../assets/icons/email.svg';
import { triggerAlert } from '../../utils/getAlert/getAlert';
import { ReactComponent as TickSVG } from '../../assets/icons/tick.svg';
import { useForm } from '../Hooks/handleInputs';

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

  useEffect(() => {
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
  }, [tempDetails]);

  // // const { data, error } = useSWR(
  // //   isAdmin
  // //     ? `http://localhost:4000/api/users/?queryType=admin`
  // //     : memberKey
  // //     ? `http://localhost:4000/api/users/?queryType=members&admissionYear=${filterDetails.admissionYear}&batchName=${filterDetails.batchName}`
  // //     : null,
  // //   fetcher,
  // //   { dedupingInterval: 0 }
  // // );
  // if (error) return <p> Error in fetching </p>;
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
            {/* <button onClick={handleSearchButton} className={styles.search_button}>
              Search
            </button> */}
          </div>
        )}
      </div>
      <hr></hr>
    </div>
  );
}

export default Users;
