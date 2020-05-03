/* eslint-disable no-nested-ternary */
import React from 'react';
import styles from './Register.module.css';

function RegisterForm1({ inputs, changeInputs }) {
  const date = new Date();
  const currentYear = date.getFullYear();
  const julyFlag = Number(date.getMonth() <= 7);
  // useEffect(()=>{
  //   switch (inputs.batchName) {
  //     case 'IPG':
  //       console.log('IPG');
  //       changeInputs({ target: { name: 'subBatch', value: 'MTech' } });
  //       break;
  //     case 'MTech':
  //       changeInputs({ target: { name: 'subBatch', value: 'DC' } });
  //       break;
  //     default:
  //       changeInputs({ target: { name: 'subBatch', value: 'NA' } });
  //   }
  // },[inputs.batchName]);
  const changeBatch = event => {
    changeInputs(event);
    switch (event.target.value) {
      case 'IPG':
        changeInputs({ target: { name: 'subBatch', value: 'MTech' } });
        break;
      case 'MTech':
        changeInputs({ target: { name: 'subBatch', value: 'DC' } });
        break;
      default:
        changeInputs({ target: { name: 'subBatch', value: 'NA' } });
    }
  };
  return (
    <div className={styles.container1}>
      <form className={styles.inputs_form_1}>
        <div className={styles.two_field}>
          <div className={styles.batch}>
            <label htmlFor="batchName">Batch</label>
            <div className={styles.batch_name}>
              <select name="batchName" onChange={changeBatch}>
                <option value="IPG">IPG</option>
                <option value="BCS">BCS</option>
                <option value="MTech">M.Tech</option>
                <option value="MBA">MBA</option>
                <option value="PhD">PhD</option>
                <option value="PGDIT">PGDIT</option>
                <option value="PGDMIT">PGDMIT</option>
              </select>
              {inputs.batchName === 'IPG' ? (
                <select name="subBatch" onChange={changeInputs}>
                  <option key="MTech" value="MTech">
                    M.Tech
                  </option>
                  <option key="MBA" value="MBA">
                    MBA
                  </option>
                </select>
              ) : inputs.batchName === 'MTech' ? (
                <select name="subBatch" onChange={changeInputs}>
                  <option key="DC" value="DC">
                    DC
                  </option>
                  <option key="CN" value="CN">
                    CN
                  </option>
                  <option key="VLSI" value="VLSI">
                    VLSI
                  </option>
                  <option key="ISS" value="ISS">
                    ISS
                  </option>
                </select>
              ) : (
                <select disabled name="subBatch" onChange={changeInputs}>
                  <option key="NA" value="NA">
                    NA
                  </option>
                </select>
              )}
            </div>
          </div>
          <div className={styles.field_right}>
            <label htmlFor="graduationYear">Graduation Year</label>
            <input
              onChange={changeInputs}
              type="number"
              min="1999"
              max={currentYear + 7}
              name="graduationYear"
              value={inputs.graduationYear}
            />
          </div>
        </div>
        <div className={styles.field}>
          <label htmlFor="dob">Date of Birth </label>
          <input onChange={changeInputs} required type="date" name="dob" value={inputs.dob} />
        </div>
        <div className={styles.field}>
          <label htmlFor="instituteEmail">Institute Email ID </label>
          <input
            onChange={changeInputs}
            required
            type="email"
            name="instituteEmail"
            value={inputs.instituteEmail}
            disabled={inputs.graduationYear <= currentYear - julyFlag}
            placeholder="Enter Your institute Email Id"
          />
        </div>
        <div className={styles.two_field}>
          <div className={styles.current_designation}>
            <label htmlFor="designation">Designation</label>
            <input
              onChange={changeInputs}
              placeholder="Position"
              type="text"
              name="designation"
              value={inputs.designation}
              disabled={inputs.graduationYear > currentYear - julyFlag}
            />
          </div>
          <div className={styles.current_designation}>
            <label htmlFor="company">At</label>
            <input
              onChange={changeInputs}
              placeholder="Company"
              type="text"
              name="company"
              value={inputs.company}
              disabled={inputs.graduationYear > currentYear - julyFlag}
            />
          </div>
        </div>
        <div className={styles.two_field}>
          <div className={styles.gender}>
            <label htmlFor="gender">Gender</label>
            <select name="gender" onChange={changeInputs}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm1;
