import { Card, CardBody } from "reactstrap";
import React, { useState, useEffect } from "react";
import Tags from "./MentorStack";
import RegisterAvatarList from "./Avatar/RegisterAvatarList";
import { useAuthState } from '../../Context';
// import Stack from "./UserStack";

function EditUserInfo(props) {
  const userDetails = useAuthState();

  const [username, setUsername] = useState(props.user.username || "");
  const [location, setLocation] = useState(props.user.location || "");

  //bring down the avatar list from useState
  const [avatarList, setAvatarList] = useState([]);
  const [showAvatarList, setShowAvatarList] = useState(false);
  const [selectedAvatarUrl, setSelectedAvatarUrl] = useState("");

  // const [error, setError] = useState("");

  function selectAvatar(avatarUrl) {
    setSelectedAvatarUrl(avatarUrl);
  }

  function toggleAvatarList() {
    !showAvatarList ? setShowAvatarList(true) : setShowAvatarList(false);
  }

  useEffect(() => {
    setAvatarList(props.avatars);
    setSelectedAvatarUrl(props.user.avatar);
  }, [props.avatars, props.user.avatar]);

  let techTags = [];
  const onChangeInput = (selectedTags) => {
    techTags = selectedTags;
  };

  function onSave() {
    const newDetails = {
      id: userDetails.id,
      avatar: selectedAvatarUrl,
      username: username,
      location: location,
    };

    const oldStack = props.user_skills.map((val) => {
      return val["name"];
    });
    const newStack = techTags.map((val) => {
      return val["name"];
    });

    //removed from the list
    const removed = oldStack.filter((x) => !newStack.includes(x));
    // added to the list
    const added = newStack.filter((x) => !oldStack.includes(x));
    if (removed.length !== 0 || added.length !== 0) {
      props.onSaveNewStack(removed, added, userDetails.id);
    }
    props.onSaveNewInfo(newDetails, userDetails.id);
    props.onSave();
  }
  return (
    <Card>
      <CardBody>
        <div className="user-info">
          {/* <Row>
            <Col
              className="avatar edit-user-info"
              breakPoint={{ xs: 12, sm: 12, md: 12, lg: 12 }}
            > */}
              <div id="avatar-list-holder">
                <RegisterAvatarList
                  // user={props.user}
                  avatarList={avatarList}
                  selectAvatar={selectAvatar}
                  selectedAvatarUrl={selectedAvatarUrl}
                  toggleAvatarList={toggleAvatarList}
                  showAvatarList={showAvatarList}
                />
              </div>
              <div className="input">
                <input
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="Round border"
                />
                <input
                  type="text"
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  placeholder="Round border"
                />
              </div>
            {/* </Col>
            <Col></Col>
            <Col breakPoint={{ xs: 12, sm: 12, md: 12, lg: 12 }}> */}
              {props.active ? (
                <p className="status">
                  User is <span className="online">online</span>
                </p>
              ) : (
                <p className="status">
                  User is <span className="offline">offline</span>
                </p>
              )}
            {/* </Col>
            <Col breakPoint={{ xs: 12, sm: 12, md: 12, lg: 12 }}> */}
              <Tags
                tags={props.user_skills}
                onChange={onChangeInput}
                suggested={props.suggestion}
              />
            {/* </Col>
          </Row>
          <Row> */}
            <div className="edit-buttons">
              <button
                fullWidth
                appearance="hero"
                status="Success"
                className="green-button green button-transition"
                onClick={onSave}
              >
                Save
              </button>
              <button
                fullWidth
                appearance="hero"
                status="Success"
                className="red-button red-button-transition"
                style={{ width: "100%" }}
                onClick={props.onCancel}
              >
                Cancel
              </button>
            </div>
          {/* </Row> */}
        </div>
      </CardBody>
    </Card>
  );
}

export default EditUserInfo;
