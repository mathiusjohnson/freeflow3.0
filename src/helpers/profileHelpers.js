export function getUser(users, senderId) {
  // console.log("sender id in helper", parseInt(senderId));
  // console.log("users in getUser: ", users);
  let specificUser = {};
  for (let user of users) {
    // for (let key in user) {
      // console.log(user["id"], user);
      if (user["id"] === parseInt(senderId)) {
        specificUser = user;
        break;
      // }
    }
  }
  return specificUser;
}

export function getUserPosts(posts, senderId) {
  // console.log("in profile helper!!!", senderId);
  const seen = new Set();
  const postsByUser = posts
    .filter((post) => {
      return post.owner_id === parseInt(senderId, 10);
    })
    .filter((el) => {
      const duplicate = seen.has(el.time_posted);
      seen.add(el.time_posted);
      return !duplicate;
    });

  // console.log("from helper", posts, postsByUser);
  //go through the posts and posts by user
  // if()
  for (let post of postsByUser) {
    if (!post["stack"]) {
      post["stack"] = [];
      // console.log("overwritten in helper");
      for (let stack of posts) {
        if (post["post_id"] === stack["post_id"]) {
          post["stack"].push(stack["name"]);
        }
      }
    }
  }

  return postsByUser;
}

export function getDashboardPosts(posts) {
  const seen = new Set();
  const postsByUser = posts.filter((el) => {
    const duplicate = seen.has(el.time_posted);
    seen.add(el.time_posted);
    return !duplicate;
  });

  for (let post of postsByUser) {
    post["stack"] = [];

    for (let stack of posts) {
      if (post["post_id"] === stack["post_id"]) {
        post["stack"].push(stack["name"]);
      }
    }
  }

  return postsByUser;
}

export function getFilterOptions(posts) {
  const seen = new Set();
  const postsByUser = posts
    .filter((el) => {
      const duplicate = seen.has(el.name);
      seen.add(el.name);
      return !duplicate;
    })
    .map((el) => {
      return el["name"];
    });

  //console.log("filter", postsByUser);
  return postsByUser;
}

export function getStack(stack, senderId) {
  // console.log("stack in helper: ", stack);
  let currentStack = stack.filter((lang) => {
    return lang.user_id === parseInt(senderId, 10);
  });
  // console.log("stack", currentStack);
  return currentStack;
}

export function makeStackObj(stackArray, id) {
  const arrOfObj = [];

  for (let el of stackArray) {
    let obj = {
      user_id: id,
      name: el,
    };
    arrOfObj.push(obj);
  }

  return arrOfObj;
}
