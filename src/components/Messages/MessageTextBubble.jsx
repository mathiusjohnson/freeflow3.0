import React from 'react';
import timeSince from '../../helpers/timeSince'
const classNames = require('classnames');

export default function MessageTextBubble(props) {

  const containerClass = classNames('text-container', { 'text-right-container': props.receiver, 'text-left-container': props.sender });
  const textTextClass = classNames('text-text', { 'text-text-right': props.receiver, 'text-text-left': props.sender });
  const textTimeClass = classNames('text-time', { 'text-time-right': props.receiver, 'text-time-left': props.sender })

  const timeAgo = timeSince(props.timeSent);

  return (
    <div className={containerClass} id={props.userId}>
      <div className={textTextClass}>
        {props.textBody}
      </div>
      <div className={textTimeClass}>
        {timeAgo}
      </div>
    </div>
  );
}