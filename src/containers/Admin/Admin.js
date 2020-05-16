import React from 'react';
import styles from './Admin.module.css';
import Users from '../../components/Users/Users';
import { useAuth } from '../../components/Hooks/Auth';
import Loader from '../../components/Loader/Loader';
import HomeLeft from '../../components/HomeLeft/HomeLeft';

function Admin() {
  const { currentUser } = useAuth();
  if (!currentUser) return <Loader />;
  if (!currentUser.isAdmin) return <p>Go Home Baby!</p>;
  return (
    <div className={styles.admin}>
      <div className={styles.left}>
        <p className={styles.left_heading}>Admin Portal</p>
        <HomeLeft user={currentUser} isBottom={false} />
      </div>
      <div className={styles.main}>
        <Users isAdmin={true} />
      </div>
    </div>
  );
}

export default Admin;
