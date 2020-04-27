/* eslint-disable no-lonely-if */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styles from './Register.module.css';
import { useForm } from '../Hooks/handleInputs';
import instituteLogo from '../../assets/images/instituteLogo.png';
import { ReactComponent as HelpSVG } from '../../assets/icons/help.svg';
import { ReactComponent as Next } from '../../assets/icons/next.svg';
import RegisterForm0 from './RegisterForm0';
import RegisterForm1 from './RegisterForm1';
import {
  emailValidation,
  phonenoValidation,
  gradutationYearValidation,
} from '../../utils/validateData';
import { triggerAlert, registerPopup } from '../../utils/getAlert/getAlert';

function Register() {
  const date = new Date();
  const currentYear = date.getFullYear();
  const julyFlag = Number(date.getMonth() <= 7);
  const history = useHistory();
  const [step, changeStep] = useState(0);
  const [inputs, changeInputs] = useForm({
    name: 'Priyansh',
    email: 'kf@kf.com',
    password: '123456',
    confirmPassword: '123456',
    phoneno: '9933332222',
    batchName: 'IPG',
    subBatch: 'MTech',
    dob: '1998-08-28',
    admissionYear: '2019',
    graduationYear: '2024',
    userType: 'alumni',
    designation: '',
    company: '',
    gender: 'Male',
  });
  useEffect(() => {
    console.log(inputs);
  }, [inputs]);
  const changeToStudent = () => {
    changeInputs({ target: { name: 'userType', value: 'student' } });
    changeInputs({ target: { name: 'designation', value: 'Student' } });
    changeInputs({ target: { name: 'company', value: 'ABV-IIITM' } });
  };
  const handleRegister = event => {
    console.log(inputs);
    event.preventDefault();
    if (!step) {
      if (
        inputs.name.length &&
        emailValidation(inputs.email) &&
        phonenoValidation(inputs.phoneno) &&
        inputs.password.length >= 6 &&
        inputs.password === inputs.confirmPassword &&
        inputs.admissionYear <= currentYear - julyFlag &&
        inputs.admissionYear >= 1998
      ) {
        changeStep(1);
      } else if (inputs.password !== inputs.confirmPassword) {
        triggerAlert({ icon: 'error', title: "Password don't match" });
      } else {
        triggerAlert({ icon: 'error', title: 'Enter valid details' });
      }
    } else {
      if (gradutationYearValidation(inputs.batch, inputs.admissionYear, inputs.graduationYear)) {
        if (
          inputs.graduationYear <= currentYear - julyFlag &&
          (!inputs.designation.length || !inputs.company.length)
        ) {
          triggerAlert({ icon: 'error', title: 'Enter Designation & Company' });
        } else {
          if (inputs.graduationYear > currentYear - julyFlag) {
            changeToStudent();
            registerPopup(`Please verify yourself using institute Email-Id!`);
          } else {
            registerPopup(
              `We will notify you when the account gets approved by the admin in 2-3 working days!`
            );
          }
          history.push('/');
          // fetch('http://localhost:4000/api/signup', {
          //   method: 'POST',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify(inputs),
          // })
          //   .then(response => response.json())
          //   .then(res => {
          //     if (res.icon === 'success') {
          //       triggerAlert(res);
          //       history.replace('/');
          //     } else {
          //       triggerAlert(res);
          //     }
          //   });
        }
      } else {
        triggerAlert({ icon: 'error', title: 'Enter valid details.' });
      }
    }
  };
  useEffect(() => {}, []);
  return (
    <div className={styles.register}>
      <div className={styles.top}>
        <Link to="/">
          <img className={styles.institute_logo} src={instituteLogo} alt="logo" />
        </Link>
        <div className={styles.help}>
          <HelpSVG className={styles.help_logo} height="1.4em" width="1.4em" fill="#10116E" />
          <span className={styles.help_text}>Help</span>
        </div>
      </div>
      <div className={styles.register_box}>
        <div className={styles.heading}>Register</div>
        {!step ? (
          <RegisterForm0 inputs={inputs} changeInputs={changeInputs} />
        ) : (
          <RegisterForm1 inputs={inputs} changeInputs={changeInputs} />
        )}
        <button type="submit" onClick={handleRegister} className={styles.register_button}>
          Register <Next className={styles.next_arrow} fill="#ffffff" />{' '}
        </button>
        <div class={styles.lower}>
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
