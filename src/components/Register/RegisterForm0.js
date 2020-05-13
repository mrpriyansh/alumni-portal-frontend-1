import React from 'react';
import styles from './Register.module.css';
import phoneCode from '../../assets/data/phone-code';
import { ReactComponent as Next } from '../../assets/icons/next.svg';

function RegisterForm0({ inputs, changeInputs, handleRegister }) {
  const date = new Date();
  const currentYear = date.getFullYear();
  const julyFlag = Number(date.getMonth() <= 7);
  return (
    <form className={styles.inputs_form}>
      <div className={styles.field}>
        <label htmlFor="name">Name:</label>
        <input
          onChange={changeInputs}
          placeholder="Your Good Name"
          type="text"
          name="name"
          value={inputs.name}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="email">E-mail Id:</label>
        <input
          onChange={changeInputs}
          placeholder="Email address"
          type="email"
          name="email"
          value={inputs.email}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="password">Password</label>
        <input
          onChange={changeInputs}
          placeholder="Password"
          type="password"
          name="password"
          value={inputs.password}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="conifrmPassword">Confirm Password</label>
        <input
          onChange={changeInputs}
          placeholder="Confirm Password"
          type="password"
          name="confirmPassword"
          value={inputs.confirmPassword}
        />
      </div>
      <div className={styles.two_field}>
        <div className={styles.field_left}>
          <label htmlFor="phoneno">Phone Number</label>
          <div className={styles.phone_wrapper}>
            <select className={styles.phone_code} name="phonenoCode" onChange={changeInputs}>
              {phoneCode.map(code => {
                return (
                  <option value={code.dial_code} selected={code.code === 'IN'}>
                    {code.code} {code.dial_code}
                  </option>
                );

                //   <option value='+91'>
                //   {code.code} {code.dial_code}
                // </option>
              })}
            </select>
            <input
              className={styles.phone_no}
              onChange={changeInputs}
              placeholder="Phone Number"
              type="text"
              name="phoneno"
              value={inputs.phoneno}
            />
          </div>
        </div>
        <div className={styles.field_right}>
          <label htmlFor="admissionYear">Admission Year</label>
          <input
            onChange={changeInputs}
            type="number"
            min="1998"
            max={currentYear - julyFlag}
            name="admissionYear"
            value={inputs.admissionYear}
          />
        </div>
      </div>
      <div className={styles.register_button_wrapper}>
        <button type="submit" onClick={handleRegister} className={styles.register_button}>
          Register <Next className={styles.next_arrow} fill="#ffffff" />{' '}
        </button>
      </div>
    </form>
  );
}

export default RegisterForm0;
