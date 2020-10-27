import React from 'react';

export default function MessageListHeader(props) {

  return (
    <div className='message-list-header'>
      <div className='message-list-title'>Messages</div>
      <div className="message-list-create" onClick={() => props.createNewMsg()}>
        <img alt="avatar" src="https://www.flaticon.com/svg/static/icons/svg/1160/1160758.svg" />
      </div>
    </div>
  )

}