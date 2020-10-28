import React, { useState } from 'react';
import MessageItem from './MessageItem';
import '../../styles/messages.css'

export default function MessageList(props) {

  const [showNoMsgs, setShowNoMsgs] = useState(false);

  const messageListObj = props.messageList.messageList;

  function isEmpty(obj) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop))
        return false;
    }
    return true;
  }

  const messageListEmpty = isEmpty(messageListObj);

  let sortable = [];
  for (let obj in messageListObj) {
    sortable.push([obj, messageListObj[obj]]);
  }

  const sortedMessageList = sortable.sort((a, b) => {
    return new Date(b[1][0].timeSent) - new Date(a[1][0].timeSent);
  });

  let messageData;

  if (!messageListEmpty) {

    messageData = sortedMessageList.map((message, index) => {
      return <MessageItem
        key={sortedMessageList.indexOf(message)}
        recentMessage={message[1][0]}
        username={message[0]}
        clickMe={props.clickMe}
        avatarList={props.avatarList}
        usernamesUnread={props.usernamesUnread}
      />
    })
  }

  // show no msgs delay
  setTimeout(() => {
    setShowNoMsgs(true)
  }, 1000);


  return (
    <div className='message-left-list'>
      {messageData ? messageData : null}
      {messageListEmpty && showNoMsgs && (
        <div className='msg-list-empty-container'>
          Looks like you have no messages!
        </div>
      )}
    </div>
  )

}