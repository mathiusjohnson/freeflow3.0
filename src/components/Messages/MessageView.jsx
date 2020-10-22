import React from 'react';
import MessageTextBubble from './MessageTextBubble'

export default function MessageView(props) {

  const currentMessages = props.currentMessages;

  const messageData = currentMessages.map(msg => {

    return <MessageTextBubble
      key={currentMessages.indexOf(msg)}
      sender={msg.sender ? msg.sender : null}
      receiver={msg.receiver ? msg.receiver : null}
      userId={msg.senderid ? msg.senderid : msg.receiverid}
      timeSent={msg.time_sent}
      textBody={msg.text_body}
    />

  });

  return (
    <div className='message-text-container-right'>
      {!props.createNew && messageData}
    </div>
  )
}