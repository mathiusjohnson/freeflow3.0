import React from 'react';
const classNames = require('class-names');

export default function MessageButton(props) {

  // console.log('message btn props', props);

  const msgBtnClass = classNames('msg-btn', { 'msg-btn-create': props.create, 'msg-btn-complete': props.complete, 'msg-btn-send': props.send })

  function triggerCreateTutorSession() {
    if (props.displayCreateTutorSession) {
      props.displayCreateTutorSession();
    }
  }

  return (
    <div className={msgBtnClass} onClick={() => triggerCreateTutorSession()}>
      {props.name}
    </div>
  )

}