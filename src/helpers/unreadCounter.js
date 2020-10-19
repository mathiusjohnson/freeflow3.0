

export default function unreadCounter(userID, messageList) {

  let count = 0;
  for (let message of messageList) {
    if (message.senderid !== userID && message.receiver_read === false) {
      count++;
    }
  }

  return count;

}