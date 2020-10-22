import React from 'react';

export default function TutorCreateOptionItem(props) {

  return (
    <option value={props.id} id={props.id} >{props.username}</option>
  )

}