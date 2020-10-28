import React, { useState } from "react";
import timeSince from "../../helpers/timeSince";
import { CardBody } from "reactstrap";
import { Button } from "reactstrap";
// import Tags from "./MentorStack";

function EditPostItem(props) {
  const [post, setPost] = useState(props.text_body || "");
  // let techTags = [];
  // const onChangeInput = (selectedTags) => {
  //   techTags = selectedTags;
  // };

  function onSave() {
    props.updatePost(post, props.id, props.user.id);
    props.onSaveEdit();
    // props.onSave();
  }
  return (
    <CardBody>
      <Button onClick={onSave}>Save Changes</Button>
      <p className="time-posted">{timeSince(props.time_posted)} </p>
      <textarea
        className="edit-post"
        type="text"
        value={post}
        onChange={(event) => setPost(event.target.value)}
        placeholder="Round border"
      />
      <ul className="post-stack">
        <span className="bold">Stack:</span>
        {props.stack.map((tech_stack, idx) => {
          return <li key={idx}>{tech_stack}</li>;
        })}
      </ul>
      {/* <Tags
        tags={props.stack}
        onChange={onChangeInput}
        suggested={props.suggestion}
      /> */}
    </CardBody>
  );
}

export default EditPostItem;
