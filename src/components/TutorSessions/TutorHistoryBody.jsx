import React from 'react';
import TutorHistoryBodyItem from './TutorHistoryBodyItem';

export default function TutorHistoryBody(props) {

  // console.log('tutorHistoryBodyProps', props);

  const tutorList = props.currentTutorData
  let tutorListData;

  if (tutorList) {
    tutorListData = tutorList.map(item => {
      return <TutorHistoryBodyItem
        key={item.id}
        id={item.id}
        dateInitiated={item.date_initiated}
        dateAccepted={item.date_accepted}
        dateCompleted={item.date_completed}
        status={item.status}
        mentorID={item.mentor_id}
        studentID={item.student_id}
        creatorID={item.creator_id}
        currentUserData={props.currentUserData}
        acceptAction={props.acceptAction}
        declineCancelAction={props.declineCancelAction}
        completeAction={props.completeAction}
        generateGoogleLink={props.generateGoogleLink}
      />
    })
  }


  return (
    <div className='tutor-history-body-container'>
      {tutorListData}
    </div>
  )

}