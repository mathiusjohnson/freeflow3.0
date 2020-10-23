import React from "react";
import PostListItem from "./PostListItem";

function PostList(props) {
  const { comments, posts, updatePost, deletePost } = props;
  // console.log("comments from post list", comments);
  // console.log("posts from post list", posts
  // );

  // posts.map(post => console.log("post in map: ", post))

  const postData = posts.map((post, index) => {
    return (
      // <div>postData map</div>
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
  return postData;
  return (
    <div>PostList</div>
  )
}

export default PostList;
