import React from "react";
import ProgressBar from "../ProgressBar/ProgressBar";

function Experience(props) {
  // console.log("props in experience: ", props);

  if (!props.user) return {};
  console.log("user in experience: ", props.user.studentrating);

  return (
    <div className="experience">
      <div className="exp-classification">
        {props.user.mentorrating ? <p>Mentor Level</p> : ""}
        {props.user.mentorrating ? (
          <ProgressBar experience={Number(props.user.mentorrating)} />
        ) : (
          ""
        )}
      </div>

      <div className="exp-classification">
        {props.user.studentrating ? <p>Student Level</p> : ""}
        {props.user.studentrating ? (
          <ProgressBar experience={Number(props.user.studentrating)} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Experience;
