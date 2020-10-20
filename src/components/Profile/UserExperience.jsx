import React from "react";
import ProgressBar from "../ProgressBar/ProgressBar";

function Experience(props) {
  // console.log("props in experience: ", props);

  if (!props.user) return {};
  console.log("user in experience: ", props.user.helpedrating);

  return (
    <div className="experience">
      <div className="exp-classification">
        {props.user.helperrating ? <p>Helper Level</p> : ""}
        {props.user.helperrating ? (
          <ProgressBar experience={Number(props.user.helperrating)} />
        ) : (
          ""
        )}
      </div>

      <div className="exp-classification">
        {props.user.helpedrating ? <p>Helped Level</p> : ""}
        {props.user.helpedrating ? (
          <ProgressBar experience={Number(props.user.helpedrating)} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Experience;
