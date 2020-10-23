import PostListItem from "./PostListItem";
import React from 'react'

export default function PostList(props) {
  const comments = props.comments;
  const likes = props.likes;
  props.posts.sort(function(a, b) {
    let dateA = new Date(a.time_posted), dateB = new Date(b.time_posted)
    return dateB-dateA
  })
  
  const postData = props.posts.map((post, index) => {
    return (
      <PostListItem
        index={index}
        key={index}
        post={post}
        comments={comments}
        likes={likes}
        addLike={props.addLike}
        removeLike={props.removeLike}
        createComment={props.createComment}
        removeComment={props.removeComment}
        editComment={props.editComment}
        users={props.users}
        deletePost={props.deletePost}
        updatePost={props.updatePost}
        currentUser={props.currentUser}
      />
    );
  });
  
  return (
    <div>
      <section>
        <h1>Feed</h1>
        <ul>{postData}</ul>
      </section>
    </div>
  );
}
