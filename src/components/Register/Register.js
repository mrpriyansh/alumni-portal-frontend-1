/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styles from './Register.module.css';
import { useForm } from '../Hooks/handleInputs';
import instituteLogo from '../../assets/images/instituteLogo.png';
import { ReactComponent as HelpSVG } from '../../assets/svgs/help.svg';
import { ReactComponent as Next } from '../../assets/svgs/next.svg';
import RegisterForm0 from './RegisterForm0';
import RegisterForm1 from './RegisterForm1';
import { emailValidation, phonenoValidation } from '../../utils/validateData';
import { triggerAlert } from '../../utils/getAlert/getAlert';

function Register() {
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
    userType: 'student',
    designation: 'CA',
    company: 'Google',
    gender: 'Male',
  });
  const handleRegister = event => {
    console.log(inputs);
    event.preventDefault();
    if (!step) {
      if (!inputs.name || !emailValidation(inputs.email) || !phonenoValidation(inputs.phoneno)) {
        triggerAlert({ icon: 'error', title: 'Please verify your details' });
      } else {
        changeStep(1);
      }
    } else if (
      !inputs.dob ||
      !inputs.designation ||
      !inputs.company ||
      !inputs.batchName ||
      !inputs.subBatch
    ) {
      triggerAlert({ icon: 'error', title: 'Please verify your details' });
    } else {
      history.replace('/');
    }
  };
  useEffect(() => {}, []);
  return (
    <div className={styles.register}>
      <div className={styles.top}>
        <img className={styles.institute_logo} src={instituteLogo} alt="logo" />
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
        <div class={styles.lower}>
          <button type="submit" onClick={handleRegister} className={styles.register_button}>
            {' '}
            Register <Next className={styles.next_arrow} fill="#ffffff" />{' '}
          </button>
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
