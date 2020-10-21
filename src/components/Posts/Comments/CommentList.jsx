import React from "react";
import styles from './CommentList.module.scss'

// interface IProps {
//   currentUser: ICurrentUser;
//   avatar: string;
//   username: string;
//   text_body: string;
//   removeComment: (
//     post_id: number,
//     commenter_id: number,
//     text_body: string
//   ) => void;
//   editComment: (
//     post_id: number,
//     commenter_id: number,
//     text_body: string,
//     value: string
//   ) => void;
//   post: IPost;
//   index: number;
//   comment: IComment;
// }

// interface IPost {
//   avatar: string;
//   studentrating: string;
//   text_body: string;
//   active: boolean;
//   time_posted: Date;
//   stack: any;
//   username: string;
//   post_id: number;
//   id: number;
//   owner_id: number;
// }

// interface IComment {
//   id: number; commenter_id: number; post_id: number, text_body: string;
// }


// interface ICurrentUser {
//   id: number;
// }

function CommentList(props) {
  // const { index, avatar, username, text_body, comment, currentUser, removeComment, post } = props;


  // const myComment = currentUser.id === comment.commenter_id;

  // const onRemove = () => {
  //   //check for empty input here
  //   removeComment(post.post_id, currentUser.id, comment.id);
  // };

  return (
    <div className={styles.commentlist}>
      {/* <Link className={styles.userlink} href={`/user-profiles/${username}`}>
      <img
        className={styles.commentavatar}
        src={avatar}
        alt="avatar"
      />
      </Link>
      <div className={styles.comments}>
      <Link className={styles.userlink} href={`/user-profiles/${username}`}>
        <span className={styles.commentusername}>
          <b>{username}&nbsp;&nbsp;</b>
        </span>
      </Link> */}
      {/* <span>{text_body}</span> */}
        {/* {myCommentOrPost ? (
          <p onClick={() => onEdit()} className={styles.deleteButton}>
            Edit
          </p>
        ) : (
          ""
        )} */}
        {/* {myComment ? (
          <span onClick={() => onRemove()} className={styles.deletebutton}>
            Remove Comment
          </span>
        ) : (
          ""
        )} */}
      {/* </div> */}
    </div>
  );
}

export default CommentList;
