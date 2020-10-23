import React from "react";
import ProgressBar from '../../components/ProgressBar/ProgressBar'
import { Card, CardBody } from "reactstrap";
import { NavLink } from "react-router-dom";
import "./UserListItem.scss";

export default function UserListItem(props) {	
	const stack = props.user_skills.map((skill, index) => {
    if (skill.user_id === props.userId) {
			console.log("skill name: ", skill.name);
			
      return <li className="list" key={index}>{skill.name}&nbsp;</li>
    }
	})
	console.log("props skill: ", stack);
	
  return (
    <div className="userlist">
      <div>
        <Card>
          <CardBody className="post-body">
            {/* EXPERIENCE BARS */}
            <div className="experience-bars">
              <div className="mentor-xp-bar">
                {props.mentorExperience ? 
                  <h4>Mentor Level</h4>
                : ""}
                {props.mentorExperience ? 
                  <ProgressBar 
                    experience={Number(props.mentorExperience)}
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
              {!props.studentExperience && !props.mentorExperience ? 
              <div className="new-user">
                <h4>{props.username} is new.</h4>
                <h5>Invite them for a <NavLink className="tutor-link" to='/tutor-sessions'>tutor session</NavLink> to help them get on the experience board!</h5>
              </div>
              : ""}
            </div>
            {/* USERS DETAILS */}
            <div className="centered-user-deets">
              <NavLink className="user-link" to={`/user-profiles/${props.username}`}>
                <span className="user-card">
                  <span className="circle">
                    <img src={props.avatar} alt="avatar"></img>
                  </span>    
                  <span className="bg">
                    <h3>{props.username}</h3>
                  </span>
                </span>
              </NavLink>
              <NavLink className="online-link" to={`/user-profiles/${props.username}`}>
                <span>{props.active ? <h6>User is online</h6> : <h6>User is offline</h6>}
                </span>
              </NavLink>
            </div>

            {/* MESSAGE BUTTON */}
            <div className="message-button">
              <NavLink
                to={`/messages/`}
                className="no-decoration"
                state={{ username: props.username }}
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