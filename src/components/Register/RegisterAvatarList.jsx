import React from 'react';
import RegisterAvatarListItem from './RegisterAvatarListItem';

export default function RegisterAvatarList(props) {

  const avatarListData = props.avatarList.map((avatar, index) => {
    return <RegisterAvatarListItem
      key={index}
      id={index}
      url={avatar.url}
      selectAvatar={props.selectAvatar}
    />
  })

  return (
    <div className="register-avatar-list-main-container">
      <div className='register-avatar-list-title'>
        <div className="avatar-title-title">
          Choose Avatar:
        </div>
        <div className="selected-avatar">
          <img src={props.selectedAvatarUrl} alt="" />
        </div>
        <div className="toggle-avatar-list-btn" onClick={() => props.toggleAvatarList()}>
          Toggle List
        </div>
      </div>
      <div className='register-avatar-list-container'>
        <div className="avatar-list">
          {props.showAvatarList && (
            avatarListData
          )}
        </div>
      </div>
    </div>
  )

}