// import "components/studentList.scss"
import React from "react";
import UserListItem from "../../components/UserList/UserListItem";

export default function StudentList(props) {
  const { users } = props;
  const usersData = users.map((user, index) => {
		// console.log("users in user list: ", user);
		
    return (
      <UserListItem
        key={index}
        userId={user.id}
        username={user.username}
				studentExperience={user.studentrating}
				mentorExperience={user.mentorrating}
        avatar={user.avatar}
        setSelectedUser={props.setSelectedUser}
				active={user.active}
				mentor_stack={props.mentor_stack}
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
