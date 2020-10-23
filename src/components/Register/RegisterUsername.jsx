import React, { useState } from 'react';

export default function RegisterUsername(props) {

  const [randomUsername, setRandomUsername] = useState('');
  const [usernameValue, setUsernameValue] = useState('');
  const [errorMsg, setErrorMsg] = useState(false);

  function generateRandomUsername() {
    const randomNum = Math.floor(Math.random() * 1000);

    setRandomUsername(props.randomUsernameList[randomNum].name);
    setUsernameValue('');
    setErrorMsg(false);
  }

  function setInputValue(e) {

    setUsernameValue(e.target.value);
    setRandomUsername('');
  }

  function currentInputValue() {
    if (randomUsername) return randomUsername;
    else if (usernameValue) return usernameValue;
    else return '';
  }

  function setError() {
    const currentVal = currentInputValue();
    if (currentVal.length < 6 && currentVal.length > 0) {
      setErrorMsg(true);
    } else {
      setErrorMsg(false);
    }
  }


  return (
    <div className='register-username-container'>
      <div className="username-title register-title">
        Username:
      </div>
      <div className="username-input">
        <input
          type="text"
          className='register-input'
          id='username-input'
          onChange={(e) => setInputValue(e)}
          value={currentInputValue()}
          onBlur={() => setError()}
        />
      </div>
      <div className="username-error register-error">
        {errorMsg && (
          'Username must at least 5 characters!'
        )}
      </div>
      <div className="username-random-container">
        <div className="username-random-text">
          Or...
        </div>
        <div className="username-random-btn" onClick={() => generateRandomUsername()}>
          Randomly Generate
        </div>
      </div>
    </div>
  );

}