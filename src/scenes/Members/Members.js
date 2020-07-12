import React from 'react';
import styles from './Members.module.css';
import { useAuth } from '../../components/Hooks/Auth';
import Loader from '../../components/Loader/Loader';
import Users from '../../components/Users/Users';
import HomeLeft from '../../components/HomeLeft/HomeLeft';

function Members() {
  const { currentUser } = useAuth();
  if (!currentUser) return <Loader />;

  return (
    <div className={styles.members}>
      <div className={styles.left}>
        <HomeLeft user={currentUser} isBottom={false} isEditProfilePic={true} />
      </div>
      <div className={styles.main}>
        <Users isAdmin={false} />
      </div>
    </div>
  );
}

export default Members;
