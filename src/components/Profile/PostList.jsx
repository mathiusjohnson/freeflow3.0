import React from "react";
// import Row from "@paljs/ui/Row";
import PostListItem from "./PostListItem";

function PostList(props) {
  const { comments, posts, updatePost, deletePost } = props;
  console.log("from post list", comments, posts);
  const postData = posts.map((post, index) => {
    return (
      <PostListItem
        user={props.user}
        key={index}
        index={index}
        comments={comments}
        post={post}
        users={props.users}
        createComment={props.createComment}
        updatePost={updatePost}
        deletePost={deletePost}
      />
    );
  });
  return {postData};
}

export default PostList;
