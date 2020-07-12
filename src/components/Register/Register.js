/* eslint-disable no-lonely-if */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import styles from './Register.module.css';
import { useForm } from '../Hooks/handleInputs';
import RegisterForm0 from './RegisterForm0';
import RegisterForm1 from './RegisterForm1';
import {
  emailValidation,
  gradutationYearValidation,
  instituteEmailValidation,
} from '../../services/validateData';
import { triggerAlert, registerPopup } from '../../services/getAlert/getAlert';
import config from '../../services/config';
import handleError from '../../services/handleError';

function Register() {
  const date = new Date();
  const currentYear = date.getFullYear();
  const julyFlag = Number(date.getMonth() <= 7);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [step, changeStep] = useState(0);
  const [flag, changeFlag] = useState(0);
  const [inputs, changeInputs] = useForm({
    name: 'Priyansh',
    email: 'kf@kf.com',
    password: '123456',
    confirmPassword: '123456',
    phonenoCode: '+91',
    phoneno: '9933332222',
    batchName: 'IPG',
    subBatch: 'MTech',
    dob: '1998-08-28',
    admissionYear: '2019',
    graduationYear: '2024',
    userType: 'alumni',
    designation: '',
    company: '',
    instituteEmail: 'a@iiitm.ac.in',
    gender: 'Male',
  });
  useEffect(() => {
    if (flag) {
      setLoading(true);
      fetch(`${config.apiUrl}/api/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputs),
      })
        .then(response => response.json().then(data => ({ status: response.status, body: data })))
        .then(res => {
          if (res.status === 200) {
            registerPopup(res.body.title);
            history.replace('/');
          } else {
            changeFlag(0);
            throw res;
          }
        })
        .catch(err => handleError(err, triggerAlert))
        .finally(() => setLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flag]);
  const phonenoValidation = phoneno => {
    const number = parsePhoneNumberFromString(phoneno);
    if (number && number.isValid()) {
      changeInputs({ target: { name: 'phoneno', value: number.nationalNumber } });
      return 1;
    }
    return 0;
  };
  const handleRegister = event => {
    event.preventDefault();
    changeInputs({ target: { name: 'email', value: inputs.email.toLowerCase() } });
    changeInputs({
      target: { name: 'instituteEmail', value: inputs.instituteEmail.toLowerCase() },
    });
    if (!step) {
      if (
        inputs.name.length &&
        emailValidation(inputs.email) &&
        phonenoValidation(inputs.phonenoCode + inputs.phoneno) &&
        inputs.password.length >= 6 &&
        inputs.password === inputs.confirmPassword
      ) {
        changeStep(1);
      } else if (inputs.password !== inputs.confirmPassword) {
        triggerAlert({ icon: 'error', title: "Password don't match" });
      } else {
        triggerAlert({ icon: 'error', title: 'Enter valid details' });
      }
    } else {
      // validate the batch, admission Year and graduation Year
      if (
        // inputs.admissionYear <= currentYear - julyFlag &&
        // inputs.admissionYear >= 1998 &&
        gradutationYearValidation(
          inputs.batchName,
          +inputs.admissionYear,
          +inputs.graduationYear,
          currentYear - julyFlag
        )
      ) {
        // validate user is alumni
        if (inputs.graduationYear > currentYear - julyFlag) {
          // user is current student and validate institute email
          if (!instituteEmailValidation(inputs.instituteEmail.toLowerCase())) {
            triggerAlert({ icon: 'error', title: 'Institute Email is not valid' });
          } else {
            // details are valid
            changeInputs({ target: { name: 'userType', value: 'student' } });
            changeInputs({ target: { name: 'designation', value: 'Student' } });
            changeInputs({ target: { name: 'company', value: 'ABV-IIITM' } });
            setLoading(true);
            changeFlag(1);
          }
        } else {
          // validate designation and company
          if (!inputs.designation.length || !inputs.company.length) {
            triggerAlert({ icon: 'error', title: 'Enter Designation & Company' });
          } else {
            // details are valid
            changeInputs({ target: { name: 'instituteEmail', value: '' } });
            setLoading(true);
            changeFlag(1);
          }
        }
      }
    }
  };
  return (
    <div className={styles.register}>
      <div className={styles.register_box}>
        <div className={styles.heading}>Register</div>
        {!step ? (
          <RegisterForm0
            inputs={inputs}
            changeInputs={changeInputs}
            loading={loading}
            handleRegister={handleRegister}
          />
        ) : (
          <RegisterForm1
            inputs={inputs}
            changeInputs={changeInputs}
            handleRegister={handleRegister}
            changeStep={changeStep}
            loading={loading}
          />
        )}
        <div className={styles.lower}>
          <hr className={styles.line}></hr>
          <h4 className={styles.login_not_registered}>
            Already have an account?
            <Link to="/" className={styles.register_link}>
              Login{' '}
            </Link>
          </h4>
        </div>
      </div>
    </div>
  );
}

export default Register;
