import PostList from "../../components/Posts/PostList";
import Editor from "../../components/Posts/Editor";
import useApplicationData from "../../hooks/useApplicationData";
import { getDashboardPosts } from "../../helpers/profileHelpers";
import '../../components/Home.scss'
import React from 'react'
// import styles from './dashboard.module.css';
import { useAuthState } from '../../Context';

export default function Home(props) {
  const {
    state,
    createPost,
    addLike,
    createComment,
    removeLike,
    removeComment,
    editComment,
    filterDashboardPosts,
    deletePost,
    updatePost,
  } = useApplicationData();

  const userDetails = useAuthState();

	if (!userDetails) return null;
  let currentUser = JSON.parse(localStorage.getItem('currentUser'))
  let dashPosts = getDashboardPosts(state.posts);
  // const filterOptions = getFilterOptions(state.posts);
  // useEffect(() => {
  //   setOptions(filterOptions);
  // }, []);
  function filterPost(filter) {
    // if (filter !== "") {
    filterDashboardPosts(filter);
    // dashPosts = getDashboardPosts(state.filtered_posts);
    //}
  }
  // dashPosts = state.filtered_posts;
  // console.log("dashposts in dash: ", dashPosts);

  const comments = state.comments;
  const likes = state.likes;
  const users = state.users;
  return (
    <div className="dashboard-page">
      <div className="App">
        <div className="hero">
          {" "}
          <h1 className="title">Build a better online community.</h1>
          <p>Ask for help or help others.</p>
        </div>
        <Editor
          createPost={createPost}
          suggestion={state.db_skills}
          users={users}
          user={currentUser}
        />
        <div className="container">
          <div className="post-filter">
            <div
              className="filter-btn filter-btn-all"
              onClick={() => filterPost("")}
            >
              All
            </div>
            <div
              className="filter-btn filter-btn-css"
              onClick={() => filterPost("Programming")}
            >
              Programming
            </div>

            <div
              className="filter-btn filter-btn-ruby"
              onClick={() => filterPost("Writing")}
            >
              Writing
            </div>
            <div
              className="filter-btn filter-btn-javascript"
              onClick={() => filterPost("Cooking")}
            >
              Cooking
            </div>
          </div>
          <PostList
            currentUser={currentUser}
            users={users}
            posts={dashPosts}
            comments={comments}
            likes={likes}
            addLike={addLike}
            removeLike={removeLike}
            createComment={createComment}
            removeComment={removeComment}
            editComment={editComment}
            deletePost={deletePost}
            updatePost={updatePost}
          />
        </div>
      </div>
    </div>
  );
}
