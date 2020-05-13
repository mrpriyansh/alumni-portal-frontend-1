import React from 'react';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import styles from './Profile.module.css';
import { ReactComponent as EditProfileIcon } from '../../assets/icons/setting.svg';
import { ReactComponent as LinkedinIcon } from '../../assets/icons/linkedin.svg';
import { ReactComponent as EmailIcon } from '../../assets/icons/email.svg';
import { ReactComponent as TickIcon } from '../../assets/icons/tick.svg';
import profilePic from '../../assets/images/profile.jpg';
import { ReactComponent as EditSVG } from '../../assets/icons/edit.svg';
import fetcher from '../../utils/fetcher';
import Loader from '../../components/Loader/Loader';

function Profile() {
  const { profileId } = useParams();
  console.log(useParams());

  const { data, error } = useSWR(`http://localhost:4000/api/profile/${profileId}`, fetcher);
  if (error) return <p> Check Your Connectivity</p>;
  if (!data) return <Loader />;
  console.log(data);

  return (
    <div className={styles.profile}>
      <div className={styles.left}>
        <div className={styles.left_top}>
          <EditProfileIcon
            className={styles.edit_profile_icon}
            width="1em"
            height="1em"
            fill="#10116E"
          />
          <img className={styles.profile_pic} src={profilePic} alt="Profile" />
          <p className={styles.name}> Priyansh Gaharana</p>
          <p className={styles.batch}> 2017 IPG(MBA)</p>
          <hr className={styles.line}></hr>
          <p className={styles.position}> CEO, Google LLC</p>
          <div className={styles.profile_icons}>
            <LinkedinIcon width="1.2em" height="1.2em" fill="#10116E" />
            <EmailIcon width="1.2em" height="1.2em" fill="#10116E" />
          </div>
        </div>
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
