import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useSWR, { mutate } from 'swr';
import styles from './Profile.module.css';
import { ReactComponent as LinkedinIcon } from '../../assets/icons/linkedin.svg';
import { ReactComponent as EditSVG } from '../../assets/icons/edit.svg';
import { ReactComponent as TickSVG } from '../../assets/icons/tick.svg';
import { ReactComponent as FBSVG } from '../../assets/icons/fb.svg';
import { ReactComponent as WebsiteSVG } from '../../assets/icons/website.svg';
import fetcher from '../../utils/fetcher';
import Loader from '../../components/Loader/Loader';
import config from '../../utils/config';
import HomeLeft from '../../components/HomeLeft/HomeLeft';
import { useAuth } from '../../components/Hooks/Auth';
import { useForm } from '../../components/Hooks/handleInputs';
import { urlValidation } from '../../utils/validateData';
import { triggerAlert } from '../../utils/getAlert/getAlert';

function Profile() {
  const { profileId } = useParams();
  const { currentUser } = useAuth();
  const { data, error } = useSWR(`${config.apiUrl}/api/profile/${profileId}`, fetcher);
  const [updLinks, setUpdLinks] = useState(false);
  const [updDetails, setUpdDetails] = useState(false);
  const [links, changeLinks] = useForm({ fb: '', linkedin: '', website: '' });
  const [details, changeDetails] = useForm({ location: '', about: '' });
  if (error) return <p> Check Your Connectivity</p>;
  if (!data) return <Loader />;
  if (!currentUser) return <Loader />;
  const handleUpdateLinks = () => {
    setUpdLinks(true);
    changeLinks({ target: { name: 'fb', value: data.links.fb } });
    changeLinks({ target: { name: 'linkedin', value: data.links.linkedin } });
    changeLinks({ target: { name: 'website', value: data.links.website } });
    console.log(links);
  };
  const handleSaveLinks = () => {
    console.log(links);
    for (const site in links) {
      if (links[site].length && !urlValidation(links[site])) {
        triggerAlert({ icon: 'error', title: 'Enter Valid URL' });
        return;
      }
    }
    fetch(`${config.apiUrl}/api/updateprofile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ data: { links } }),
    })
      .then(response => response.json())
      .then(res => {
        mutate(`${config.apiUrl}/api/profile/${profileId}`, data);
        setUpdLinks(false);
        triggerAlert(res);
      });
  };
  const handleUpdateDetails = () => {
    setUpdDetails(true);
    changeDetails({ target: { name: 'location', value: data.location } });
    changeDetails({ target: { name: 'about', value: data.about } });
  };
  const handleSaveDetails = () => {
    setUpdDetails(false);
    console.log(details);
    fetch(`${config.apiUrl}/api/updateprofile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ data: details }),
    })
      .then(response => response.json())
      .then(res => {
        mutate(`${config.apiUrl}/api/profile/${profileId}`, data);
        setUpdLinks(false);
        triggerAlert(res);
      });
  };
  return (
    <div className={styles.profile}>
      <div className={styles.left}>
        <HomeLeft user={data} isBottom={false} isEditProfilePic={data._id === currentUser._id} />
      </div>
      <div className={styles.main}>
        <div className={styles.main_left}>
          <div className={styles.header}>
            <p className={styles.heading}> Profile Section </p>
            {data._id === currentUser._id &&
              (updDetails ? (
                <TickSVG
                  width="1.5em"
                  height="1.5em"
                  fill="#10116E"
                  className={styles.edit_svg}
                  onClick={handleSaveDetails}
                />
              ) : (
                <EditSVG
                  width="1.5em"
                  height="1.5em"
                  className={styles.edit_svg}
                  onClick={handleUpdateDetails}
                />
              ))}
          </div>
          <div className={styles.content}>
            <div className={styles.details}>
              <p
                className={
                  updDetails ? `${styles.label} ${styles.disabled_text}` : `${styles.label}`
                }
              >
                {' '}
                Name{' '}
              </p>
              <div
                className={
                  updDetails ? `${styles.disabled_text} ${styles.field}` : `${styles.field}`
                }
              >
                {' '}
                {data.name}
              </div>
            </div>
            <div className={styles.details}>
              <p
                className={
                  updDetails ? `${styles.label} ${styles.disabled_text}` : `${styles.label}`
                }
              >
                {' '}
                E-mail{' '}
              </p>
              <div
                className={
                  updDetails ? `${styles.disabled_text} ${styles.field}` : `${styles.field}`
                }
              >
                {' '}
                {data.email}
              </div>
            </div>
            <div className={styles.details}>
              <p
                className={
                  updDetails ? `${styles.label} ${styles.disabled_text}` : `${styles.label}`
                }
              >
                {' '}
                Phone{' '}
              </p>
              <div
                className={
                  updDetails ? `${styles.disabled_text} ${styles.field}` : `${styles.field}`
                }
              >
                {' '}
                {data.phonenoCode} - {data.phoneno}
              </div>
            </div>
            <div className={styles.details}>
              <p
                className={
                  updDetails ? `${styles.label} ${styles.disabled_text}` : `${styles.label}`
                }
              >
                {' '}
                Gender{' '}
              </p>
              <div
                className={
                  updDetails ? `${styles.disabled_text} ${styles.field}` : `${styles.field}`
                }
              >
                {data.gender}
              </div>
            </div>
            <div className={styles.details}>
              <p
                className={
                  updDetails ? `${styles.label} ${styles.disabled_text}` : `${styles.label}`
                }
              >
                {' '}
                DOB
              </p>
              <div
                className={
                  updDetails ? `${styles.disabled_text} ${styles.field}` : `${styles.field}`
                }
              >
                {' '}
                {data.dob.split('-')[2]}-{data.dob.split('-')[1]}-{data.dob.split('-')[0]}{' '}
              </div>
            </div>
            <div className={styles.details}>
              <p className={styles.label}> Location</p>
              {updDetails ? (
                <input
                  type="text"
                  name="location"
                  className={styles.details_input}
                  value={details.location}
                  onChange={changeDetails}
                />
              ) : (
                <div
                  className={
                    data.location.length
                      ? `${styles.field}`
                      : `${styles.field} ${styles.disabled_text}`
                  }
                >
                  {' '}
                  {data.location.length ? `${data.location}` : `Not Updated Yet`}
                </div>
              )}
            </div>
            <div className={styles.about_details}>
              <p className={styles.label}> About</p>
              {updDetails ? (
                <textarea
                  name="about"
                  className={styles.details_input}
                  value={details.about}
                  onChange={changeDetails}
                />
              ) : (
                <div
                  className={
                    data.about.length
                      ? `${styles.field}`
                      : `${styles.field} ${styles.disabled_text}`
                  }
                >
                  {data.about.length ? `${data.about}` : `Not Updated Yet`}
                </div>
              )}
            </div>
          </div>
        </div>
        <hr className={styles.vertical_line}></hr>
        <div className={styles.main_right}>
          {/* <div className={styles.main_right_upper}>
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
          </div> */}
          <div className={styles.right_bottom}>
            <div className={styles.header}>
              <p className={styles.heading}> Link </p>
              {data._id === currentUser._id &&
                (updLinks ? (
                  <TickSVG
                    width="1.5em"
                    height="1.5em"
                    fill="#10116E"
                    className={styles.edit_svg}
                    onClick={handleSaveLinks}
                  />
                ) : (
                  <EditSVG
                    width="1.5em"
                    height="1.5em"
                    className={styles.edit_svg}
                    onClick={handleUpdateLinks}
                  />
                ))}
            </div>
            {updLinks ? (
              <div className={styles.right_lower_content}>
                <div className={styles.links}>
                  <FBSVG
                    className={styles.right_bottom_icon}
                    width="2em"
                    height="2em"
                    fill="#4267b2"
                  />
                  <input
                    type="text"
                    className={styles.links_input}
                    value={links.fb}
                    onChange={changeLinks}
                    name="fb"
                  />
                </div>
                <div className={styles.links}>
                  <LinkedinIcon
                    className={styles.right_bottom_icon}
                    width="1.8em"
                    height="1.8em"
                    fill="#0077b5"
                  />
                  <input
                    type="text"
                    className={styles.links_input}
                    value={links.linkedin}
                    onChange={changeLinks}
                    name="linkedin"
                  />
                </div>
                <div className={styles.links}>
                  <WebsiteSVG
                    className={styles.right_bottom_icon}
                    width="2em"
                    height="2em"
                    fill="#0077b5"
                  />
                  <input
                    type="text"
                    className={styles.links_input}
                    value={links.website}
                    onChange={changeLinks}
                    name="website"
                  />
                </div>
              </div>
            ) : (
              <div className={styles.right_lower_content}>
                <div className={styles.links}>
                  <FBSVG
                    className={styles.right_bottom_icon}
                    width="2em"
                    height="2em"
                    fill="#4267b2"
                  />
                  <span
                    className={
                      data.links.fb.length
                        ? `${styles.links_url}`
                        : `${styles.links_url} ${styles.disabled_text}`
                    }
                  >
                    {data.links.fb.length ? `${data.links.fb}` : `Not Updated Yet`}
                  </span>
                </div>
                <div className={styles.links}>
                  <LinkedinIcon
                    className={styles.right_bottom_icon}
                    width="1.8em"
                    height="1.8em"
                    fill="#0077b5"
                  />
                  <span
                    className={
                      data.links.linkedin.length
                        ? `${styles.links_url}`
                        : `${styles.links_url} ${styles.disabled_text}`
                    }
                  >
                    {data.links.linkedin.length ? `${data.links.linkedin}` : `Not Updated Yet`}
                  </span>
                </div>
                <div className={styles.links}>
                  <WebsiteSVG
                    className={styles.right_bottom_icon}
                    width="2em"
                    height="2em"
                    fill="#0077b5"
                  />
                  <span
                    className={
                      data.links.website.length
                        ? `${styles.links_url}`
                        : `${styles.links_url} ${styles.disabled_text}`
                    }
                  >
                    {data.links.website.length ? `${data.links.website}` : `Not Updated Yet`}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
