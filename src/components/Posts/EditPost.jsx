import React, { useState } from "react";
// import timeSince from "../../helpers/timeSince";
import { CardBody } from "reactstrap";
import styles from './EditPost.module.scss'
import poststyles from './PostListItem.module.scss'
import Tags from "./StackTag";

function EditPostItem(props) {
  //console.log("from edit post", props);
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
    <div className={styles.dasheditor}>
      <CardBody className="">

        <textarea
          className={styles.edittextbody}
          type="text"
          value={post}
          onChange={(event) => setPost(event.target.value)}
          placeholder="Round border"
        />
        <ul className={poststyles.poststack}>
          <span className={poststyles.bold}>Stack:</span>
          {props.stack.map((tech_stack, idx) => {
            return <li key={idx}>{tech_stack}</li>;
          })}
        </ul>
        <Tags
          tags={props.stack}
          // onChange={onChangeInput}
          suggested={props.suggestion}
        />
        <div className={poststyles.bluebutton} onClick={onSave}>Save</div>
      </CardBody>
    </div>
  );
}

export default EditPostItem;
