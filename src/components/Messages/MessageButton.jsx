import React from 'react';
import classNames from 'classnames'

export default function MessageButton(props) {

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