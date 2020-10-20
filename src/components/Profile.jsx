import React from "react";
import Editor from "../components/Profile/Editor";
import PostList from "../components/Profile/PostList";
import UserInfo from "../components/Profile/UserInfo";
import EditUserInfo from "../components/Profile/EditUserInfo";

import ContextConsumer from "../context/context";
import { getUser, getUserPosts, getStack } from "../helpers/profileHelpers";

import useVisualMode from "../hooks/useVisualMode";
import useApplicationData from "../hooks/useApplicationData";

import "./Profile.css";

const SHOW = "SHOW";
// const CONFIRM = "CONFIRM";
// const SAVING = "SAVING";
const EDITING = "EDITING";
// const ERROR_SAVE = "ERROR_SAVE";
// const ERROR_DELETE = "ERROR_DELETE";

function UserProfileItem(props) {
  const {
    state,
    createPost,
    updateUserInfo,
    updatehelperStack,
    createComment,
    updatePost,
    deletePost,
  } = useApplicationData();
  const { mode, transition, back } = useVisualMode(SHOW);
  const loggedUser = typeof document !== 'undefined' && document.cookie.split("=")[1];
  let senderID = typeof document !== 'undefined' && document.cookie.split("=")[1];

  function onEdit() {
    transition(EDITING);
  }

  function onSave() {
    transition(SHOW);
  }

  function onCancel() {
    back();
  }

  console.log(state.users);
  let currentUser = state.users.find(
    (user) => user.id === props.userId || user.username === props.userId
  );
  // console.log("current user after prof item: ", props.userId);
  return (
    <>
      <ContextConsumer>
        {({ data, set }) => {
          if (!data.state) return null;
          if (!data.selected) return null;
          console.log("data in context: ", data.state.users);

          if (!currentUser) {
            currentUser = state.users.find((user) => user.id === data.selected);
            console.log("current user in context: ", currentUser);
          }

          if (!currentUser) {
            return null;
          }

          if (
            currentUser.id ||
            currentUser.helped_id ||
            currentUser.helper_id
          ) {
            senderID = currentUser;
          }
          const comments = state.comments;

          const posts = getUserPosts(state.posts, senderID.id);

          const user = getUser(state.user_profiles, senderID.id);

          const helper = data.state.helper_points.find(
            (helper) => helper.id === user.id
          );

          const helped = data.state.helped_points.find(
            (helped) => helped.id === user.id
          );

          const helper_stack = getStack(state.helper_stack, senderID.id);

          return (

            <div>

              {mode === SHOW && (
                <>
                  {console.log("after reducer", state.users[0])}
                  <UserInfo
                    user={currentUser}
                    loggedInUser={data.selected}
                    onEdit={onEdit}
                    helper_stack={helper_stack}
                  />
                </>
              )}
              {mode === EDITING && (
                <>
                  <EditUserInfo
                    user={currentUser}
                    loggedInUser={data.selected}
                    helper_stack={helper_stack}
                    suggestion={state.db_skills}
                    avatars={state.avatars}
                    onSaveNewInfo={updateUserInfo}
                    onSaveNewStack={updatehelperStack}
                    onSave={onSave}
                    onCancel={onCancel}
                  />
                </>
              )}
              {currentUser.id === parseInt(loggedUser, 10) ? (

                    <Editor
                      id={user.id}
                      createPost={createPost}
                      suggestion={state.db_skills}
                    />

              ) : (
                  ""
                )}
                  <h2>Recent Posts...</h2>

              <PostList
                user={currentUser}
                comments={comments}
                posts={posts}
                users={state.users}
                createComment={createComment}
                updatePost={updatePost}
                deletePost={deletePost}
              />
              </div>
            );
          }}
      </ContextConsumer>
    </>
  );
}

export default UserProfileItem;
