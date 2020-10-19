import React, { useEffect, useState } from 'react';
import styles from './Login.scss';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import setNotifications from '../helpers/setNotifications';
import setUnseenTutor from '../helpers/setUnseenTutor';
import ContextConsumer from "../context/context";
import useApplicationData from "../hooks/useApplicationData";

export default function Login() {
  const { state } = useApplicationData();

  const [avatarList, setAvatarList] = useState([]);
  const [currentAvatar, setCurrentAvatar] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState(false);
  const [count, setCount] = useState(0);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {

    const promiseAvatars = axios.get('https://stack-network.herokuapp.com/api/register/avatars');

    Promise.all([promiseAvatars])
      .then(all => {

        const [avatarData] = all;
        console.log('avatar data', avatarData.data);

        const uniqueAvatars = [...new Set(avatarData.data)];

        setAvatarList(uniqueAvatars);
      })

  }, []);

  function randomizeAvatar() {
    const randomNum = Math.floor(Math.random() * avatarList.length);

    const randomAvatar = avatarList[randomNum];

    if (randomAvatar) {
      return randomAvatar.url.replace(/50/g, 400);
    }
  }

  useEffect(() => {
    const avatarUrl = randomizeAvatar(avatarList);
    setCurrentAvatar(avatarUrl);
    setTimeout(() => {
      setCount(count + 1);
    }, 2000);
  }, [count]);

  function userLogin(username, password) {

    // if either username or password are blank
    if (!username || !password) {
      setErrorMsg('Username/password is left blank!');
      setTimeout(() => {
        setErrorMsg('');
      }, 2500)
      return;
    }

    axios.post("https://stack-network.herokuapp.com/api/login-real", { username, password })
      .then((res) => {
        console.log('res', res.data);
        // if username/password are correct
        if (res.data.length) {

          const username = res.data[0].username;
          const userID = res.data[0].id
          const avatar = res.data[0].avatar;

          document.cookie = `userID=${userID};`;

          console.log('username', username)
          console.log('userId', userID)
          console.log('avatar', avatar)
          // set({ ...data, state: state, selected: res.data[0].id });

          // MATT'S CODE************************************************************
          const rightNavContainer = typeof document !== 'undefined' && document.querySelector(".sc-kEqYlL.efNBuU.right");

          const userDisplay = typeof document !== 'undefined' && document.querySelector('.logged-in-username');

          if (userDisplay) {
            userDisplay.remove();
          }

          const usernameHTML = `
            <div class='logged-in-username' style='display: flex; align-items: center; justify-content: center'>
            <p style='margin-right: 0.5rem;'>Welcome <strong>${username}!</strong></p>
            <img src='${avatar}' />
            </div>
          `;

          if (rightNavContainer) {
            rightNavContainer.insertAdjacentHTML("afterbegin", usernameHTML);
          }

          // MATT'S CODE************************************************************
          typeof localStorage !== 'undefined' && localStorage.setItem('userID', userID);
          typeof localStorage !== 'undefined' && localStorage.setItem('username', username);
          typeof localStorage !== 'undefined' && localStorage.setItem('avatarUrl', avatar);
          // MATT'S CODE************************************************************

          // MATT'S CODE FOR ADDING MESSAGES NOTIFICATIONS ON LOGIN************************************************************
          axios.post('https://stack-network.herokuapp.com/api/messages/unread_count', { userID })
            .then(res => {
              setNotifications(Number(res.data[0].count));
              typeof localStorage !== 'undefined' && localStorage.setItem('unreadMessages', Number(res.data[0].count))
            })

          axios.post('https://stack-network.herokuapp.com/api/tutor_experiences/unseen_count', { userID })
            .then(res => {
              setUnseenTutor(Number(res.data[0].count))
              typeof localStorage !== 'undefined' && localStorage.setItem('unreadTutor', Number(res.data[0].count))
            })

          setRedirect(true);

        } else {
          // if username or password are not correct
          setErrorMsg('Username/password are incorrect!');
          setTimeout(() => {
            setErrorMsg('');
          }, 2500)
          return;
        }
      });

  }


  // return (
  //   <ContextConsumer>
  //     {({ data, set }) => {
        return (
          <div className={styles.mainlogincontainer}>
            <div className={styles.loginleftcontainer}>
              <div className={styles.loginformheader}>Welcome to Stack!</div>
              <div className={styles.loginusernamecontainer}>
                <img src="https://www.flaticon.com/svg/static/icons/svg/1077/1077012.svg" alt="" id='username-icon' />
                <input
                  type="text"
                  className={styles.registerinput}
                  className={styles.loginusernameinput}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder='Username'
                />
              </div>
              <div className={styles.loginpasswordcontainer}>
                <img src="https://www.flaticon.com/svg/static/icons/svg/526/526812.svg" alt="" className={styles.passwordicon} />
                <input
                  type="password"
                  className={styles.registerinput}
                  className={styles.loginpasswordinput}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='Password'
                />
              </div>
              {errorMsg && (
                <div className={styles.loginusernamepassworderror}>{errorMsg}</div>
              )}
              <div className={styles.loginbtn} onClick={() => userLogin(username, password)}>
                LOGIN
              </div>
              <div className={styles.noaccount}>
                Don't have an account yet? Register&nbsp;
                {/* <Redirect href={`/register/`}><span className={styles.registeraccountclick}>here</span>
                </Redirect> */}
              </div>
              {redirect && (
                <Redirect to='/' className={styles.dashboardredirect}/>
              )}
            </div>
            <div className={styles.loginrightcontainer}>
              <img src={currentAvatar ? currentAvatar : 'https://robohash.org/voluptatemnemolaborum.png?size=400x400&set=set1'} alt="" />
            </div>
          </div>
        )
  //     }}
  //   </ContextConsumer>
  // )

}