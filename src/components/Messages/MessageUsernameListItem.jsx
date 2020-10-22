import React from 'react';

export default function MessageUsernameListItem(props) {

  return (
    <option value={props.id} id={props.id} >{props.username}</option>
  )

}