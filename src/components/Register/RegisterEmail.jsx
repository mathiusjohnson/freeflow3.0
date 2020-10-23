import React, { useState } from 'react';

export default function RegisterEmail(props) {

  const [emailValue, setEmailValue] = useState('');
  const [errorMsg, setErrorMsg] = useState(false);

  function setInputValue(e) {
    setEmailValue(e.target.value);
  }

  function currentInputValue() {
    return emailValue;
  }

  function setError() {
    const currentVal = currentInputValue();
    const emailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!currentVal.match(emailFormat) && currentVal.length > 0) {
      setErrorMsg(true);
    } else {
      setErrorMsg(false);
    }
  }


  return (
    <div className='register-email-container'>
      <div className="email-title register-title">
        Email:
      </div>
      <div className="email-input">
        <input
          type="email"
          className='register-input'
          id='email-input'
          onChange={(e) => setInputValue(e)}
          value={currentInputValue()}
          onBlur={() => setError()}
        />
      </div>
      <div className="email-error register-error">
        {errorMsg && (
          'Please enter valid email!'
        )}
      </div>
    </div>
  )

}