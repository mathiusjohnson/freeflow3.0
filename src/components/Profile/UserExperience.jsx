import React from "react";
import ProgressBar from "../ProgressBar/ProgressBar";

function Experience(props) {

  if (!props.user) return {};
  if (!props.helper) return null;
  if (!props.helped) return null;

  console.log("user in experience bar: ", props.helper.helperrating);
  const helper = props.helper;
  console.log(helper);
  return (
    <div className="experience">
      <div className="exp-classification">
        {props.helper ? <p>Helper Level</p> : ""}
        {props.helper.helperrating ? (
          <ProgressBar experience={Number(props.helper.helperrating)} />
        ) : (
          ""
        )}
      </div>

      <div className="exp-classification">
        {props.helped.helpedrating ? <p>Helped Level</p> : ""}
        {props.helped.helpedrating ? (
          <ProgressBar experience={Number(props.helped.helpedrating)} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Experience;
