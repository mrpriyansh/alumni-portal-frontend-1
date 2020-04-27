import React from 'react';
import styles from './Register.module.css';

function RegisterForm0({ inputs, changeInputs }) {
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
          <input
            onChange={changeInputs}
            placeholder="Phone Number"
            type="text"
            name="phoneno"
            value={inputs.phoneno}
          />
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
    </form>
  );
}

export default RegisterForm0;
