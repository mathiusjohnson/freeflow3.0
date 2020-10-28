// import "components/studentList.scss"
import React from "react";
import UserListItem from "./UserListItem";

export default function StudentList(props) {
  const { users } = props;
  const usersData = users.map((user, index) => {
		
    return (
      <UserListItem
        key={index}
        userId={user.id}
        username={user.username}
				studentExperience={user.studentrating}
				helperExperience={user.helperrating}
        avatar={user.avatar}
        setSelectedUser={props.setSelectedUser}
				active={user.active}
				helper_stack={props.helper_stack}
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
