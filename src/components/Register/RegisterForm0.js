import React from 'react';
import styles from './Register.module.css';
import phoneCode from '../../assets/data/phone-code';
import { ReactComponent as Next } from '../../assets/icons/next.svg';

function RegisterForm0({ inputs, changeInputs, handleRegister, loading }) {
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
      <div className={styles.field}>
        {/* <div className={styles.two_field}>
        <div className={styles.field_left}> */}
        <label htmlFor="phoneno">Phone Number</label>
        <div className={styles.phone_wrapper}>
          <select className={styles.phone_code} name="phonenoCode" onChange={changeInputs}>
            {phoneCode.map(code => {
              return (
                <option value={code.dial_code} selected={code.dial_code === inputs.phonenoCode}>
                  {code.code}
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
            placeholder="Phone No."
            type="text"
            name="phoneno"
            value={inputs.phoneno}
          />
          {/* </div> */}
        </div>
      </div>
      <div className={styles.register_button_wrapper}>
        <button
          type="submit"
          onClick={handleRegister}
          className={styles.register_button}
          disabled={loading}
        >
          Register <Next className={styles.next_arrow} fill="#ffffff" />{' '}
        </button>
      </div>
    </form>
  );
}

export default RegisterForm0;
