import React, { useEffect, useState } from 'react';
import TutorHistory from '../../components/Experiences/TutorHistory';
import TutorCreate from '../../components/Experiences/TutorCreate';
import TutorRate from '../../components/Experiences/TutorRate';
import TutorFilter from '../../components/Experiences/TutorFilter';
import TutorShowPoints from '../../components/Experiences/TutorShowPoints';
// import MessageTutorSuccess from '../../components/messages/MessageTutorSuccess';
import setUnseenTutor from '../../helpers/setUnseenTutor';
// import { SlideDown } from 'react-slidedown';
// import 'react-slidedown/lib/slidedown.css';
import { sortFilterAllTutorData } from '../../helpers/tutor-helpers';
import axios from 'axios';
import styles from './Experiences.module.scss'

export default function Experiences() {

  const loggedInUserID = Number(document.cookie.split('=')[1]);

  const [currentTutorData, setCurrentTutorData] = useState([]);
  const [currentUserData, setCurrentUserData] = useState([]);
  const [count, setCount] = useState(0);
  const [rateTutor, setRateTutor] = useState(false);
  const [currentTutorID, setCurrentTutorID] = useState(0);
  const [otherUsername, setOtherUsername] = useState(null);
  const [unratedSession, setUnratedSession] = useState(null);
  const [cancelDecline, setCancelDecline] = useState(false);
  const [tutorSessionID, setTutorSessionID] = useState(0);
  const [filterStatus, setFilterStatus] = useState('');
  const [selectFilterBtn, setSelectFilterBtn] = useState('');
  const [createError, setCreateError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPointsGiven, setShowPointsGiven] = useState(false);
  const [pointsArray, setPointsArray] = useState([]);
  const [showCopyLink, setShowCopyLink] = useState(false);

  useEffect(() => {

    const promiseTutor = axios.get('http://localhost:8001/api/tutor_experiences');
    const promiseUser = axios.get('http://localhost:8001/api/users');

    Promise.all([promiseTutor, promiseUser])
      .then(all => {
        console.log(all);

        const [tutorData, userData] = all;

        let cleanTutorData = sortFilterAllTutorData(tutorData.data, loggedInUserID);

        if (filterStatus === 'pending' || filterStatus === 'in-progress' || filterStatus === 'completed') {
          cleanTutorData = cleanTutorData.filter(session => session.status === filterStatus);
        }

        console.log('cleanTutorData', cleanTutorData);
        console.log('loggedInUser', loggedInUserID);

        // rate session before it completes on unrated side
        for (let session of cleanTutorData) {
          if (session.helper_id === loggedInUserID && session.helper_rating === null && session.status === "completed") {
            // setUnratedSession(session);
            console.log('session', session);
            setUnratedSession(session);
            const index = cleanTutorData.indexOf(session);
            cleanTutorData.splice(index, 1);
          }
          if (session.student_id === loggedInUserID && session.student_rating === null && session.status === "completed") {
            // setUnratedSession(session);
            console.log('session', session);
            setUnratedSession(session);
            const index = cleanTutorData.indexOf(session);
            cleanTutorData.splice(index, 1);
          }
        }

        setCurrentTutorData(cleanTutorData);
        setCurrentUserData(userData.data);

        setRateTutor(false);
      })

  }, [count, filterStatus, loggedInUserID]);

  function acceptAction(tutorSessionID) {

    axios.put('http://localhost:8001/api/tutor_experiences/accept', { tutorSessionID })
      .then(() => {
        setCount(count + 1);
      })
  }

  useEffect(() => {

    const userID = document.cookie.split('=')[1];

    axios.put('http://localhost:8001/api/tutor_experiences/see_all', { userID })
      .then(res => {
        console.log('newRes', res.data);
        setUnseenTutor(0);
        localStorage.removeItem('unreadTutor');
      })


  }, [])

  function declineCancelAction(tutorSessionID) {

    setCancelDecline(true);
    setTutorSessionID(tutorSessionID);

  }

  function cancelConfirmDelete() {
    setCancelDecline(false);
    setTutorSessionID(0);
  }

  function confirmConfirmDelete(tutorSessionID) {

    axios.put('http://localhost:8001/api/tutor_experiences/delete', { tutorSessionID })
      .then(() => {
        setCancelDecline(false);
        setTutorSessionID(0);
        setCount(count + 1);
      })
  }

  function completeAction(tutorSessionID, otherUsername) {

    setRateTutor(true);
    setCurrentTutorID(tutorSessionID);
    setOtherUsername(otherUsername);

  }

  function submitRating(tutorSessionID, isHelper, rating, comments) {

    const ratingUsername = document.querySelector('.rate-tutor-header').children[0].textContent;

    axios.put('http://localhost:8001/api/tutor_experiences/complete', { tutorSessionID, isHelper, rating, comments })
      .then((res) => {
        setCount(count + 1);

        setPointsArray([ratingUsername, rating]);
        setShowPointsGiven(true);

        setTimeout(() => {
          setShowPointsGiven(false);
        }, 2500)
      })
  }

  function otherUserSubmitRating(unratedTutorSession, rating, comments) {
    console.log('urts', unratedTutorSession);
    console.log('r', rating);
    console.log('c', comments);

    const ratingUsername = document.querySelector('.rate-tutor-header').children[0].textContent;

    const tutorSessionID = unratedTutorSession.id;

    let isHelperRating;
    if (!unratedTutorSession.helper_rating) {
      isHelperRating = true;
    } else {
      isHelperRating = false;
    }

    axios.put('http://localhost:8001/api/tutor_experiences/complete-other', { isHelperRating, rating, comments, tutorSessionID })
      .then((res) => {
        setUnratedSession(null);
        setCount(count + 1);
        setPointsArray([ratingUsername, rating]);
        setShowPointsGiven(true);

        setTimeout(() => {
          setShowPointsGiven(false);
        }, 2500)
      })
  }

  function createTutorSession() {
    const radios = document.getElementsByName('radio-helper-helped');
    let radioChecked;
    for (let radio of radios) {
      if (radio.checked) {
        radioChecked = radio.id;
      }
    }

    const username = document.querySelector('#search-user-input').value;

    // error handling for no input
    if (!username) {
      setCreateError('username');

      setTimeout(() => {
        setCreateError('');
      }, 2000);

      return;
    }

    let receiverID;
    console.log('currentTutorData', currentUserData);
    for (let user of currentUserData) {
      if (user.username === username) {
        receiverID = user.id;
      }
    }
    console.log('username', username);
    console.log('receiverID', receiverID);
    const creatorID = Number(document.cookie.split('=')[1]);

    let helperID, helpedID;
    if (radioChecked === 'helper') {
      helperID = receiverID
      helpedID = creatorID;
    } else {
      helperID = creatorID;
      helpedID = receiverID;
    }

    // error handling for username not present
    if (!receiverID) {
      setCreateError('username');

      setTimeout(() => {
        setCreateError('');
      }, 2000);
      return;
    } else {
      axios.post('http://localhost:8001/api/tutor_experiences/new', { helperID, helpedID, creatorID })
        .then((res) => {
          setCount(count + 1);
          document.querySelector('#search-user-input').value = '';
          setShowSuccess(true);
          setTimeout(() => {
            setShowSuccess(false);
          }, 2500)
        })
    }

  }

  // Cancel rate tutor session 
  function cancelRateSession() {
    setRateTutor(false);
  }

  // FILTER STATUS *************************************************
  function sortByStatus(status) {

    setSelectFilterBtn(status);

    status = status.toLowerCase();
    console.log('hi status', status);
    setFilterStatus(status);
    setCount(count + 1);

  }
  // FILTER STATUS *************************************************

  // GENERATE GOOGLE HANGOUTS LINK *************************************************
  function generateGoogleLink(receiverID) {
    console.log('otheruserID', receiverID);
    const senderID = loggedInUserID;

    const textInput = 'https://meet.google.com/nnj-hsyf-xft';

    window.open('http://meet.google.com/new/');

    axios.post('http://localhost:8001/api/messages/new', { textInput, receiverID, senderID })
      .then(res => {
        console.log(res);
        const link = 'http://meet.google.com/new/';
        // const link = 'https://meet.google.com/nnj-hsyf-xft';
        navigator.clipboard.writeText(link)

        setShowCopyLink(true);
        setTimeout(() => {
          setShowCopyLink(false);
        }, 5000);
      });
  }

  // GENERATE GOOGLE HANGOUTS LINK *************************************************
  return (
    <div className='main-tutor-container'>
      {!showSuccess && (<TutorCreate
        currentUserData={currentUserData}
        createTutorSession={createTutorSession}
        createError={createError}
      />
      )}
      {showCopyLink && (
        <div className="copy-link">
          Link sent and copied to clipboard!
        </div>
      )}
      {/* {showSuccess && (
        <MessageTutorSuccess
          tutorStyle={'tutor-success-id'}
        />
      )} */}
      {(rateTutor || unratedSession) && (
        <TutorRate
          currentTutorID={currentTutorID}
          currentUserData={currentUserData}
          currentTutorData={currentTutorData}
          submitRating={submitRating}
          otherUsername={otherUsername}
          unratedSession={unratedSession}
          otherUserSubmitRating={otherUserSubmitRating}
          cancelRateSession={cancelRateSession}
        />
      )}
      {showPointsGiven && (
        <TutorShowPoints
          pointsArray={pointsArray}
        />
      )}
      <TutorFilter
        sortByStatus={sortByStatus}
        selectFilterBtn={selectFilterBtn}
      />
      <TutorHistory
        currentTutorData={currentTutorData}
        currentUserData={currentUserData}
        acceptAction={acceptAction}
        declineCancelAction={declineCancelAction}
        completeAction={completeAction}
        cancelDecline={cancelDecline}
        cancelConfirmDelete={cancelConfirmDelete}
        confirmConfirmDelete={confirmConfirmDelete}
        tutorSessionID={tutorSessionID}
        generateGoogleLink={generateGoogleLink}
      />
    </div>
      );
}