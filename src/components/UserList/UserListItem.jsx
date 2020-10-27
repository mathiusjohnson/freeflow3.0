import React from "react";
import ProgressBar from '../../components/ProgressBar/ProgressBar'
import { Card, CardBody } from "reactstrap";
import { NavLink } from "react-router-dom";
import "./UserListItem.scss";

export default function UserListItem(props) {	
	const stack = props.user_skills.map((skill, index) => {
    if (skill.user_id === props.userId) {
			// console.log("skill name: ", skill.name);
			
      return <li className="list" key={index}>{skill.name}&nbsp;</li>
    }
	})
	console.log("props in userlist item: ", props);
	
  return (
    <div className="userlist">
      <div>
        <Card>
          <CardBody className="post-body">
            {/* EXPERIENCE BARS */}
            <div className="experience-bars">
              <div className="helper-xp-bar">
                {props.helperExperience ? 
                  <h4>Helper Level</h4>
                : ""}
                {props.helperExperience ? 
                  <ProgressBar 
                    experience={Number(props.helperExperience)}
                  />
                : ""}
              </div>
              <div className="student-xp-bar">
                {props.studentExperience ? 
                  <h4>Student Level</h4>
                : ""}
                {props.studentExperience ? 
                  <ProgressBar
                    experience={Number(props.studentExperience)}
                  />
                : ""}
              </div>
              {!props.studentExperience && !props.helperExperience ? 
              <div className="new-user">
                <h4>{props.username} is new.</h4>
                <h5>Invite them for a <NavLink className="tutor-link" to='/tutor-sessions'>tutor session</NavLink> to help them get on the experience board!</h5>
              </div>
              : ""}
            </div>
            {/* USERS DETAILS */}
            <div className="centered-user-deets">
              <NavLink className="user-link" to={{
									pathname:`/profile/${props.userId}`,
									search: "?sort=name",
									hash: "#the-hash",
									state: { id: props.userId }}}>
                <span className="user-card">
                  <span className="circle">
                    <img src={props.avatar} alt="avatar"></img>
                  </span>    
                  <span className="bg">
                    <h3>{props.username}</h3>
                  </span>
                </span>
              </NavLink>
              <NavLink className="online-link" to={{
									pathname:`/profile/${props.userId}`,
									search: "?sort=name",
									hash: "#the-hash",
									state: { id: props.userId }}}>
                <span>{props.active ? <h6>User is online</h6> : <h6>User is offline</h6>}
                </span>
              </NavLink>
            </div>

            {/* MESSAGE BUTTON */}
            <div className="message-button">
              <NavLink
                to={{
                  pathname:'/messages/',
                  state: {username: props.username }
                }}
                className="no-decoration"
              >
              <div className="blue-button button-transition">Message User</div>
              </NavLink>
            </div>
            {/* POST STACK LIST */}
            <div className="stack">
              <span className="language-title">Language Preferences:&nbsp;</span><span>{stack}</span>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}