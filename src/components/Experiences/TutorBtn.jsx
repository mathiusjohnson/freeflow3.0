import React from 'react';
import classNames from 'classnames'

export default function TutorBtn(props) {

  const tutorBtnClass = classNames('tutor-btn', {
    'tutor-btn-decline-cancel': props.name === 'Decline' || props.name === 'Cancel',
    'tutor-btn-accept-complete': props.name === 'Accept' || props.name === 'Complete' || props.name === 'Confirm',
    'tutor-btn-hide': !props.name,
    'tutor-btn-video': props.name === 'Video'
  })

  return (
    <div className={tutorBtnClass} onClick={props.onClick}>
      {props.name}
    </div>
  )

}