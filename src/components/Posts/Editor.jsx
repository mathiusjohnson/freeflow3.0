import React, { useState } from "react";
import Tags from "./StackTag";
// import ContextConsumer from "../../context/context";
import styles from "./Editor.module.scss";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

function Editor(props) {
  const [value, setValue] = useState('');
  const [checkbox, setCheckbox] = useState({
    1: false,
  });
  const [error, setError] = useState("");

  const onChangeCheckbox = (value, name) => {
    setCheckbox({ ...checkbox, [name]: value });
  };

  let avatarUrl, userID, username;
  
  if (typeof localStorage !== 'undefined') {
    avatarUrl = typeof localStorage !== 'undefined' && localStorage.avatarUrl
    userID = typeof localStorage !== 'undefined' && localStorage.userID
    username = typeof localStorage !== 'undefined' && localStorage.usreUrl
  }

  let techTags = [];
  const onChangeInput = (selectedTags) => {
    // console.log("HELLOOOOO");
    techTags = selectedTags;
  };

  const postObj = {
    text: value,
    helper: checkbox[1],
    avatar: avatarUrl,
    username: username,
    stack: techTags,
  };

  function validatePost() {
    if (value === "") {
      setError("Post cannot be blank");
      return;
    }
    if (value !== "") {
      setError("");
      props.createPost(postObj, techTags, props.user.id).then(() => {
        setValue("");
      });
    }
  }
  return (
    <Form >
      <FormGroup>
        <textarea 
          type="textarea" 
          name="text" 
          id="exampleText" 
          value={value} 
          onChange={e => setValue(e.target.value)} 
        />
          <Tags suggested={props.suggestion} onChange={onChangeInput} />
          <FormGroup check>
            <Label check>
              <Input 
                type="checkbox"
                onChange={(value) => onChangeCheckbox(value, 1)}
                status="Success"
                checked={checkbox[1]}
              />{' '}
              Help Needed
            </Label>
          </FormGroup>
        <div 
        className={styles.postbtn} 
        onClick={() => validatePost()}>Post</div>
    <div>
      <section className={styles.validation}>{error}</section>
    </div>
    </FormGroup>

    </Form>
  );
}

export default Editor;
