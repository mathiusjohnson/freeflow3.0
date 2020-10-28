import React from "react";
import { NavLink } from 'react-router-dom';
import Experience from "./UserExperience";
import { Card, CardBody } from "reactstrap";
import Stack from './UserStack'
import styles from './UserInfo.module.scss'

function UserInfo(props) {
  let loggedInUser = JSON.parse(localStorage.getItem('currentUser'))

  return (
    <Card>
      <CardBody>
        <div className="user-info">
          <div className="avatar-container">
            <img src={props.user.avatar} alt="avatar" />
          </div>
          <div>
            {props.user.active ? (
              <p className="status">
                User is <span className="online">online</span>
              </p>
            ) : (
                <p className="status">
                  User is <span className="offline">offline</span>
                </p>
              )}
          </div>
          <h2>{props.user.first_name} {props.user.last_name}</h2>
          <p className="username">
            <span>@</span>
            {props.user.username}
            <span> ({props.user.location})</span>
          </p>
          <Stack helper={props.helper_stack} />
          <Experience
            helper={props.helper}
            helped={props.helped}
            user={props.user}
          />
          {props.user.id === parseInt(loggedInUser.id, 10) ? (
            <button
              appearance="hero"
              className={styles.greenbutton}
              onClick={props.onEdit}
            >
              Edit
            </button>
          ) : (
            <NavLink to={{
              pathname:'/messages/',
              state: {username: props.user.username }
            }}>
              <button
                appearance="hero"
                className="green-button green button-transition"
              // onClick={props.onEdit}
              >
                Message
            </button>
            </NavLink>
          )}
        </div>
      </CardBody>
    </Card>
  );
}

export default UserInfo;
