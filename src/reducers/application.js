const SET_POINTS = "SET_POINTS";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_HELPER_POINTS = "SET_HELPER_POINTS";
const SET_HELPED_POINTS = "SET_HELPED_POINTS";
const SET_SELECTED_USER = "SET_SELECTED_USER";
const SET_POSTS = "SET_POSTS";
const SET_NEW_INFO = "SET_NEW_INFO";
const REMOVE_FROM_STACK = "REMOVE_FROM_STACK";
const ADD_TO_STACK = "ADD_TO_STACK";
// const SET_COMMENTS = "SET_COMMENTS";
const ADD_COMMENT = "ADD_COMMENT";
const SET_LIKES = "SET_LIKES";
const REMOVE_LIKE = "REMOVE_LIKE";
const EDIT_COMMENT = "EDIT_COMMENT";
const REMOVE_COMMENT = "REMOVE_COMMENT";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";
const FILTER_POSTS = "FILTER_POSTS";
const FETCH_POSTS = "FETCH_POSTS";
// REDUCER INCLUDES SETTING POINTS
export default function reducer(state, action) {
  switch (action.type) {
    case SET_POSTS: {
      const { data } = action;
      state = { ...state, posts: [...state.posts, data] };
      return state;
    }

    case FILTER_POSTS: {
      console.log("from filter", state.filtered_posts);
      const { text } = action;

      console.log("from filter", text);

      if (text !== "") {
        const postWithStack = state.filtered_posts.filter((post) => {
          if (post.name === text) {
            return true;
          }
        });
        console.log("from filter", postWithStack);
        const final = postWithStack.filter((post) => {
          for (let el of postWithStack) {
            if (el.post_id === post.post_id) {
              return true;
            }
          }
          return false;
        });
        console.log("from filter", state);
        console.log("from filter", final);
        state = { ...state, posts: final };
      } else {
        state = { ...state, posts: [...state.filtered_posts] };
      }

      return state;
    }

    case EDIT_POST: {
      console.log("from reducer edit post");
      const { text, post_id } = action;
      //console.log("WTF?");
      const removedState = state.posts.map((post) => {
        if (post.post_id === post_id) {
          post.text_body = text;
        }
        return post;
      });
      console.log("from reducer", removedState);
      state = { ...state, posts: removedState };
      return state;
    }

    case DELETE_POST: {
      console.log("from reducer edit post");
      const { post_id } = action;
      console.log("WTF?", post_id);
      const removedState = state.posts.filter((post) => {
        if (post.post_id === post_id) {
          return false;
        } else {
          return true;
        }
      });
      console.log("from reducer", removedState);
      state = { ...state, posts: removedState };
      return state;
    }

    case SET_NEW_INFO: {
      console.log("HERE");
      const { data, id } = action;
      const index = state.users.findIndex((x) => x.id === id);
      const users = [...state.users];
      const user = users[index];

      const keys = Object.keys(data);
      for (let el of keys) {
        console.log("from reducer", el);
        user[el] = data[el];
      }
      state = { ...state, users: users };
      console.log("from reducer", state.users);

      return state;
    }

    case SET_LIKES: {
      const { data } = action;
      state = { ...state, likes: [...state.likes, data] };
      return state;
    }

    case REMOVE_LIKE: {
      const { data } = action;
      const newLikes = state.likes.filter((like) => {
        if (like.post_id === data.post_id && like.liker_id === data.liker_id) {
          return false;
        } else {
          return true;
        }
      });
      console.log("newlike in reducer: ", newLikes);
      state = { ...state, likes: newLikes };
      return state;
    }

    case ADD_COMMENT: {
      console.log("before set comments reducer", state.comments);

      const { data } = action;
      state = { ...state, comments: [...state.comments, data] };

      console.log("after set comments reducer: ", state.comments);
      return state;
    }

    case EDIT_COMMENT: {
      const { data } = action;
      const filteredComments = state.comments.filter((comment) => {
        if (
          comment.post_id === data.post_id &&
          comment.commenter_id === data.commenter_id
        ) {
          return false;
        } else {
          return true;
        }
      });
      const newComment = {
        post_id: data.post_id,
        commenter_id: data.commenter_id,
        text_body: data.text_body,
      };

      filteredComments.push(newComment);
      console.log("newcomment in reducer: ", filteredComments);
      state = { ...state, comments: filteredComments };
      return state;
    }

    case REMOVE_COMMENT: {
      const { data } = action;
      const newComments = state.comments.filter((comment) => {
        if (typeof comment === "undefined" || typeof data === "undefined")
          return {};
        if (
          comment.post_id === data.post_id &&
          comment.commenter_id === data.commenter_id
        ) {
          return false;
        } else {
          return true;
        }
      });
      console.log("newcomment in reducer: ", newComments);
      state = { ...state, comments: newComments };
      return state;
    }

    case REMOVE_FROM_STACK: {
      const { removed } = action;
      const removedState = state.user_skills.filter((stack) => {
        for (let removedStack of removed) {
          if (
            stack.user_id === removedStack.user_id &&
            stack.name === removedStack.name
          ) {
            return false;
          }
        }
        return true;
      });
      state = { ...state, user_skills: removedState };
      return state;
    }

    case ADD_TO_STACK: {
      const { added } = action;
      state = { ...state, user_skills: [...state.user_skills, ...added] };
      return state;
    }

    case FETCH_POSTS: {
      state = { ...state, filtered_posts: [...state.posts] };
      return state;
    }

    case SET_POINTS:
      return { ...state, points: action.points };

    case SET_APPLICATION_DATA:
      const {
        comments,
        HELPER_POINTS,
        user_skills,
        likes,
        messages,
        posts,
        helped_points,
        helped_stack,
        experiences,
        user_profiles,
        users,
        db_skills,
        posts_skills,
        avatars,
        selected,
        filtered_posts,
      } = action;

      return {
        ...state,
        comments,
        user_skills,
        HELPER_POINTS,
        likes,
        messages,
        posts,
        helped_points,
        helped_stack,
        experiences,
        user_profiles,
        users,
        db_skills,
        posts_skills,
        avatars,
        selected,
        filtered_posts,
      };

    case SET_SELECTED_USER:
      const matchingUser = state.users.find(
        (user) => user.id === action.userId
      );
      console.log("matching user: ", matchingUser);
      return { ...state, selected: matchingUser };

    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

export {
  SET_POSTS,
  ADD_COMMENT,
  SET_APPLICATION_DATA,
  SET_HELPER_POINTS,
  SET_HELPED_POINTS,
  SET_SELECTED_USER,
  SET_NEW_INFO,
  REMOVE_FROM_STACK,
  ADD_TO_STACK,
  SET_LIKES,
  SET_POINTS,
  REMOVE_LIKE,
  REMOVE_COMMENT,
  EDIT_COMMENT,
  EDIT_POST,
  DELETE_POST,
  FILTER_POSTS,
  FETCH_POSTS,
};
