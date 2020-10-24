

export default function messageCleanSort(currentUserID, currentData) {

  let currentUsername;

  // console.log('currentData', currentData);

  for (let item of currentData) {
    if (item.senderid === currentUserID) {
      currentUsername = item.sender;
      break;
    }
    currentUsername = item.receiver;
    break;
  }

  console.log('currentUsername', currentUsername);

  let intMessageList = [];

  for (let obj of currentData) {
    if (obj.senderid === currentUserID) {
      delete obj.senderid;
      delete obj.sender;
    } else {
      delete obj.receiverid;
      delete obj.receiver
    }
    intMessageList.push(obj);
  }

  // console.log('intMessageList', intMessageList);

  let msgList = {};

  for (let obj of intMessageList) {
    if (obj.hasOwnProperty('sender')) {
      if (!msgList.hasOwnProperty(obj.sender)) {
        msgList[obj.sender] = [{
          textBody: obj.text_body,
          timeSent: obj.time_sent
        }];
      } else {
        msgList[obj.sender].push({
          textBody: obj.text_body,
          timeSent: obj.time_sent
        });
      }
    } else {
      if (!msgList.hasOwnProperty(obj.receiver)) {
        msgList[obj.receiver] = [{
          textBody: obj.text_body,
          timeSent: obj.time_sent
        }];
      } else {
        msgList[obj.receiver].push({
          textBody: obj.text_body,
          timeSent: obj.time_sent
        });
      }
    }
  }

  // console.log('msgList', msgList);

  let dateSortedMsgList = {};

  for (let arr in msgList) {
    msgList[arr].sort((a, b) => {
      return new Date(b.timeSent) - new Date(a.timeSent);
    })
    dateSortedMsgList[arr] = msgList[arr];
  }

  // console.log('sortedMsgList', dateSortedMsgList);

  return dateSortedMsgList;

}