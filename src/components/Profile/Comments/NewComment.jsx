import React from "react";
import { Button } from "reactstrap";

function CommentForm(props) {
  const [value, setValue] = React.useState("Comment here...");



  return (
    <>
      <textarea
        className="profile-new-comment"
        value={value}
        onChange={(event) => {
          setValue(event.target.value) 
          props.setError("")
        }}
        rows="2"
        cols="80"
        placeholder="Leave a comment here.."
      ></textarea>
      <div>
        <section className="validation">{props.error}</section>
      </div>
      <div>
        <Button onClick={() => props.onValidateComment()}>Comment</Button>
      </div>
    </>
  );
}

export default CommentForm;
