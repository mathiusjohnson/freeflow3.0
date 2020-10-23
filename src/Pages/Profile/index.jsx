import React from "react";
import Editor from "../../components/Profile/Editor";
import PostList from "../../components/Profile/PostList";
import UserInfo from "../../components/Profile/UserInfo";
import EditUserInfo from "../../components/Profile/EditUserInfo";
import { getUser, getUserPosts, getStack } from "../../helpers/profileHelpers";
import useVisualMode from "../../hooks/useVisualMode";
import useApplicationData from "../../hooks/useApplicationData";
import { useAuthState } from '../../Context';
import "./Profile.module.css";

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
  let senderID = typeof document !== 'undefined' && document.cookie.split("=")[1];
  let currentUser = JSON.parse(localStorage.getItem('currentUser'))
	const userDetails = useAuthState();
	console.log("user details in profile: ", userDetails);

	if (!userDetails) return null;


	if (!state) return null;

	function onEdit() {
    transition(EDITING);
  }

  function onSave() {
    transition(SHOW);
  }

  function onCancel() {
    back();
  }
	
	const comments = state.comments;

	const posts = getUserPosts(state.posts, senderID);
	console.log("props location in profile index: ", props.location);
	let routedUserID
	if (props.location.state !== null) {
		routedUserID = props.location.state.id 
	}
	const user = getUser(state.user_profiles, routedUserID);

	if (!user) return null;

	const helper = state.helper_points.find(
		(helper) => helper.id === user.id
	);

	// console.log("helper in profile index: ", helper);
	const helped = state.helped_points.find(
		(helped) => helped.id === user.id
	);

	const helper_stack = getStack(state.user_skills, senderID.id);
	console.log("user in profile index: ", user);
	if (user.id) {
		currentUser = user
	} else {
		currentUser = JSON.parse(localStorage.getItem('currentUser'))
	}

	return (

		<div>

			{mode === SHOW && (
				<>
					<UserInfo
						user={currentUser}
						onEdit={onEdit}
						// helper_stack={helper_stack}
					/>
				</>
			)}
			{mode === EDITING && (
			<>
				<EditUserInfo
					user={currentUser}
					loggedInUser={currentUser}
					// helper_stack={helper_stack}
					suggestion={state.db_skills}
					avatars={state.avatars}
					onSaveNewInfo={updateUserInfo}
					onSaveNewStack={updatehelperStack}
					onSave={onSave}
					onCancel={onCancel}
				/>
			</>
			)}
			{currentUser.id === parseInt(senderID, 10) ? (

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
}

export default UserProfileItem;
