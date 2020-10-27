import React from "react";

function Stack(props) {
  //console.log("from USER STACK", props);
  const helperStack = props.helper.map((stack, index) => {
    return <li key={index}>{stack.name} </li>;
  });

  return (
    <ul className="stack">
      <span className="bold">Skills:</span>
      {helperStack}
    </ul>
  );
}

export default Stack;
