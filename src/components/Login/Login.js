import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Login.module.css';
import { useForm } from '../Hooks/handleInputs';
import { ReactComponent as Next } from '../../assets/icons/next.svg';
import { useAuth } from '../Hooks/Auth';
import { emailValidation } from '../../services/validateData';
import { triggerAlert } from '../../services/getAlert/getAlert';
import config from '../../services/config';
import handleError from '../../services/handleError';

function Login() {
  const { setAuthToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [inputs, changeInputs] = useForm({ email: '', password: '' });
  const handleLogin = event => {
    event.preventDefault();
    setLoading(true);
    if (emailValidation(inputs.email) && inputs.password.length >= 6) {
      fetch(`${config.apiUrl}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputs),
      })
        .then(response => response.json().then(data => ({ status: response.status, body: data })))
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            setAuthToken(res.body);
            window.localStorage.setItem('token', res.body);
          } else {
            throw res;
          }
        })
        .catch(err => handleError(err, triggerAlert))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
      emailValidation(inputs.email)
        ? triggerAlert({ icon: 'error', title: 'Enter valid Password' })
        : triggerAlert({ icon: 'error', title: 'Enter valid Email' });
    }
  };
  return (
    <div className={styles.login}>
      <div className={styles.login_box}>
        <div className={styles.heading}>
          <p className={styles.heading_upper}> Welcome to</p>
          <p className={styles.heading_lower}> ABV-IIITM's</p>
          <p className={styles.heading_lower}> Alumni Portal</p>
        </div>
        <form className={styles.inputs_form}>
          <div className={styles.field}>
            <label htmlFor="email-address">E-mail Address</label>
            <input
              onChange={changeInputs}
              type="email"
              name="email"
              value={inputs.email}
              placeholder="Enter E-mail address"
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="password">Password</label>
            <input
              onChange={changeInputs}
              type="password"
              name="password"
              value={inputs.password}
              placeholder="Enter Password"
            />
          </div>
          <button
            type="submit"
            onClick={handleLogin}
            className={styles.login_button}
            disabled={loading}
          >
            Login <Next className={styles.next_arrow} fill="#ffffff" />
          </button>
        </form>
        <div className={styles.lower}>
          <hr className={styles.line}></hr>
          <h4 className={styles.login_not_registered}>
            Don't have an account yet?
            <Link to="/register" className={styles.register_link}>
              Register{' '}
            </Link>
          </h4>
        </div>
      </div>
    </div>
  );
}

export default Login;
