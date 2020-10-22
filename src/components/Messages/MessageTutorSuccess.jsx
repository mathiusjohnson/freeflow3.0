import React from 'react';

export default function MessageTutorSuccess(props) {

  return (
    <div className='message-success-container' id={props.tutorStyle}>
      <div className="message-success-title">
        Tutor Session Created!
      </div>
    </div>
  );

}