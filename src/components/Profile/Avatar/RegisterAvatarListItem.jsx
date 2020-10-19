import React from 'react';

export default function RegisterAvatarListItem(props) {

  return (
    <div className='avatar-list-item' onClick={() => props.selectAvatar(props.url)}>
      <img src={props.url} alt="" />
    </div>
  )

}