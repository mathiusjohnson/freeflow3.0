import React from 'react';
import MessageButton from './MessageButton'

export default function MessageTextArea(props) {

  return (
    <div className='message-text-area-container'>
      <div className='error-container'>Please enter valid message!</div>
      <div className="message-text-area">
        <textarea name="message-text-area" id="msg-textarea" cols="45" rows="5" placeholder='Your intelligent creation here...'></textarea>
      </div>
      <div className="message-send-btn" onClick={() => props.submitMessage(props.username)}>
        <MessageButton
          name={'SEND'}
          send={true}
        />
      </div>
    </div>
  )
}