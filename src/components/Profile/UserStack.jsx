import React from "react";

function Stack(props) {
  //console.log("from USER STACK", props);
  const helperStack = props.helper.map((stack, index) => {
    return <li key={index}>{stack.name} </li>;
  });

  return (
    // <Row>
    //   <Col breakPoint={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
        <ul className="stack">
          <span className="bold">helper Stack:</span>
          {helperStack}
        </ul>
    //   </Col>
    // </Row>
  );
}

export default Stack;
