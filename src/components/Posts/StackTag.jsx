import React, { useState, useRef, useEffect } from "react";
import ReactTags from "react-tag-autocomplete";

function Tags(props) {
  // console.log("from tags", props.suggested);
  // const suggested = Object.values(props.suggested);
  const [tags, setTags] = useState([]);

  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    setSuggestions(props.suggested);
  }, [props.suggested]);

  const reactTags = useRef(null);

  const onDelete = (i) => {
    let tag = tags.slice(0);
    tag.splice(i, 1);
    setTags(tag);
  };

  const onAddition = (tag) => {
    setTags([...tags, tag]);
    // console.log("tags", tags);
  };

  return (
    <ReactTags
      ref={reactTags}
      tags={tags}
      suggestions={suggestions}
      onDelete={onDelete}
      onAddition={onAddition}
      onChange={props.onChange(tags)}
    />
  );
}

export default Tags;
// ReactDOM.render(<App />, document.getElementById("app"));
