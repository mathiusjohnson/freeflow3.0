import React from 'react';
import TutorBtn from './TutorBtn';

export default function TutorConfirmDelete(props) {

  return (
    <div className='tutor-confirm-delete-container'>
      <div className="confirm-delete-title">
        Are you sure you want to delete?
      </div>
      <div className="confirm-delete-btns">
        <TutorBtn
          name={'Cancel'}
          onClick={() => props.cancelConfirmDelete()}
        />
        <TutorBtn
          name={'Confirm'}
          onClick={() => props.confirmConfirmDelete(props.tutorSessionID)}
        />
      </div>
    </div>
  )

}