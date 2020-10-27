import React from "react";
import styles from './CommentList.module.scss'
import { NavLink } from 'react-router-dom';

function CommentList(props) {
  const { index, avatar, username, first_name, last_name, text_body, comment, currentUser, removeComment, post } = props;


  const myComment = currentUser.id === comment.commenter_id;

  const onRemove = () => {
    //check for empty input here
    removeComment(post.post_id, currentUser.id, comment.id);
  };

  return (
    <div className={styles.commentlist}>
      <NavLink className={styles.userlink} to={`/user-profiles/${username}`}>
      <img
        className={styles.commentavatar}
        src={avatar}
        alt="avatar"
      />
      </NavLink>
      <div className={styles.comments}>
      <NavLink className={styles.userlink} to={`/user-profiles/${username}`}>
        <span className={styles.commentusername}>
          <b>{first_name} {last_name}&nbsp;&nbsp;</b>
        </span>
      </NavLink>
      <span>{text_body}</span>
        {/* {myCommentOrPost ? (
          <p onClick={() => onEdit()} className={styles.deleteButton}>
            Edit
          </p>
        ) : (
          ""
        )} */}
        {myComment ? (
          <span onClick={() => onRemove()} className={styles.deletebutton}>
            Remove Comment
          </span>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default CommentList;
