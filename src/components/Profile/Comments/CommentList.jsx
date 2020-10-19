import React from "react";

function CommentList(props) {
  const { index, avatar, username, text_body } = props;
  return (
    <div className="profile-comment" key={index}>
      <div>
        <div>
          <img src={avatar} alt="avatar" />
        </div>
        <div className="text-body">
          <b>{username} commented: </b>
          {text_body}
        </div>
      </div>
    </div>
  );
}

export default CommentList;
