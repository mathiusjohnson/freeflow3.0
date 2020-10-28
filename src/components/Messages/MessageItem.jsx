import React from 'react';
import timeSince from '../../helpers/timeSince';

export default function MessageItem(props) {

  let messageBody;
  if (props.recentMessage.textBody.length > 25) {
    messageBody = props.recentMessage.textBody.slice(0, 25) + '...'
  } else {
    messageBody = props.recentMessage.textBody;
  }

  const timeAgo = timeSince(props.recentMessage.timeSent);

  let avatar;
  for (let item of props.avatarList) {
    if (item.username === props.username) {
      avatar = item.avatar;
    }
  }

  function checkUsernameUnread(props) {
    for (let username of props.usernamesUnread) {
      if (props.username === username) {
        return true;
      }
    }
    return false;
  }

  return (
    <div className='message-item-container' onClick={() => props.clickMe(props.username)}>
      <div className="message-icon-container">
        <div className='message-icon'>
          <img src={avatar} alt="" />
        </div>
      </div>
      <div className="message-username-text">
        <p className='message-username'>{props.username}</p>
        <p className='message-last'>{messageBody}</p>
      </div>
      <div className="message-time">
        {timeAgo}
      </div>
      {checkUsernameUnread(props) && (
        <div className="message-unread-label">
          NEW!
        </div>
      )}
    </div>
  )

}