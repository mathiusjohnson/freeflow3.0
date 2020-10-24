import React from "react";
import { NavLink } from 'react-router-dom';
import Experience from "./UserExperience";
import { Card, CardBody } from "reactstrap";

function UserInfo(props) {
  const senderID = typeof document !== 'undefined' && document.cookie.split("=")[1];
  console.log("sender ID", senderID);
  return (
    <Card>
      <CardBody>
        <div className="user-info">
          {/* <Row>
            <Col
              className="avatar"
              breakPoint={{ xs: 12, sm: 12, md: 12, lg: 12 }}
            > */}
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
              <p className="username">
                <span>@</span>
                {props.user.username}
                <span> ({props.user.location})</span>
              </p>
            {/* </Col>
            <Col breakPoint={{ xs: 12, sm: 12, md: 12, lg: 12 }}></Col>
            <Col breakPoint={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
              <Stack helper={props.helper_stack} />
            </Col> */}
            {/* <Col breakPoint={{ xs: 12, sm: 12, md: 12, lg: 12 }}> */}
            <Experience
              helper={props.user.helperrating}
              helped={props.user.helpedrating}
              user={props.user}
            />
            {/* </Col> */}
          {/* </Row>
          <Row> */}
            {props.user.id === parseInt(senderID, 10) ? (
              <button
                fullWidth
                appearance="hero"
                className="green-button green button-transition"
                onClick={props.onEdit}
              >
                Edit
              </button>
            ) : (
                <NavLink to={`/messages/`} state={{ username: props.user.username }}>
                  <button
                    fullWidth
                    appearance="hero"
                    className="green-button green button-transition"
                  // onClick={props.onEdit}
                  >
                    Message
                </button>
                </NavLink>
              )}
          {/* </Row> */}
        </div>
      </CardBody>
    </Card>
  );
}

export default UserInfo;
