import React, {useState} from 'react';
import Tags from "./StackTag";
import styles from "../Posts/Editor.module.scss";
import {  Form, FormGroup, Label, Input } from 'reactstrap';
import 'draft-js/dist/Draft.css';

function Editor(props) {
  const [error, setError] = useState("");
  const [value, setValue] = React.useState("");
  const [checkbox, setCheckbox] = React.useState({
    1: false,
  });

  
  const onChangeCheckbox = (value, name) => {
    setCheckbox({ ...checkbox, [name]: value });
  };

  const postObj = {
    text: value,
    helper: checkbox[1],
  };

  let techTags = [];
  const onChangeInput = (selectedTags) => {
    techTags = selectedTags;
  };

  // const onCancel = () => {
  //   //check for empty input here
  //   //empty tags should also be checked here.
  //   setValue("");
  // };
  
  function validatePost() {
    if (value === "") {
      setError("Post cannot be blank");
      return;
    }
    if (value !== ""){
      setError("");
      props.createPost(postObj, techTags, props.id).then(() => {
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
