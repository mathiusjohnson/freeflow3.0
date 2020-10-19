import React, {useState} from "react";
import styles from './NewComment.module.scss'


export default function CommentForm(props) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
    
    // const commentObj = {
    //   avatar: props.currentUser.avatar,
    //   username: props.currentUser.username,
    // };

    // function onValidateComment() {
    //   if (value === "") {
    //     setError("Comment cannot be blank");
    //     return;
    //   }
    //   if (value !== ""){
    //     setError("");
    //     props.createComment(
    //       props.post.post_id,                 
    //       props.currentUser.id,
    //       value,
    //       commentObj)
    //       .then(() => {
    //     setValue("");
    //     });         
    //   }
    // }

  return (
    <>
      <div className={styles.newcomment}>
        <div className={styles.centertextarea}>
          <textarea 
            className={styles.commenttextarea}
            value={value}
            onChange={(event) => {setValue(event.target.value);}} 
            rows="2" placeholder="Leave a comment here.."
          ></textarea>
        </div>

        <div>
          <section className={styles.validation}>{error}</section>
        </div>
        <div className={styles.commentlikebuttonflex}>
          {/* <div 
          className={styles.commentbutton}
          className={styles.buttontransition} onClick={() => onValidateComment()}>Comment</div> */}
        </div>
      </div>
    </>
  );
}
