import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Login.module.css';
import instituteLogo from '../../assets/images/instituteLogo.png';
import helpSVG from '../../assets/svgs/help.svg';
import { useForm } from '../Hooks/handleInputs';
import { ReactComponent as Next } from '../../assets/svgs/next.svg';
import { useAuth } from '../Hooks/Auth';

function Login() {
  const { setAuthToken } = useAuth();
  const [inputs, changeInputs] = useForm({ email: '', password: '' });
  const handleLogin = event => {
    event.preventDefault();
    setAuthToken(true);
  };
  return (
    <div className={styles.login}>
      <div className={styles.top}>
        <img className={styles.institute_logo} src={instituteLogo} alt="logo" />
        <div className={styles.help}>
          <img className={styles.help_logo} src={helpSVG} alt="help" />
          <span className={styles.help_text}>Help</span>
        </div>
      </div>
      <div className={styles.login_box}>
        <div className={styles.heading}>
          <p className={styles.heading_upper}> Welcome to</p>
          <p className={styles.heading_lower}> ABV-IIITM's</p>
          <p className={styles.heading_lower}> Alumni Portal</p>
        </div>
        <div className={styles.inputs_form}>
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
        </div>
        <button type="submit" onClick={handleLogin} className={styles.login_button}>
          {' '}
          Login <Next className={styles.next_arrow} />{' '}
        </button>
        <hr className={styles.line}></hr>
        <h4 className={styles.login_not_registered}>
          Don't have an account yet?
          <Link to="/register" className={styles.register_link}>
            Register{' '}
          </Link>
        </h4>
      </div>
    </div>
  );
}

export default Login;
