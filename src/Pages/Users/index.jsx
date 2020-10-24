// import "components/studentList.scss"
import React from "react";
import UserListItem from "../../components/UserList/UserListItem";
import useApplicationData from "../../hooks/useApplicationData";

export default function UserList(props) {
	const {
    state,
    // createPost,
    // addLike,
    // createComment,
    // removeLike,
    // removeComment,
    // editComment,
    // filterDashboardPosts,
    // deletePost,
    // updatePost,
  } = useApplicationData();  console.log("state in user props: ", state);
  const usersData = state.users.map((user, index) => {
		// console.log("users in user list: ", user);
		
    return (
      <UserListItem
        key={index}
        userId={user.id}
        username={user.username}
				studentExperience={user.helpedrating}
				mentorExperience={user.helperrating}
        avatar={user.avatar}
        setSelectedUser={state.setSelectedUser}
				active={user.active}
				user_skills={state.user_skills}
      />
    );
  });
  return (
    <section>
      {/* <h1>Users</h1> */}
      <ul>{usersData}</ul>
    </section>
  );
}
