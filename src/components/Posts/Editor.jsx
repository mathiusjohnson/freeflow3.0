import React, { useState } from "react";
import Tags from "./StackTag";
import ContextConsumer from "../../context/context";
import styles from "./Editor.module.scss";

function Editor(props) {
  const [value, setValue] = React.useState();
  const [checkbox, setCheckbox] = React.useState({
    1: false,
  });
  const [error, setError] = useState("");

  // const onChangeCheckbox = (value, name) => {
  //   setCheckbox({ ...checkbox, [name]: value });
  // };

  let avatarUrl, userID, username;
  
  if (typeof localStorage !== 'undefined') {
    avatarUrl = typeof localStorage !== 'undefined' && localStorage.avatarUrl
    userID = typeof localStorage !== 'undefined' && localStorage.userID
    username = typeof localStorage !== 'undefined' && localStorage.usreUrl
  }
  // const { avatarUrl, userID, username } = localStorage;

  // return (
  //   <>
  //     <ContextConsumer>
  //       {({ data }) => {
  //         if (!data.state) return null;
  //         const currentUser = props.users.find(
  //           (user) => user.id === data.selected
  //         );

          let techTags = [];
          const onChangeInput = (selectedTags) => {
            // console.log("HELLOOOOO");
            techTags = selectedTags;
          };

          const postObj = {
            text: value,
            mentor: checkbox[1],
            avatar: avatarUrl,
            username: username,
            stack: techTags,
          };

          // function validatePost() {
          //   if (value === "") {
          //     setError("Post cannot be blank");
          //     return;
          //   }
          //   if (value !== "") {
          //     setError("");
          //     props.createPost(postObj, techTags, currentUser.id).then(() => {
          //       setValue("");
          //     });
          //   }
          // }
          return (
            <>
              <div className={styles.flex}>
                {/* <MDEditor className="editor" value={value} onChange={setValue} /> */}
                <div className={styles.flexrow}>
                  <div className={styles.tags}>
                    <Tags suggested={props.suggestion} onChange={onChangeInput} />
                  </div>
                  <div className={styles.checkbox}>
                    {/* <Checkbox
                      checked={checkbox[1]}
                      status="Success"
                      onChange={(value) => onChangeCheckbox(value, 1)}
                    >
                      Mentor Help Needed
                  </Checkbox> */}
                  </div>
                </div>
                  {/* <div
                    className={styles.postbtn}
                    onClick={() => validatePost()}
                  >
                    Post
                </div> */}
              </div>
              <div>
                <section className={styles.validation}>{error}</section>
              </div>
            </>
          );
  //       }}
  //     </ContextConsumer>
  //   </>
  // );
}

export default Editor;
