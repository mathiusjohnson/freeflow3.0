import React, { useState } from "react";
import Tags from "./StackTag";
// import ContextConsumer from "../../context/context";
import styles from "./Editor.module.scss";
import {  Form, FormGroup, Label, Input } from 'reactstrap';

function Editor(props) {
  const [value, setValue] = useState('');
  const [checkbox, setCheckbox] = useState({
    1: false,
  });
  const [error, setError] = useState("");

  const onChangeCheckbox = (value, name) => {
    setCheckbox({ ...checkbox, [name]: value });
  };

  let avatarUrl, username;
  console.log("localStorage in editor: ", localStorage);
  if (typeof localStorage !== 'undefined') {
    avatarUrl = typeof localStorage !== 'undefined' && localStorage.avatarUrl
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
    <div>
      <Form >
        <FormGroup>
          <textarea 
            type="textarea" 
            name="text" 
            id="exampleText"
            placeholder="Create new post"
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
            Insert dropdown list for selecting category
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
                <Input 
                  type="checkbox"
                  onChange={(value) => onChangeCheckbox(value, 1)}
                  status="Success"
                  checked={checkbox[1]}
                />{' '}
              Insert dropdown list for selecting topic
            </Label>
          </FormGroup>
        </FormGroup>
      </Form>
    <div 
    className={styles.postbtn} 
    onClick={() => validatePost()}>Post</div>
    <div>
      <section className={styles.validation}>{error}</section>
    </div>
    </div>
  );
}

export default Editor;
