import React from 'react';
import TutorFilterBtn from './TutorFilterBtn';

export default function TutorFilter(props) {

  return (
    <div className='tutor-filter-container'>
      <div className="tutor-filter-title">
        Filter By Status:
      </div>
      <div className="tutor-filter-btns">
        <TutorFilterBtn
          name={'All Sessions'}
          sortByStatus={props.sortByStatus}
          selectFilterBtn={props.selectFilterBtn}
        />
        <TutorFilterBtn
          name={'Pending'}
          sortByStatus={props.sortByStatus}
          selectFilterBtn={props.selectFilterBtn}
        />
        <TutorFilterBtn
          name={'In-progress'}
          sortByStatus={props.sortByStatus}
          selectFilterBtn={props.selectFilterBtn}
        />
        <TutorFilterBtn
          name={'Completed'}
          sortByStatus={props.sortByStatus}
          selectFilterBtn={props.selectFilterBtn}
        />
      </div>
    </div>
  );

}