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
  let loggedInUser = JSON.parse(localStorage.getItem('currentUser'))
	const userDetails = useAuthState();

	if (!userDetails || !state) return null;

	function onEdit() {
    transition(EDITING);
  }

  function onSave() {
    transition(SHOW);
  }

  function onCancel() {
    back();
  }
	// console.log("Profile state type", state.types);

	const comments = state.comments;

	let routedUserID
	if (props.location.state !== null) {
		routedUserID = props.location.state.id 
	}
	let user = getUser(state.user_profiles, routedUserID);
	if (!user) return null;
	


	let currentUser;
	if (user.id) {
		currentUser = user
	} else {
		currentUser = loggedInUser
		currentUser = getUser(state.user_profiles, currentUser.id)
	}
	
	const posts = getUserPosts(state.posts, currentUser.id);
	const helper_stack = getStack(state.user_skills, currentUser.id);
	const helper = state.helper_points.find(
		(helper) => helper.id === currentUser.id
	);

	const helped = state.helped_points.find(
		(helped) => helped.id === currentUser.id
	);
	console.log(currentUser);
	// console.log("helper points: ",helper, "helper points: ", helped);
	return (

		<div>

			{mode === SHOW && (
				<>
					<UserInfo
						user={currentUser}
						onEdit={onEdit}
						helper_stack={helper_stack}
						helper={helper}
						helped={helped}
					/>
				</>
			)}
			{mode === EDITING && (
			<>
				<EditUserInfo
					user={currentUser}
					loggedInUser={currentUser}
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
			{currentUser.id === parseInt(loggedInUser.id, 10) ? (

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

	// USE LATER?
