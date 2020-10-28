import { useReducer, useEffect } from "react";
import { makeStackObj } from "../helpers/profileHelpers";
import axios from "axios";
import reducer, {
  // SET_POINTS,
  SET_APPLICATION_DATA,
  SET_SELECTED_USER,
  SET_POSTS,
  // SET_NEW_STACK,
  SET_NEW_INFO,
  SET_LIKES,
  ADD_COMMENT,
  REMOVE_LIKE,
  REMOVE_COMMENT,
  EDIT_COMMENT,
  ADD_TO_STACK,
  REMOVE_FROM_STACK,
  EDIT_POST,
  DELETE_POST,
  FILTER_POSTS,
  // FETCH_POSTS,
} from "../reducers/application";

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    comments: {},
    likes: [],
    user_skills: [],
    points: 0,
    posts: [],
    // student_stack: [],
    experiences: [],
    user_profiles: [],
    users: [],
    helper_points: [],
    helped_points: [],
    db_skills: [],
    posts_skills: [],
    avatars: [],
    // selected: {},
    filtered_posts: [],
  });

  // RETRIEVES API AND SETS IT WITH REDUCER
  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/comments"),
      axios.get("http://localhost:8001/api/likes"),
      axios.get("http://localhost:8001/api/user_skills"),
      axios.get("http://localhost:8001/api/posts"),
      // axios.get("http://localhost:8001/api/student_stack"),
      axios.get("http://localhost:8001/api/experiences"),
      axios.get("http://localhost:8001/api/user_profiles"),
      axios.get("http://localhost:8001/api/users"),
      axios.get("http://localhost:8001/api/helper_points"),
      axios.get("http://localhost:8001/api/helped_points"),
      axios.get("http://localhost:8001/api/db_skills"),
      axios.get("http://localhost:8001/api/posts_skills"),
      axios.get("http://localhost:8001/api/register/avatars"),
      axios.get("http://localhost:8001/api/posts"),
    ]).then((all) => {
      const comments = all[0].data;
      const likes = all[1].data;
      const user_skills = all[2].data;
      const posts = all[3].data;
      const experiences = all[4].data;
      const user_profiles = all[5].data;
      const users = all[6].data;
      const helper_points = all[7].data;
      const helped_points = all[8].data;
      const db_skills = all[9].data;
      const posts_skills = all[10].data;
      const avatars = all[11].data;
      const filtered_posts = all[12].data;
      dispatch({
        type: SET_APPLICATION_DATA,
        comments,
        likes,
        user_skills,
        posts,
        experiences,
        user_profiles,
        users,
        helper_points,
        helped_points,
        db_skills,
        posts_skills,
        avatars,
        filtered_posts,
      });
    })
    .catch((error) => {
      console.log("promise has uncaught error", error);
    });
  }, []);

  // FOR WEBSOCKET
  // useEffect(() => {
  //   const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

  //   socket.onopen = () => socket.send("ping");
  //   socket.onmessage = (event) => {
  //     const data = JSON.parse(event.data);
  //     if (data.type === SET_POINTS) {
  //       dispatch(data);
  //     }
  //   };

  //   return () => {
  //     socket.close();
  //   };
  // }, []);

  const setSelectedUser = (userID) => {
    dispatch({
      type: SET_SELECTED_USER,
      userId: userID,
    });
  };

  const createPost = (postDetails, techStack, id) => {
    const newPost = {
      text_body: postDetails.text,
      active: true,
      owner_id: id,
      stack: [],
      time_posted: new Date().toISOString(),
      is_helper: false,
      is_helped: true,
      avatar: postDetails.avatar,
      username: postDetails.username,
    };
    // if (!postDetails.helper) {
    //   (newPost["is_helper"] = true), (newPost["is_helped"] = false);
    // }
    for (let entry of techStack) {
      newPost["stack"].push(entry.name);
    }

    const promise = axios
      .post(`http://localhost:8001/api/posts`, { newPost })
      .then((response) => {
        getNewPostId(response.data);

        dispatch({
          type: SET_POSTS,
          data: newPost,
        });
      })
      .catch((error) => {
        console.log("Error in createPost data hook:", error);
      });
    const getNewPostId = (res) => {
      Promise.all(
        techStack.forEach((element) => {
          axios.post(`http://localhost:8001/api/posts_skills`, {
            post_id: res.id,
            skill_id: element.id,
          });
        })
      ).catch((error) => {
        console.log("Error in geNewPostID data hook:", error);
      });
    };
    return promise;
  };

  const addLike = (postId, likerId) => {
    const newLike = {
      post_id: postId,
      liker_id: likerId,
    };
    const promise = axios
      .post(`http://localhost:8001/api/likes`, { newLike })
      .then((response) => {
        dispatch({
          type: SET_LIKES,
          data: newLike,
        });
      })
      .catch((error) => {
        console.log("Error in addLike data hook:", error);
      });
    return promise;
  };

  const removeLike = (postId, unlikerId) => {
    const removeLike = {
      post_id: postId,
      liker_id: unlikerId,
    };
    const promise = axios
      .delete(`http://localhost:8001/api/likes`, {
        params: { removeLike: removeLike },
      })
      .then((response) => {
        dispatch({
          type: REMOVE_LIKE,
          data: removeLike,
        });
      })
      .catch((error) => {
        console.log("Error in removeLike data hook:", error);
      });
    return promise;
  };

  const createComment = (postId, commenterId, commentDetails, commentObj) => {
    const newComment = {
      post_id: postId,
      commenter_id: commenterId,
      text_body: commentDetails,
      avatar: commentObj.avatar,
      username: commentObj.username,
    };

    const promise = axios
      .post(`http://localhost:8001/api/comments`, { newComment })
      .then((response) => {
        dispatch({
          type: ADD_COMMENT,
          data: newComment,
        });
      })
      .catch((error) => {
        console.log("Error in createComment data hook:", error);
      });

    return promise;
  };

  const editComment = (postId, commenterId, commentDetails, oldTextBody) => {
    const updatedComment = {
      post_id: postId,
      commenter_id: commenterId,
      text_body: commentDetails,
      value: oldTextBody,
    };

    const promise = axios
      .put(`http://localhost:8001/api/comments`, { updatedComment })
      .then((response) => {
        dispatch({
          type: EDIT_COMMENT,
          data: updatedComment,
        });
      })
      .catch((error) => {
        console.log("Error in editComment data hook:", error);
      });
    return promise;
  };
  const updatePost = (editedPost, post_id, id) => {

    const promise = axios
      .put(`http://localhost:8001/api/posts`, {
        text_body: editedPost,
        post_id: post_id,
      })
      .then((response) => {
        dispatch({
          type: EDIT_POST,
          text: editedPost,
          post_id: post_id,
        });
      })
      .catch((error) => {
        console.log("Error in updatePost data hook:", error);
      });

    return promise;
  };

  const updateUserInfo = (newInfo, id) => {

    const promise = Promise.all([
      axios.put("http://localhost:8001/api/users/edit", {
        id: id,
        username: newInfo["username"],
      }),
      axios.put("http://localhost:8001/api/user_profiles/edit", {
        id: id,
        avatar: newInfo["avatar"],
        location: newInfo["location"],
      }),
    ])
      .then(
        dispatch({
          type: SET_NEW_INFO,
          data: newInfo,
          id: id,
        })
      )
      .catch((err) => console.log("something went wrong in the update user hook"));
      return promise;
  };

  const deletePost = (post_id) => {

    const promise = axios
      .delete(`http://localhost:8001/api/posts`, { params: { post_id } })
      .then((response) => {
        dispatch({
          type: DELETE_POST,
          post_id: post_id,
        });
      })
      .catch((error) => {
        console.log("Error in deletePost data hook:", error);
      });

    return promise;
  };

  const updateHelperStack = (removed, added, id) => {
    const arrOfRemoved = makeStackObj(removed, id);
    const arrOfAdded = makeStackObj(added, id);

    if (arrOfRemoved.length !== 0) {
      axios
        .all(
          arrOfRemoved.forEach((element) => {
            axios.delete(`http://localhost:8001/api/user_skills`, {
              params: element,
            });
          })
        )
        .then(
          dispatch({
            type: REMOVE_FROM_STACK,
            removed: arrOfRemoved,
          })
        );
    }

    if (arrOfAdded.length !== 0) {
      axios
        .all(
          arrOfAdded.forEach((element) => {
            axios.post(`http://localhost:8001/api/user_skills`, element);
          })
        )
        .then(
          dispatch({
            type: ADD_TO_STACK,
            added: arrOfAdded,
          })
        );
    }
  };

  const removeComment = (postId, commenterId) => {
    const removeComment = {
      post_id: postId,
      commenter_id: commenterId,
    };
    const promise = axios
      .delete(`http://localhost:8001/api/comments`, {
        params: { removeComment: removeComment },
      })
      .then((response) => {
        dispatch({
          type: REMOVE_COMMENT,
          data: removeComment,
        });
      })
      .catch((error) => {
        console.log("Error in removeComment data hook:", error);
      });
    return promise;
  };
  const filterDashboardPosts = (filter) => {
    dispatch({
      type: FILTER_POSTS,
      text: filter,
    });
  };

  return {
    state,
    createPost,
    setSelectedUser,
    updateUserInfo,
    updateHelperStack,
    addLike,
    createComment,
    removeLike,
    removeComment,
    editComment,
    updatePost,
    deletePost,
    filterDashboardPosts,
  };
}
