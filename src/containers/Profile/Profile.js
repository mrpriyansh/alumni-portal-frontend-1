import React from 'react';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import styles from './Profile.module.css';
import { ReactComponent as LinkedinIcon } from '../../assets/icons/linkedin.svg';
import { ReactComponent as EditSVG } from '../../assets/icons/edit.svg';
import fetcher from '../../utils/fetcher';
import Loader from '../../components/Loader/Loader';
import config from '../../utils/config';
import HomeLeft from '../../components/HomeLeft/HomeLeft';
import { useAuth } from '../../components/Hooks/Auth';

function Profile() {
  const { profileId } = useParams();
  const { currentUser } = useAuth();
  const { data, error } = useSWR(`${config.apiUrl}/api/profile/${profileId}`, fetcher);
  if (error) return <p> Check Your Connectivity</p>;
  if (!data) return <Loader />;

  return (
    <div className={styles.profile}>
      <div className={styles.left}>
        <HomeLeft user={data} isBottom={false} isEditProfilePic={data._id === currentUser._id} />
      </div>
      <div className={styles.main}>
        <div className={styles.main_left}>
          <div className={styles.header}>
            <p className={styles.heading}> Profile Section </p>
            <EditSVG width="1.5em" height="1.5em" className={styles.edit_svg} />
          </div>
          <div className={styles.content}>
            <div className={styles.details}>
              <p className={styles.label}> Name </p>
              <div className={styles.field}> {data.name}</div>
            </div>
            <div className={styles.details}>
              <p className={styles.label}> E-mail </p>
              <div className={styles.field}> {data.email}</div>
            </div>
            <div className={styles.details}>
              <p className={styles.label}> Phone </p>
              <div className={styles.field}>
                {' '}
                {data.phonenoCode} - {data.phoneno}
              </div>
            </div>
            <div className={styles.details}>
              <p className={styles.label}> Gender </p>
              <div className={styles.field}>{data.gender}</div>
            </div>
            <div className={styles.details}>
              <p className={styles.label}> DOB</p>
              <div className={styles.field}>
                {' '}
                {data.dob.split('-')[2]}-{data.dob.split('-')[1]}-{data.dob.split('-')[0]}{' '}
              </div>
            </div>
            <div className={styles.details}>
              <p className={styles.label}> Location</p>
              <div className={styles.field}> Gwalior, Madhya Pradesh</div>
            </div>
            <div className={styles.about_details}>
              <p className={styles.label}> About</p>
              <div className={styles.field}>
                {' '}
                Officia incididunt minim pariatur ad ipsum mollit excepteur laborum aliqua eu mollit
                mollit. In reprehenderit labore occaecat ea ipsum exercitation proident nulla
                Officia incididunt minim pariatur ad ipsum mollit excepteur laborum aliqua eu mollit
                mollit. In reprehenderit labore occaecat ea ipsum exercitation proident nulla
                commodo velit proident cupidatat nisi. Mollit commodo ullamco sunt mollit
                adipisicing ipsum reprehenderit magna.{' '}
              </div>
            </div>
          </div>
        </div>
        <hr className={styles.vertical_line}></hr>
        <div className={styles.main_right}>
          <div className={styles.main_right_upper}>
            <div className={styles.header}>
              <p className={styles.heading}> Work Experience </p>
              <EditSVG width="1.5em" height="1.5em" className={styles.edit_svg} />
            </div>
            <div className={styles.right_upper_content}>
              <div className={styles.experience}>
                <p className={styles.experience_heading}> UI/UX Designer </p>
                <div className={styles.experience_company_wrapper}>
                  <p className={styles.experience_company}> Zubi Infotech Pvt. Ltd.</p>
                  <p className={styles.experience_duration}>Feb,2020 - Present</p>
                </div>
              </div>
              <hr className={styles.horizontal_line}></hr>
              <div className={styles.experience}>
                <p className={styles.experience_heading}> UI/UX Designer </p>
                <div className={styles.experience_company_wrapper}>
                  <p className={styles.experience_company}> Zubi Infotech Pvt. Ltd.</p>
                  <p className={styles.experience_duration}>Feb,2020 - Present</p>
                </div>
              </div>
              <hr className={styles.horizontal_line}></hr>
              <div className={styles.experience}>
                <p className={styles.experience_heading}> UI/UX Designer </p>
                <div className={styles.experience_company_wrapper}>
                  <p className={styles.experience_company}> Zubi Infotech Pvt. Ltd.</p>
                  <p className={styles.experience_duration}>Feb,2020 - Present</p>
                </div>
              </div>
              <hr className={styles.horizontal_line}></hr>
              <div className={styles.experience}>
                <p className={styles.experience_heading}> UI/UX Designer </p>
                <div className={styles.experience_company_wrapper}>
                  <p className={styles.experience_company}> Zubi Infotech Pvt. Ltd.</p>
                  <p className={styles.experience_duration}>Feb,2020 - Present</p>
                </div>
              </div>
              <hr className={styles.horizontal_line}></hr>
              <div className={styles.experience}>
                <p className={styles.experience_heading}> UI/UX Designer </p>
                <div className={styles.experience_company_wrapper}>
                  <p className={styles.experience_company}> Zubi Infotech Pvt. Ltd.</p>
                  <p className={styles.experience_duration}>Feb,2020 - Present</p>
                </div>
              </div>
              <hr className={styles.horizontal_line}></hr>
            </div>
          </div>
          <div className={styles.right_bottom}>
            <div className={styles.header}>
              <p className={styles.heading}> Link </p>
              <EditSVG width="1.5em" height="1.5em" className={styles.edit_svg} />
            </div>
            <div className={styles.right_lower_content}>
              <div className={styles.links}>
                <LinkedinIcon className={styles.right_bottom_icon} />
                <span className={styles.links_url}>
                  https://linkedin.com/in/manish-mavi-05-manish0
                </span>
              </div>
              <div className={styles.links}>
                <LinkedinIcon className={styles.right_bottom_icon} />
                <span className={styles.links_url}>https://linkedin.com/in/manish-mavi-05</span>
              </div>
              <div className={styles.links}>
                <LinkedinIcon className={styles.right_bottom_icon} />
                <span className={styles.links_url}>https://linkedin.com/in/manish-mavi-05</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
